import { Ratings } from "@prisma/client";

interface Stats {
    total: number[];
    average: number;
}

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
export const useCreateRating = () => {};

// Delete a user rating
export const useDeleteRating = async (id: string) => {
    const data = await $fetch<Ratings>(`/api/profile/ratings?id=${id}`, {
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
export const useFetchRatingUser = async (page: number, id = "") => {
    const query = new URLSearchParams({ page: String(page), id });
    const data = await $fetch<Ratings[]>(
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

        return [] as Ratings[];
    });

    return data;
};
