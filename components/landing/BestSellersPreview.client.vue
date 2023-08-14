<template>
    <template v-if="hasProducts">
        <div class="divider divider-horizontal">Products</div>
        <div class="m-auto mb-[100px]">
            <h2 class="text-center font-bold text-2xl mt-8">Best Sellers</h2>
            <h4 class="text-center text-sm text-content2 opacity-60 my-1">
                Our highest rated products
            </h4>

            <div
                v-if="!loading"
                class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 lg:px-[100px]"
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
            <div v-else class="spinner-simple m-auto my-[150px]"></div>
        </div>
    </template>
</template>

<script lang="ts" setup>
import type { Products } from "@prisma/client";

const loading = ref(true);
const hasProducts = ref(true);
const products = ref<Products[]>([]);

onMounted(async () => {
    products.value = await useFetchLanding();

    hasProducts.value = !(products.value.length === 0);
    loading.value = false;
});
</script>

<style scoped>
.grid .card {
    margin: auto;
}
</style>
