import type { Products } from "@prisma/client";

export interface Product {
    id: string;
    title: string;
}

export interface LandingRating {
    id: string;
    name: string;
    description: string;
    rating: number;
    createdAt: string;
    product: Product;
}

// Return landing products
export const useFetchLanding = async () => {
    const products = await $fetch<Products[]>("/api/landing").catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return [];
    });

    return products;
};

// Return product listing
export const useFetchLandingRatings = async (
    period: "all" | "month" | "week" = "all"
) => {
    const query = new URLSearchParams({ period });
    const ratings = await $fetch<LandingRating[]>(
        "/api/landing/ratings?" + query
    ).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return [];
    });

    return ratings;
};
