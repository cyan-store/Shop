<template>
    <div class="card mb-4 max-w-full m-auto p-4">
        <h2 class="text-lg font-bold hover:underline">
            <NuxtLink :to="`/products/${product.id}/ratings/create`">
                {{ product.title }}
            </NuxtLink>
        </h2>

        <NuxtRating :rating-value="rating" />

        <p v-if="description" class="my-4 break-words">{{ description }}</p>
        <p v-else class="my-4 italic font-bold">No content provided.</p>

        <time class="md:text-right text-xs opacity-60">{{ created }}</time>
    </div>
</template>

<script lang="ts" setup>
const app = useNuxtApp();
const props = defineProps<{
    rating: number;
    product: {
        id: string;
        title: string;
        stock: string;
    };

    description: string;
    createdAt: string;
}>();

const created = computed(() =>
    app.$moment(props.createdAt).format("MMMM Do YYYY h:mm a")
);
</script>
