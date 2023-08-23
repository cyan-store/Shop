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
    const max = reactive({
        items: 10,
        amount: 20,
    });

    const includes = (id: string) => items.value.map((e) => e.id).indexOf(id);
    const remove = (id: string) =>
        (items.value = items.value.filter((e: CartItem) => e.id !== id));

    const clear = () => (items.value.length = 0);

    const add = (item: CartItem) => {
        const inc = includes(item.id);

        if (inc === -1) {
            if (items.value.length >= max.items) {
                return;
            }

            items.value.push(item);
            return;
        }

        if (items.value[inc].amount >= max.amount) {
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
        try {
            items.value = JSON.parse(cart);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.info("Could not import cart! Storage is possibly invalid");

            localStorage.removeItem("user-cart");
        }
    });

    return { items, max, add, sub, remove, includes, clear };
});
