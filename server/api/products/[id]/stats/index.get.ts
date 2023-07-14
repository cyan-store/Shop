import redis from "@/server/data/redis";
import prisma from "@/server/data/prisma";

export default defineSafeEventHandler(async (evt) => {
    const { id } = evt.context.params as { id: string };
    const total = [];

    if (!evt.context.settings.ratings) {
        // Return nothing -> 404
        return;
    }

    // Attempt to load cached
    const cached = await redis.get(`shop:stats:${id}`);

    if (cached) {
        return cached;
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

    const data = {
        total,
        average: avg._avg.rating || 0,
    };

    // 2 hour cache
    await redis.setEx(`shop:stats:${id}`, 60 * 60 * 2, JSON.stringify(data));
    return data;
});
