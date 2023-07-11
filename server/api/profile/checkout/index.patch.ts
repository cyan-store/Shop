import prisma from "@/server/data/prisma";
import stripe from "@/server/data/stripe";

// TODO: Ensure shipping is allowed
async function getSession(id: string) {
    try {
        return await stripe.checkout.sessions.retrieve(id);
    } catch (err) {
        process.stderr.write(String(err));
        return null;
    }
}

export default defineSafeEventHandler(async (evt) => {
    const id = getQuery(evt)?.id as { id: string };
    const user = evt.context.token.sub;

    if (evt.context.settings.status === "NOPURCHASE") {
        // Return nothing -> 404
        return;
    }

    // Validate user input
    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid ID!",
        });
    }

    // Get order
    const order = await prisma.orders.findFirst({
        where: { id: String(id), userID: String(user) },
    });

    if (!order) {
        throw createError({
            statusCode: 404,
            statusMessage: "Order not found!",
        });
    }

    // Get session
    const session = await getSession(order.TransactionID);

    if (!session) {
        throw createError({
            statusCode: 404,
            statusMessage: "Session not found, order may be expired.",
        });
    }

    // Was payment complete?
    if (session.status !== "complete" || session.payment_status !== "paid") {
        return {
            status: session.status || "unknown",
            payment: session.payment_status,
            url: session.url,
        };
    }

    if (
        !session.payment_intent ||
        !session.customer_details ||
        !session.customer_details.email ||
        !session.customer_details.name ||
        !session.customer_details.address ||
        !session.customer_details.address.country ||
        !session.customer_details.address.postal_code
    ) {
        throw createError({
            statusCode: 422,
            statusMessage: "Session is missing required data!",
        });
    }

    // Update orders
    await prisma.orders.update({
        where: { id: String(id) },
        data: {
            status: "PAID",
            email: session.customer_details.email,
            name: session.customer_details.name,
            country: session.customer_details.address.country,
            postal: session.customer_details.address.postal_code,
            TransactionID: session.payment_intent.toString(),
            shipping: "PENDING",
        },
    });

    return {
        status: session.status,
        payment: session.payment_status,
        url: null,
    };
});
