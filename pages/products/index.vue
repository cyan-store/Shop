<template>
    <div>
        <div class="py-10 text-center w-full font-bold">
            <h2 class="md:text-6xl text-4xl">Product Listing</h2>
            <h4 class="md:text-2xl text-lg opacity-80 mt-4">
                Lorem ipsum dolor sit amet.
            </h4>
        </div>

        <ProductsListingItemsControl
            :loading="loading"
            @search="searchProducts"
        />

        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            :class="{ 'opacity-60': loading }"
        >
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
        </div>

        <div v-if="!products.length" class="my-20">
            <h2 v-if="!loading" class="text-center text-4xl italic opacity-60">
                Nothing Found!
            </h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Products } from "@prisma/client";

useHead({ title: useTitle("Product Listing") });
definePageMeta({ layout: "margin" });

const products = ref([] as Products[]);
const loading = ref(true);

const searchProducts = async (
    page?: number,
    options?: {
        search: string;
        order: "any" | "title" | "date" | "price" | "rating";
        sort: "asc" | "desc";
    }
) => {
    loading.value = true;

    const res = await useFetchProducts(
        page || 0,
        options?.search || "",
        options?.order || "any",
        options?.sort || "asc"
    );

    products.value = res;
    loading.value = false;
};

onMounted(() => searchProducts());
</script>
