import prisma from "@/server/data/prisma";
import { RATINGS } from "@/server/data/paginate";

// TODO: System.hideAnon, System.ratings
// TODO: Filter by rating
export default defineEventHandler(async (evt) => {
    const { id } = evt.context.params as { id: string };
    const page = parseInt(String(getQuery(evt)?.page)) || 0;

    if (page < 0 || page > 50000) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid page number!",
        });
    }

    const avg = await prisma.ratings.aggregate({
        _avg: {
            rating: true,
        },
    });

    const data = await prisma.ratings.findMany({
        where: {
            productID: id,
        },

        take: RATINGS,
        skip: RATINGS * page,
    });

    return {
        average: avg._avg.rating,
        data,
    };
});
