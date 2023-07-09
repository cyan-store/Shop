import type { Products } from "@prisma/client";

// Return product listing
export const useFetchProducts = async (
    page = 0,
    search = "",
    order: "any" | "title" | "date" | "price" | "rating" = "any",
    sort: "asc" | "desc" = "asc"
) => {
    const query = new URLSearchParams({
        page: page.toString(),
        search,
        order,
        sort,
    });

    const products = await $fetch<Products[]>("/api/products?" + query).catch(
        (e) => {
            showError({
                statusCode: e.statusCode,
                statusMessage: e.statusMessage,
            });

            return [];
        }
    );

    return products;
};

// Return product info
export const useFetchProductID = async (id: string) => {
    const { data, error } = await useFetch<Products>(`/api/products/${id}`, {
        key: "product-" + String(id),
    });

    if (error.value) {
        showError(error.value);
    }

    return data.value;
};
