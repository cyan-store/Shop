import prisma from "@/server/data/prisma";
import { RATINGS } from "@/server/data/paginate";

interface UserRatingsOptions {
    where: {
        user: string;
        productID?: string;
        product: {
            NOT: {
                stock: "HIDDEN";
            };
        };
    };

    select: {
        id: true;
        name: true;
        description: true;
        rating: true;
        productID: true;
        createdAt: true;
        product: true;
    };

    take: number;
    skip: number;
}

export default defineSafeEventHandler(async (evt) => {
    const query = getQuery(evt);
    const productID = String(query?.id || "");
    const page = parseInt(String(query?.page)) || 0;

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

    const options: UserRatingsOptions = {
        where: {
            user: evt.context.token.sub,
            product: {
                NOT: {
                    stock: "HIDDEN",
                },
            },
        },

        select: {
            id: true,
            name: true,
            description: true,
            rating: true,
            productID: true,
            createdAt: true,
            product: true,
        },

        take: RATINGS,
        skip: RATINGS * page,
    };

    if (productID) {
        options.where.productID = productID;
    }

    return await prisma.ratings.findMany(options);
});
