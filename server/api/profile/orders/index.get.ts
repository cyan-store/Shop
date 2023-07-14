import { ORDERS } from "@/server/data/paginate";
import prisma from "@/server/data/prisma";

export default defineSafeEventHandler(async (evt) => {
    const query = getQuery(evt);
    const sorts = ["asc", "desc"];
    const sort = query?.sort || "asc";
    const page = parseInt(String(query?.page)) || 0;

    if (evt.context.settings.status === "NOPURCHASE") {
        // Return nothing -> 404
        return;
    }

    // Validate request
    if (page < 0 || page > 50000) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid page number!",
        });
    }

    if (!sorts.includes(String(sort))) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid sort!",
        });
    }

    return await prisma.orders.findMany({
        where: {
            userID: evt.context.token.sub,
        },

        orderBy: {
            updatedAt: sort as "asc" | "desc",
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

        take: ORDERS,
        skip: ORDERS * page,
    });
});
