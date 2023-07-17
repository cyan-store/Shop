<template>
    <div>
        <h2>{{ props.title }}</h2>
        <pre>{{ props }}</pre>

        <div v-if="canCart">
            <ClientOnly>
                <button @click="add">Add to cart {{ amount }}</button>
                <UiItemManager v-if="amount" :id="props.id" />
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Stock } from "@prisma/client";

const props = defineProps<{
    id: string;
    title: string;
    subtitle: string | null;
    description: string;
    images: string;
    tags: string;
    price: number;
    stock: Stock;
    createdAt: string;
    updatedAt: string;
}>();

const { status } = useAuth();
const settings = useSettings();
const cart = useCart();

const canCart = computed(() => {
    return (
        settings.state !== "NOPURCHASE" &&
        status.value === "authenticated" &&
        props.stock === "IN_STOCK"
    );
});

const amount = computed(() => {
    const inc = cart.includes(props.id);

    if (inc === -1) {
        return "";
    }

    return "x" + cart.items[inc].amount;
});

const add = () => {
    cart.add({
        id: props.id,
        title: props.title,
        subtitle: String(props.subtitle) || "",
        images: props.images,
        price: props.price,
        amount: 1,
    });
};
</script>
