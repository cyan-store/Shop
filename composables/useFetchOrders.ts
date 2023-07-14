export interface Orders {
    id: string;
    productID: string;
    status: string;
    quantity: string;
    amount: number;
    country: string;
    postal: string;
    shipping: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Info {
    id: string;
    title: string;
    price: number;
    stock: string;
}

export interface Product {
    info: Info;
    amount: string;
}

export interface Order {
    id: string;
    productID: string;
    status: string;
    quantity: string;
    amount: number;
    country: string;
    postal: string;
    shipping: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderInfo {
    order: Order;
    products: Product[];
}

// Get a user's orders
export const useFetchOrders = async (page = 0) => {
    const query = new URLSearchParams({ page: String(page) });
    const data = await $fetch<Orders[]>(
        `/api/profile/orders?${query.toString()}`,
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

        return [] as Orders[];
    });

    return data;
};

// Get a user's specific order
export const useFetchOrderInfo = async (id: string) => {
    const data = await $fetch<OrderInfo>(`/api/profile/orders/${id}`, {
        credentials: "include",
        method: "GET",
        mode: "cors",
    }).catch((e) => {
        showError({
            statusCode: e.statusCode,
            statusMessage: e.statusMessage,
        });

        return {} as OrderInfo;
    });

    return data;
};
