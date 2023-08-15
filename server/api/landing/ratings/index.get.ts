import prisma from "@/server/data/prisma";
import { LANDING } from "@/server/data/paginate";

export default defineSafeEventHandler(async (evt) => {
    const period = getQuery(evt)?.period || "all";

    if (!evt.context.settings.ratings) {
        // Return nothing -> 404
        return;
    }

    if (!["all", "month", "week"].includes(String(period))) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid time period!",
        });
    }

    // Get date
    let d = new Date();
    d.setDate(1);

    switch (period) {
        case "all":
            d = new Date(0);
            break;

        case "month":
            d.setMonth(d.getMonth() - 1);
            break;

        case "week":
            d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7);
            break;
    }

    return await prisma.ratings.findMany({
        where: {
            product: {
                NOT: {
                    stock: "HIDDEN",
                },
            },

            rating: {
                lte: 5,
                gte: 4,
            },

            updatedAt: {
                gte: d,
            },
        },

        select: {
            id: true,
            name: true,
            description: true,
            rating: true,
            createdAt: true,
            product: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },

        orderBy: {
            rating: "desc",
        },

        take: LANDING.ratings,
    });
});
