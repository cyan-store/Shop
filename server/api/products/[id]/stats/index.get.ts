import prisma from "@/server/data/prisma";

// TODO: Cache this
export default defineSafeEventHandler(async (evt) => {
    const { id } = evt.context.params as { id: string };
    const total = [];

    if (!evt.context.settings.ratings) {
        // Return nothing -> 404
        return;
    }

    // Total ratings based on stars
    for (let i = 1; i <= 5; i++) {
        const t = await prisma.ratings.aggregate({
            where: {
                productID: id,
                product: {
                    NOT: {
                        stock: "HIDDEN",
                    },
                },

                rating: {
                    lte: i + 0.5,
                    gte: i,
                },
            },

            _count: {
                rating: true,
            },
        });

        total.push(t._count.rating);
    }

    // Average
    const avg = await prisma.ratings.aggregate({
        _avg: { rating: true },
        where: {
            productID: id,
            product: {
                NOT: {
                    stock: "HIDDEN",
                },
            },
        },
    });

    return { total, average: avg._avg.rating || 0 };
});
