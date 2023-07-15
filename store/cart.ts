export interface CartItem {
    id: string;
    title: string;
    subtitle: string;
    images: string;
    price: number;
    amount: number;
}

export const useCart = defineStore("cart", () => {
    const items = ref<CartItem[]>([]);

    const includes = (id: string) => items.value.map((e) => e.id).indexOf(id);
    const remove = (id: string) =>
        (items.value = items.value.filter((e: CartItem) => e.id !== id));

    const clear = () => (items.value.length = 0);

    const add = (item: CartItem) => {
        const inc = includes(item.id);

        if (inc === -1) {
            items.value.push(item);
            return;
        }

        items.value[inc].amount++;
    };

    const sub = (item: CartItem) => {
        const inc = includes(item.id);

        if (inc === -1) {
            return;
        }

        items.value[inc].amount--;

        if (items.value[inc].amount <= 0) {
            remove(item.id);
        }
    };

    onMounted(() => {
        const cart = localStorage.getItem("user-cart");

        watch(
            items,
            () => {
                localStorage.setItem("user-cart", JSON.stringify(items.value));
            },
            { deep: true }
        );

        if (!cart) return;
        items.value = JSON.parse(cart);
    });

    return { items, add, sub, remove, includes, clear };
});
