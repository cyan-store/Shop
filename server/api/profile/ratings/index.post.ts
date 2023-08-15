import prisma from "@/server/data/prisma";

export default defineSafeEventHandler(async (evt) => {
    const query = getQuery(evt);
    const body = await readBody(evt);

    const productID = String(query?.id);
    const rating = parseFloat(String(body?.rating));
    const description = body?.description || "";

    if (!evt.context.settings.ratings) {
        // Return nothing -> 404
        return;
    }

    // Validate user input
    if (isNaN(rating) || rating < 1.0 || rating > 5.0) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid rating!",
        });
    }

    if (String(description).length >= 150) {
        throw createError({
            statusCode: 400,
            statusMessage: "Rating can only be 150 characters!",
        });
    }

    // Validate product
    const product = await prisma.products.findFirst({
        where: {
            id: productID,
            NOT: { stock: "HIDDEN" },
        },
    });

    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: "Product not found!",
        });
    }

    if (product.stock === "DISCONTINUED") {
        throw createError({
            statusCode: 400,
            statusMessage: "Cannot rate a discontinued product!",
        });
    }

    // Post rating
    return await prisma.ratings.create({
        data: {
            user: evt.context.token.sub,
            name: evt.context.auth.user.name,
            description: String(description),
            rating,
            productID,
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
    });
});
