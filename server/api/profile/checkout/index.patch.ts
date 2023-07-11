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
    const query = getQuery(evt);
    const id = query?.id as { id: string };
    const canceled = query?.cancel === "true";
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

    // Has order been resolved?
    if (order.status !== "UNPAID") {
        throw createError({
            statusCode: 400,
            statusMessage: "Order has been resolved!",
        });
    }

    // Get products
    const productIDs = order.productID.split(",");
    const amountIDs = order.quantity.split(",");
    const products = [];

    for (const product in productIDs) {
        const p = await prisma.products.findFirst({
            where: { id: productIDs[product] },
            select: {
                id: true,
                title: true,
                price: true,
            },
        });

        if (!p) {
            throw createError({
                statusCode: 404,
                statusMessage: `Product ${productIDs[product]} not found!`,
            });
        }

        products.push({ ...p, amount: amountIDs[product] });
    }

    // Is order expired
    if (new Date(order.expireAt) < new Date()) {
        await prisma.orders.update({
            where: { id: String(id) },
            data: {
                status: "CANCELED",
                shipping: "CANCELED",
            },
        });

        return {
            status: "complete",
            payment: "no_payment_required",
            products,
            url: null,
        };
    }

    // Get session
    const session = await getSession(order.paymentID);

    // Has order been canceled?
    if (canceled) {
        await prisma.orders.update({
            where: { id: String(id) },
            data: {
                status: "CANCELED",
                shipping: "CANCELED",
            },
        });

        // If session exists, expire it
        try {
            if (session) {
                await stripe.checkout.sessions.expire(session.id);
            }
        } catch (e) {
            process.stdout.write(`[ERR] Could not expire ${id} - ${e}`);
        }

        return {
            status: "complete",
            payment: "no_payment_required",
            products,
            url: null,
        };
    }

    if (!session) {
        throw createError({
            statusCode: 404,
            statusMessage: "Session not found, order may be expired/resolved.",
        });
    }

    // Was payment incomplete?
    if (session.status !== "complete" || session.payment_status !== "paid") {
        return {
            status: session.status || "unknown",
            payment: session.payment_status,
            products,
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
            transactionID: session.payment_intent.toString(),
            shipping: "PENDING",
        },
    });

    return {
        status: session.status,
        payment: session.payment_status,
        products,
        url: null,
    };
});
