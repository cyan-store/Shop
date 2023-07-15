import type { CartItem } from "@/store/cart";

export interface Checkout {
    id: string;
    title: string;
    price: number;
    amount: number;
}

export interface CheckoutResponse {
    url: string;
    checkout: Checkout[];
}

export const useFetchCheckout = async (items: CartItem[]) => {
    const data = await $fetch<CheckoutResponse>("/api/profile/checkout", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(items),
        mode: "cors",
    }).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return {} as CheckoutResponse;
    });

    return data;
};
