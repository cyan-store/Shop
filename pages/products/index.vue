<template>
    <div>
        <h2>Products</h2>

        <ProductsListingItemsControl @search="searchProducts" />
        <ProductsListingItemsCard
            v-for="product in products"
            :id="product.id"
            :key="product.id"
            :title="product.title"
            :subtitle="product.subtitle"
            :description="product.description"
            :images="product.images"
            :tags="product.tags"
            :price="product.price"
            :stock="product.stock"
        />

        <div v-if="!products.length">
            <h2>Nothing here</h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Products } from "@prisma/client";

const products = ref([] as Products[]);
const searchProducts = async (
    page?: number,
    options?: {
        search: string;
        order: "any" | "title" | "date" | "price" | "rating";
        sort: "asc" | "desc";
    }
) => {
    const res = await useFetchProducts(
        page || 0,
        options?.search || "",
        options?.order || "any",
        options?.sort || "asc"
    );

    products.value = res;
};

onMounted(() => searchProducts());
</script>
