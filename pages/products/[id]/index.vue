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
                :created-at="String(data.createdAt)"
                :updated-at="String(data.updatedAt)"
            />

            <ProductsItemRatingsPreview :id="String(route.params.id)" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const data = await useFetchProductID(String(route.params.id));
</script>
