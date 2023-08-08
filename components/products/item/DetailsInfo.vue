<template>
    <div class="details-info flex py-10 mb-10">
        <div class="flex-1 lg:flex hidden justify-center">
            <UiImageCarousel />
        </div>

        <div class="flex-1 lg:leading-8">
            <div class="lg:hidden mb-4">
                <!-- Mobile -->
                <div class="flex items-center h-[280px] justify-center">
                    <UiImageCarousel />
                </div>

                <hr class="mt-5" />
            </div>

            <div class="mb-4">
                <h2 class="md:text-6xl text-4xl">{{ props.title }}</h2>
                <h4 class="md:text-3xl text-lg opacity-80 mt-4">
                    {{ props.subtitle }}
                </h4>
            </div>

            <div v-if="settings.ratings" class="my-2">
                <h2 class="opacity-60">User Ratings ({{ totalRatings }}x)</h2>
                <NuxtRating :rating-value="ratingStats?.average || 0" />
            </div>

            <hr class="my-4" />
            <div>
                <span class="text-xl">{{ productStock }}</span>
                <span class="font-bold text-xl">
                    ${{ (props.price / 100).toFixed(2) }}
                    {{ settings.currency }}
                </span>
            </div>

            <hr class="my-4" />
            <div>
                <p>{{ props.description }}</p>
                <h4 class="text-sm mt-4 opacity-60">
                    <span title="Created at">{{ created }}</span>
                    <span title="Updated at">
                        {{ updated === created ? "" : " | " + updated }}
                    </span>
                </h4>
            </div>

            <hr class="my-4" />
            <div v-if="tags">
                <div
                    v-for="tag in productTags"
                    :key="tag"
                    :disabled="true"
                    class="btn btn-rounded btn-secondary font-bold mr-1"
                >
                    #{{ tag }}
                </div>

                <hr class="my-4" />
            </div>

            <div v-if="canCart" class="lg:text-left text-center">
                <ClientOnly>
                    <UiItemManager v-if="amount" :id="props.id" />
                    <template v-else>
                        <h4
                            v-if="hasMaxItems"
                            class="text-content2 text-sm my-4"
                        >
                            Your cart has reached max capacity.
                        </h4>

                        <button
                            :disabled="hasMaxItems"
                            class="btn btn-solid-primary w-full sm:w-auto"
                            @click="add"
                        >
                            Add to cart
                        </button>
                    </template>
                </ClientOnly>
            </div>
            <h2 v-else class="text-center text-2xl mt-10 italic opacity-60">
                {{ cannotPurchaseReason }}
            </h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Stock } from "@prisma/client";
import type { Stats } from "@/composables/useFetchRatings";

const { status } = useAuth();
const { $moment } = useNuxtApp();

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

const settings = useSettings();
const cart = useCart();
const ratingStats = ref<Stats>();

if (settings.ratings) {
    const res = await useFetchRatingsStats(props.id);

    if (res) {
        ratingStats.value = res;
    }
}

const created = computed(() => $moment(props.createdAt).format("MMMM Do YYYY"));
const updated = computed(() => $moment(props.updatedAt).format("MMMM Do YYYY"));

const totalRatings = computed(() => {
    if (!ratingStats.value?.total) return 0;
    return ratingStats.value.total.reduce((s, a) => s + a, 0);
});

const canCart = computed(() => {
    return (
        settings.state !== "NOPURCHASE" &&
        status.value === "authenticated" &&
        props.stock === "IN_STOCK"
    );
});

const cannotPurchaseReason = computed(() => {
    if (settings.state === "NOPURCHASE") {
        return "";
    } else if (props.stock !== "IN_STOCK") {
        return "Product is out of stock!";
    } else if (status.value !== "authenticated") {
        return "You must be logged in to purchase!";
    }

    return "";
});

const amount = computed(() => {
    const inc = cart.includes(props.id);

    if (inc === -1) {
        return "";
    }

    return "x" + cart.items[inc].amount;
});

const productTags = computed(() => props.tags.split(","));
const productStock = computed(() => {
    return {
        IN_STOCK: "In stock -",
        OUT_STOCK: "Out of stock! -",
        DISCONTINUED: "Discontinued -",
        HIDDEN: "",
    }[props.stock];
});

const hasMaxItems = computed(() => {
    return cart.items.length >= cart.max.items;
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
