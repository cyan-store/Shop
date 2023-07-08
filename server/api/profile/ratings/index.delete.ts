import prisma from "@/server/data/prisma";

export default defineSafeEventHandler(async (evt) => {
    const id = String(getQuery(evt)?.id || "");

    if (!evt.context.settings.ratings) {
        // Return nothing -> 404
        return;
    }

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid ID!",
        });
    }

    const rating = await prisma.ratings.findFirst({
        where: {
            id,
            user: evt.context.token.sub,
        },
    });

    if (!rating) {
        throw createError({
            statusCode: 404,
            statusMessage: "Rating not found!",
        });
    }

    return await prisma.ratings.delete({
        where: { id },
        select: {
            id: true,
            name: true,
            description: true,
            rating: true,
            productID: true,
            createdAt: true,
        },
    });
});
