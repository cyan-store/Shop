<template>
    <div class="card mb-4 max-w-full m-auto">
        <div class="card-body">
            <h2 class="card-header">{{ name }}</h2>
            <NuxtRating class="my-2" :rating-value="rating" rating-size="8" />

            <div class="text-content2">
                <p v-if="description" class="break-words">{{ description }}</p>
                <p v-else class="italic font-bold">No content provided.</p>

                <hr class="my-4" />
                <p class="text-sm opacity-60 sm:text-right text-center">
                    {{ created }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    name: string;
    description: string | null;
    rating: number;
    createdAt: string;
}>();

const { $moment } = useNuxtApp();
const created = computed(() =>
    $moment(props.createdAt).format("MMMM Do YYYY h:mm a")
);
</script>
