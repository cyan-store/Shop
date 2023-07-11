import { env } from "process";
import prisma from "@/server/data/prisma";
import stripe from "@/server/data/stripe";

interface CartItem {
    id: string;
    amount: number;
}

interface CheckoutItem {
    id: string;
    name: string;
    price: number;
    amount: number;
}

export default defineSafeEventHandler(async (evt) => {
    const body = await readBody<CartItem[]>(evt);
    const user = evt.context.token.sub;

    const products: CartItem[] = [];
    const checkout: CheckoutItem[] = [];

    if (evt.context.settings.status === "NOPURCHASE") {
        // Return nothing -> 404
        return;
    }

    // Validate user input
    if (!Array.isArray(body)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid cart!",
        });
    }

    // Valid cart
    for (const item of body) {
        if (
            !String(item.id) ||
            !Number.isInteger(item.amount) ||
            item.amount <= 0 ||
            item.amount >= 25
        ) {
            throw createError({
                statusCode: 400,
                statusMessage: "Invalid items in cart!",
            });
        }

        products.push(item);
    }

    // Cart contains duplicates?
    if (
        [...new Set(products.map((n) => String(n.id)))].length !==
        products.length
    ) {
        throw createError({
            statusCode: 400,
            statusMessage: "Duplicate items in cart!",
        });
    }

    // Does product exist?
    for (const item of products) {
        const product = await prisma.products.findFirst({
            where: {
                id: String(item.id),
                stock: "IN_STOCK",
            },

            select: {
                id: true,
                title: true,
                price: true,
            },
        });

        if (!product) {
            throw createError({
                statusCode: 404,
                statusMessage: `Product ${item.id} not found!`,
            });
        }

        checkout.push({
            id: product.id,
            name: product.title,
            price: product.price, // TODO: Convert price
            amount: item.amount,
        });
    }

    // Create order
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${env.STRIPE_URL}/todo-success`,
        cancel_url: `${env.STRIPE_URL}/todo-cancel`,
        line_items: checkout.map((c) => {
            return {
                price_data: {
                    currency: evt.context.settings.currency.toLowerCase(),
                    product_data: {
                        name: c.name,
                    },

                    unit_amount: c.price, // TODO: Convert the price in UI
                },

                quantity: c.amount,
            };
        }),
    });

    const expire = new Date(0);
    const amount = session.amount_total || 0;
    const quantity = checkout.map((c) => c.amount).join(",");
    const ids = checkout.map((c) => c.id).join(",");

    expire.setUTCSeconds(session.expires_at);

    const order = await prisma.orders.create({
        data: {
            productID: ids,
            TransactionID: session.id,
            userID: user,
            status: "UNPAID",
            quantity,
            amount,
            email: "",
            name: "",
            country: "",
            postal: "",
            expireAt: expire,
        },

        select: { id: true },
    });

    return {
        id: order.id,
        url: session.url,
    };
});
