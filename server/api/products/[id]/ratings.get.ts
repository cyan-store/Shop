import { defineSafeEventHandler } from "@/server/utils/handler";
import { RATINGS } from "@/server/data/paginate";
import prisma from "@/server/data/prisma";

interface RatingsOptions {
    where: {
        productID: string;
        NOT?: {
            name: string;
        };

        rating?: {
            gte?: number;
            lte?: number;
        };
    };

    take: number;
    skip: number;
}

interface RatingAverage {
    _avg: { rating: true };
    where: {
        productID: string;
        NOT?: {
            name: string;
        };
    };
}

export default defineSafeEventHandler(async (evt) => {
    const { id } = evt.context.params as { id: string };
    const query = getQuery(evt);
    const page = parseInt(String(query?.page)) || 0;
    const rating = parseInt(String(query?.rating)) || 0;

    if (!evt.context.settings.ratings) {
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

    if (rating < 0 || rating > 5) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid rating!",
        });
    }

    // Filter request
    const options: RatingsOptions = {
        where: {
            productID: id,
        },

        take: RATINGS,
        skip: RATINGS * page,
    };

    const ratings: RatingAverage = {
        _avg: { rating: true },
        where: { productID: id },
    };

    if (evt.context.settings.hideAnon) {
        options.where.NOT = { name: "Anonymous" };
        ratings.where.NOT = { name: "Anonymous" };
    }

    if (rating !== 0) {
        options.where.rating = {
            lte: rating + 0.5,
            gte: rating,
        };
    }

    // Query request
    const data = await prisma.ratings.findMany(options);
    const avg = await prisma.ratings.aggregate(ratings);

    return {
        average: avg._avg.rating || 0,
        data,
    };
});
