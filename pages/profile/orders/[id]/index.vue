<template>
    <div v-if="info">
        <div class="text-center">
            <h2
                class="text-2xl text-content2 font-bold opacity-60 max-sm:hidden"
            >
                Order Details
            </h2>

            <h1 class="text-4xl mb-2 font-bold">{{ orderDate }}</h1>

            <h2 class="text-xs text-content2 mt-4 font-bold opacity-50">
                {{ route.params.id }}
            </h2>
        </div>

        <hr class="my-4" />

        <div class="flex justify-between max-sm:text-left max-sm:block">
            <div class="max-sm:my-4">
                <h2 class="font-bold text-lg">Payment Status</h2>
                <h4 class="text-content2 text-bold">
                    {{ info.order.status }}
                </h4>
            </div>

            <div>
                <h2 class="font-bold text-lg">Total</h2>
                <h4 class="text-content2 text-bold">
                    ${{ (info.order.amount / 100).toFixed(2) }}
                    <span class="text-xs">({{ settings.currency }})</span>
                </h4>
            </div>
        </div>

        <div class="my-10">
            <hr class="my-4 sm:hidden" />

            <ProfileOrdersProductCard
                v-for="product in info.products"
                :id="product.info.id"
                :key="product.info.id"
                :title="product.info.title"
                :images="product.info.images"
                :price="product.info.price"
                :stock="product.info.stock"
                :amount="product.amount"
            />
        </div>

        <hr class="my-4 max-sm:hidden" />

        <div class="flex justify-between max-sm:text-left max-sm:block">
            <div class="max-sm:my-4">
                <h2 class="font-bold text-lg">Shipping Status</h2>
                <h4 class="text-content2 text-bold">
                    {{ info.order.shipping }}
                </h4>
            </div>

            <div>
                <h2 class="font-bold text-lg">Location</h2>
                <h4 class="text-content2 text-bold">
                    {{ info.order.country }} | {{ info.order.postal }}
                </h4>
            </div>
        </div>

        <div class="my-10">
            <ProfileOrdersShippingCard
                :postal="info.order.postal"
                :updated-at="String(info.order.updatedAt)"
            />
        </div>

        <NuxtLink class="btn btn-primary max-sm:w-full" to="/profile/orders">
            Back
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import type { OrderInfo } from "@/composables/useFetchOrders";

useHead({ title: useTitle("Order Details") });
definePageMeta({
    layout: "margin",
    middleware: ["auth", "purchase"],
});

const route = useRoute();
const app = useNuxtApp();
const settings = useSettings();
const info = ref<OrderInfo>();

const orderDate = computed(() =>
    app.$moment(info.value?.order.createdAt).format("MMMM Do, YYYY")
);

onMounted(async () => {
    info.value = await useFetchOrderInfo(String(route.params.id));
});
</script>
