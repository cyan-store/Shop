import { Products } from "@prisma/client";

export const useFetchProducts = async (
    page = 0,
    search = "",
    order: "any" | "title" | "date" | "price" | "rating" = "any",
    sort: "asc" | "desc" = "asc"
): Promise<Products[]> => {
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
