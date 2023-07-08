<template>
    <div>
        <h2>Create a rating</h2>

        <ProductsItemCreatePreviousRating
            :id="String(route.params.id)"
            v-model="hasRating"
        />

        <ProductsItemCreateRatingInput
            :id="String(route.params.id)"
            :rating="hasRating"
        />

        <NuxtLink :to="`/products/${route.params.id}/ratings`">Back</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: "auth" });

const route = useRoute();
const hasRating = ref(false);
</script>
