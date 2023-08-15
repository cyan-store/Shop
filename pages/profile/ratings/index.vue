<template>
    <div>
        <div class="md:flex justify-between my-4">
            <h2
                class="text-lg max-md:text-2xl max-md:font-bold max-md:text-center mt-2"
            >
                My Ratings
            </h2>

            <h4 class="text-content2 text-center my-2 text-sm md:hidden">
                Product Reviews
            </h4>

            <button class="btn btn-primary max-md:w-full" @click="sortItem">
                {{ sort.toUpperCase() }}
            </button>
        </div>

        <hr class="my-4" />

        <div v-if="loading">
            <div class="spinner-simple m-auto my-[20vh]"></div>
        </div>
        <div v-else class="w-full">
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

            <h2
                v-if="!ratings.length"
                class="my-[20vh] text-center text-xl select-none"
            >
                {{
                    page === 0
                        ? "You don't have any ratings!"
                        : "No ratings found on this page."
                }}
            </h2>
        </div>

        <UiPaginateInput v-model="page" class="text-center" />
    </div>
</template>

<script lang="ts" setup>
import type { ProductRatings } from "@/composables/useFetchRatings";

useHead({ title: useTitle("My Ratings") });
definePageMeta({
    layout: "margin",
    middleware: ["auth", "rating"],
});

const page = ref(0);
const sort = ref("desc");
const loading = ref(true);
const ratings = ref<ProductRatings[]>([]);

const loadRatings = async () => {
    loading.value = true;
    ratings.value = await useFetchRatingUser(page.value, "", sort.value);
    loading.value = false;
};

const sortItem = () => {
    sort.value = sort.value === "asc" ? "desc" : "asc";
};

onMounted(loadRatings);
watch(page, loadRatings);
watch(sort, loadRatings);
</script>
