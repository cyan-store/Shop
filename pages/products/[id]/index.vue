<template>
    <div>
        <h2>Product ID {{ route.params.id }}</h2>
        <div v-if="data">
            <ProductsItemDetailsInfo
                :title="data.title"
                :subtitle="data.subtitle"
                :description="data.description"
                :images="data.images"
                :tags="data.tags"
                :price="data.price"
                :stock="data.stock"
                :created-at="data.createdAt"
                :updated-at="data.updatedAt"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Products } from "@prisma/client";
const route = useRoute();

const { data, error } = await useFetch<Products>(
    `/api/products/${route.params.id}`,
    {
        key: String(route.params.id),
    }
);

if (error.value) {
    showError(error.value);
}
</script>
