import prisma from "@/server/data/prisma";

export default defineSafeEventHandler(async (evt) => {
    const { id } = evt.context.params as { id: string };
    const product = await prisma.products.findFirst({
        where: {
            id,
            NOT: {
                stock: "HIDDEN",
            },
        },

        select: {
            title: true,
            subtitle: true,
            description: true,
            images: true,
            tags: true,
            price: true,
            stock: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: "Product not found!",
        });
    }

    return product;
});
