<template>
    <div class="lg:px-40">
        <h4 v-if="discontinued" class="sm:text-3xl text-lg font-bold my-4">
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

        <NuxtLink
            class="btn btn-solid-secondary sm:w-auto w-full my-4 sm:my-0"
            :to="`/products/${route.params.id}/ratings`"
        >
            Back
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["auth", "rating"],
    layout: "margin",
});

const route = useRoute();
const hasRating = ref(false);
const product = await useFetchProductID(String(route.params.id));
const discontinued = computed(() => product?.stock === "DISCONTINUED");

useHead({
    title: useTitle(`${product?.title || "Product"} - Leave a rating...`),
});
</script>

<style>
.textarea {
    display: block;
    max-width: 100%;
    margin: auto;
}
</style>
