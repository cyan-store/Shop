import prisma from "@/server/data/prisma";
import { PRODUCTS } from "@/server/data/paginate";

// TODO: Search, order by price, date, stock
// TODO: Ensure tags are only for visual purposes
export default defineEventHandler(async (evt) => {
    const page = parseInt(String(getQuery(evt)?.page)) || 0;

    if (page < 0 || page > 50000) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid page number!",
        });
    }

    const data = await prisma.products.findMany({
        take: PRODUCTS,
        skip: PRODUCTS * page,
    });

    return data;
});
