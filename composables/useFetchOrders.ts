export interface Product {
    id: string;
    title: string;
    price: number;
    amount: string;
}

export interface Checkout {
    status: string;
    payment: string;
    products: Product[];
    url: string;
}

// Update an order's status
export const useFetchOrder = async (id: string, cancel = false) => {
    const query = new URLSearchParams({ id, cancel: String(cancel) });
    const data = await $fetch<Checkout>(
        `/api/profile/checkout?${query.toString()}`,
        {
            credentials: "include",
            method: "PATCH",
            mode: "cors",
        }
    ).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return {} as Checkout;
    });

    return data;
};
