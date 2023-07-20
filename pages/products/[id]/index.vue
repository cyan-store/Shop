<template>
    <div v-if="data">
        <ProductsItemDetailsInfo
            :id="String(route.params.id)"
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

        <hr />

        <ProductsItemRatingsPreview
            v-if="settings.ratings"
            :id="String(route.params.id)"
        />
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const settings = useSettings();
const data = await useFetchProductID(String(route.params.id));

definePageMeta({ layout: "margin" });
useHead({ title: useTitle(data?.title || "Product") });
</script>
