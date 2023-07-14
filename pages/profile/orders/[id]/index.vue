<template>
    <div v-if="info">
        <h2>Order Details</h2>
        <ProfileOrdersDetailCard
            :status="info.order.status"
            :amount="info.order.amount"
            :country="info.order.country"
            :postal="info.order.postal"
            :shipping="info.order.shipping"
            :created-at="String(info.order.createdAt)"
            :updated-at="String(info.order.updatedAt)"
        />

        <hr />

        <h2>Product Details</h2>
        <ProfileOrdersProductCard
            v-for="product in info.products"
            :id="product.info.id"
            :key="product.info.id"
            :title="product.info.title"
            :price="product.info.price"
            :stock="product.info.stock"
            :amount="product.amount"
        />

        <NuxtLink to="/profile/orders">Back</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import type { OrderInfo } from "@/composables/useFetchOrders";

definePageMeta({ middleware: ["auth", "purchase"] });

const route = useRoute();
const info = ref<OrderInfo>();

onMounted(async () => {
    info.value = await useFetchOrderInfo(String(route.params.id));
});
</script>
