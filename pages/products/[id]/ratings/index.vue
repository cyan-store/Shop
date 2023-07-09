<template>
    <div>
        <h2>{{ route.params.id }}</h2>

        <div>
            <ProductsItemRatingsStarControl
                :id="String(route.params.id)"
                v-model="star"
                @switched="filter"
            />
            <UiPaginateInput v-model="page" />
        </div>

        <div v-if="data">
            <ProductsItemRatingsReviewBlock
                v-for="rating in data"
                :id="rating.id"
                :key="rating.id"
                :name="rating.name"
                :description="rating.description"
                :rating="rating.rating"
                :created-at="String(rating.rating)"
            />

            <div v-if="!data.length">
                <h2>Nothing here</h2>
            </div>
        </div>

        <div v-if="product?.stock !== 'DISCONTINUED'">
            <NuxtLink
                v-if="auth"
                :to="`/products/${route.params.id}/ratings/create`"
            >
                Leave a rating
            </NuxtLink>
            <a v-else>You must be logged in to leave a rating!</a>
        </div>

        <br />

        <NuxtLink :to="'/products/' + route.params.id">Back</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import type { Ratings } from "@prisma/client";

definePageMeta({ middleware: "rating" });

const { status } = useAuth();
const route = useRoute();

const product = await useFetchProductID(String(route.params.id));
const auth = computed(() => status.value === "authenticated");
const data = ref<Ratings[]>([]);
const star = ref("0");
const page = ref(0);

const filter = async () => {
    const res = await useFetchRatings(
        String(route.params.id),
        page.value,
        parseInt(star.value)
    );

    data.value = JSON.parse(JSON.stringify(res));
};

watch(page, filter);
watch(star, () => {
    page.value = 0;
    filter();
});

onMounted(filter);
</script>
