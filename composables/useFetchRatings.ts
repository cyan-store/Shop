import { Ratings } from "@prisma/client";

// Return ratings preview
export const useFetchRatingsPreview = async (id: string) => {
    const { data, error } = await useFetch<{
        average: number;
        data: Ratings[];
    }>(`/api/products/${id}/ratings`, {
        key: "ratings-" + String(id),
    });

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

    const data = await $fetch<{
        average: number;
        data: Ratings[];
    }>(`/api/products/${id}/ratings?${query.toString()}`).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return { average: 0, data: [] as Ratings[] };
    });

    return data;
};
