<template>
    <div v-if="res">
        <NuxtLink :to="`/products/${props.id}/ratings`">Ratings</NuxtLink>

        <div v-if="res">
            <ProductsItemRatingsReviewBlock
                v-for="rating in res"
                :id="rating.id"
                :key="rating.id"
                :name="rating.name"
                :description="rating.description"
                :rating="rating.rating"
                :created-at="String(rating.createdAt)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
}>();

const res = await useFetchRatingsPreview(props.id);
</script>
