import type { Ratings } from "@prisma/client";

export interface ProductRatings extends Ratings {
    product: {
        id: string;
        title: string;
        stock: string;
    };
}

export interface Stats {
    total: number[];
    average: number;
}

// Returns ratings based on stars
export const useFetchRatings = async (
    id: string,
    page: number,
    rating: number
) => {
    const query = new URLSearchParams({
        page: String(page),
        rating: String(rating),
    });

    const data = await $fetch<Ratings[]>(
        `/api/products/${id}/ratings?${query.toString()}`
    ).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return [] as Ratings[];
    });

    return data;
};

// Return ratings preview
export const useFetchRatingsPreview = async (id: string) => {
    const { data, error } = await useFetch<Ratings[]>(
        `/api/products/${id}/ratings`,
        {
            key: "ratings-" + String(id),
        }
    );

    if (error.value) {
        showError(error.value);
    }

    return data.value;
};

// Returns rating stats (average, total)
export const useFetchRatingsStats = async (id: string) => {
    const { data, error } = await useFetch<Stats>(`/api/products/${id}/stats`, {
        key: "ratings-stats-" + String(id),
    });

    if (error.value) {
        showError(error.value);
    }

    return data.value;
};

// Create/delete ratings
export const useCreateRating = async (
    id: string,
    rating: number,
    description = ""
) => {
    const data = await $fetch<ProductRatings>(`/api/profile/ratings?id=${id}`, {
        credentials: "include",
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ rating, description }),
    }).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return {} as Ratings;
    });

    return data;
};

// Delete a user rating
export const useDeleteRating = async (id: string) => {
    const data = await $fetch<ProductRatings>(`/api/profile/ratings?id=${id}`, {
        credentials: "include",
        method: "DELETE",
        mode: "cors",
    }).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return {} as Ratings;
    });

    return data;
};

// Returns user ratings
export const useFetchRatingUser = async (
    page: number,
    id = "",
    sort = "asc"
) => {
    const query = new URLSearchParams({ page: String(page), id, sort });
    const data = await $fetch<ProductRatings[]>(
        `/api/profile/ratings?${query.toString()}`,
        {
            credentials: "include",
            method: "GET",
            mode: "cors",
        }
    ).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return [] as ProductRatings[];
    });

    return data;
};
