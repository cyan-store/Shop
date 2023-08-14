import prisma from "@/server/data/prisma";
import { LANDING } from "@/server/data/paginate";

export default defineSafeEventHandler(async () => {
    return await prisma.products.findMany({
        where: {
            stock: "IN_STOCK",
        },

        select: {
            id: true,
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

        orderBy: {
            ratings: { _count: "desc" },
        },

        take: LANDING.products,
    });
});
