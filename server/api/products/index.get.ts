import { PRODUCTS } from "@/server/data/paginate";
import prisma from "@/server/data/prisma";

interface ProductOptions {
    where: {
        stock: string;
        title?: {
            search: string;
        };
    };

    orderBy?: {
        title?: string;
        price?: string;
        createdAt?: string;
        ratings?: {
            _count: string;
        };
    };

    take: number;
    skip: number;
}

interface SearchOptions {
    where: {
        stock: string;
        title?: {
            search: string;
        };
    };

    _count: true;
}

export default defineSafeEventHandler(async (evt) => {
    const query = getQuery(evt);
    const orders = ["", "any", "title", "date", "price", "rating"];
    const sorts = ["asc", "desc"];

    const page = parseInt(String(query?.page)) || 0;
    const search = query?.search || "";
    const order = query?.order || "";
    const sort = query?.sort || "asc";

    // Validate request
    if (page < 0 || page > 50000) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid page number!",
        });
    }

    if (!orders.includes(String(order))) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid order!",
        });
    }

    if (!sorts.includes(String(sort))) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid sort!",
        });
    }

    // Filter request
    const options: ProductOptions = {
        where: {
            stock: "IN_STOCK",
        },

        take: PRODUCTS,
        skip: PRODUCTS * page,
    };

    const countOptions: SearchOptions = {
        where: {
            stock: "IN_STOCK",
        },

        _count: true,
    };

    if (search !== "") {
        const searchFilter = String(search).replace(/[^\w\s]/gi, "") + "*";

        options.where.title = { search: searchFilter };
        countOptions.where.title = { search: searchFilter };
    }

    switch (order) {
        case "":
        case "any":
            break;
        case "title":
            options.orderBy = { title: String(sort) };
            break;
        case "date":
            options.orderBy = { createdAt: String(sort) };
            break;
        case "price":
            options.orderBy = { price: String(sort) };
            break;
        case "rating":
            options.orderBy = {
                ratings: { _count: String(sort) },
            };

            break;
    }

    // Query request
    const count = await prisma.products.aggregate(countOptions as any);
    const data = await prisma.products.findMany(options as any);

    return {
        count: count._count,
        data,
    };
});
