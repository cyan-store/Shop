<template>
    <div v-if="res" class="my-4">
        <div class="text-3xl text-center font-bold mt-5">User Ratings</div>
        <div class="text-md text-center font-bold my-2 opacity-60">Preview</div>

        <div v-if="res?.length">
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
        <div v-else class="text-center text-2xl my-20 italic opacity-60">
            No ratings yet...
        </div>

        <div class="text-center my-4">
            <NuxtLink
                :to="`/products/${props.id}/ratings`"
                class="btn btn-solid-primary mx-1 w-full sm:w-auto"
            >
                View All Ratings
            </NuxtLink>

            <NuxtLink
                v-if="canPost"
                :to="`/products/${props.id}/ratings/create`"
                class="btn btn-solid-secondary mx-1 my-2 w-full sm:w-auto"
            >
                Leave a rating
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Stock } from "@prisma/client";

const { status } = useAuth();
const props = defineProps<{
    id: string;
    stock: Stock;
}>();

const res = await useFetchRatingsPreview(props.id);
const canPost = computed(
    () => status.value === "authenticated" && props.stock !== "DISCONTINUED"
);
</script>
