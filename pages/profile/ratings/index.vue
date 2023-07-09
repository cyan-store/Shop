<template>
    <div>
        <ProfileSimpleRating
            v-for="rating in ratings"
            :key="rating.id"
            :rating="rating.rating"
            :product="{
                id: String(rating.product.id),
                title: rating.product.title,
                stock: rating.product.stock,
            }"
            :description="rating.description || ''"
            :created-at="String(rating.createdAt)"
        />

        <h2 v-if="!ratings.length">Nothing here...</h2>

        <UiPaginateInput v-model="page" />
    </div>
</template>

<script lang="ts" setup>
import type { ProductRatings } from "@/composables/useFetchRatings";

definePageMeta({ middleware: ["auth", "rating"] });

const page = ref(0);
const ratings = ref<ProductRatings[]>([]);

const loadRatings = async () => {
    ratings.value = await useFetchRatingUser(page.value);
};

onMounted(loadRatings);
watch(page, loadRatings);
</script>
