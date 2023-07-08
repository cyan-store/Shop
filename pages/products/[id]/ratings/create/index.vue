<template>
    <div>
        <h2>Create a rating</h2>
        <h4 v-if="discontinued">
            Product is discontinued and not accepting new ratings.
        </h4>

        <ProductsItemCreatePreviousRating
            :id="String(route.params.id)"
            v-model="hasRating"
        />

        <ProductsItemCreateRatingInput
            v-if="!discontinued"
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
const product = await useFetchProductID(String(route.params.id));

const discontinued = computed(() => product?.stock === "DISCONTINUED");
</script>
