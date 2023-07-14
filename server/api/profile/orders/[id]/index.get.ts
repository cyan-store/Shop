import prisma from "@/server/data/prisma";

export default defineSafeEventHandler(async (evt) => {
    const { id } = evt.context.params as { id: string };

    if (evt.context.settings.status === "NOPURCHASE") {
        // Return nothing -> 404
        return;
    }

    // Get order data
    const data = await prisma.orders.findFirst({
        where: {
            id,
            userID: evt.context.token.sub,
        },

        select: {
            id: true,
            productID: true,
            status: true,
            quantity: true,
            amount: true,
            country: true,
            postal: true,
            shipping: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!data) {
        throw createError({
            statusCode: 404,
            statusMessage: "Order not found!",
        });
    }

    // Get product information
    const ids = data.productID.split(",");
    const amount = data.quantity.split(",");
    const products = [];

    for (const i in ids) {
        const info = await prisma.products.findFirst({
            where: {
                id: ids[i],
                NOT: {
                    stock: "HIDDEN",
                },
            },

            select: {
                id: true,
                title: true,
                price: true,
                stock: true,
            },
        });

        if (!info) {
            products.push({
                info: {
                    id: "0",
                    title: "Unknown Product",
                    price: 0,
                    stock: "UNKNOWN",
                    createdAt: "UNKNOWN",
                    updatedAt: "UNKNOWN",
                },

                amount: amount[i],
            });

            continue;
        }

        products.push({
            info,
            amount: amount[i],
        });
    }

    return { order: data, products };
});
