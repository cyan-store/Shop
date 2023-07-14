<template>
    <div>
        <h2>
            <NuxtLink :to="`/products/${product.id}/ratings/create`">
                {{ product.title }} | {{ product.stock }}
            </NuxtLink>
        </h2>

        <NuxtRating :rating-value="rating" />

        <p>{{ description }}</p>
        <time>{{ createdAt }}</time>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    rating: number;
    product: {
        id: string;
        title: string;
        stock: string;
    };

    description: string;
    createdAt: string;
}>();
</script>
