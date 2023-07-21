<template>
    <div class="card my-4 max-w-[85%] m-auto">
        <div class="card-body">
            <h2 class="card-header">{{ name }}</h2>
            <NuxtRating class="my-2" :rating-value="rating" rating-size="8" />

            <div class="text-content2">
                <p v-if="description">{{ description }}</p>
                <p v-else class="italic font-bold">No content provided.</p>

                <hr class="my-4" />
                <p class="text-sm opacity-60 float-right">{{ createdAt }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    id: string;
    name: string;
    description: string | null;
    rating: number;
    createdAt: string; // TODO: Update dates
}>();
</script>
