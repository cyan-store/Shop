<template>
    <div class="details-info flex py-10">
        <div class="flex-1 lg:flex hidden items-center justify-center">
            <UiImageCarousel />
        </div>

        <div class="flex-1 leading-8">
            <!-- Mobile image -->
            <img
                src="https://source.unsplash.com/random/300x200"
                class="lg:hidden block"
            />

            <div class="mb-4">
                <h2 class="md:text-6xl text-4xl">{{ props.title }}</h2>
                <h4 class="md:text-3xl text-lg opacity-80 mt-4">
                    {{ props.subtitle }}
                </h4>
            </div>

            <div class="my-2">
                <h2>User Ratings</h2>
                <NuxtRating />
            </div>

            <div>
                <hr class="my-4" />
                <p>{{ props.description }}</p>
                <hr class="my-4" />
            </div>

            <div v-if="canCart">
                <ClientOnly>
                    <UiItemManager v-if="amount" :id="props.id" />
                    <button v-else class="btn btn-solid-primary" @click="add">
                        Add to cart
                    </button>
                </ClientOnly>
            </div>
            <h2
                v-else
                class="text-center text-2xl mt-10 italic opacity-60 hover:underline"
                @click="signIn('auth0')"
            >
                You must be logged in to purchase!
            </h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Stock } from "@prisma/client";

const { signIn } = useAuth();

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
