<template>
    <div>
        <h2>{{ route.params.id }}</h2>

        <div>
            <ProductsItemRatingsStarControl v-model="star" @switched="filter" />
            <UiPaginateInput v-model="page" />
        </div>

        <div v-if="data">
            <h2>Average: {{ average }}</h2>

            <ProductsItemRatingsReviewBlock
                v-for="rating in data"
                :id="rating.id"
                :key="rating.id"
                :name="rating.name"
                :description="rating.description"
                :rating="rating.rating"
            />
        </div>

        <NuxtLink :to="'/products/' + route.params.id">Back</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import { Ratings } from "@prisma/client";

const route = useRoute();

const star = ref("0");
const page = ref(0);

const data = ref<Ratings[]>([]);
const average = ref(0);

const filter = async () => {
    const res = await useFetchRatings(
        String(route.params.id),
        page.value,
        parseInt(star.value)
    );

    data.value = JSON.parse(JSON.stringify(res.data));
    average.value = res.average;
};

watch(page, filter);
watch(star, () => {
    page.value = 0;
    filter();
});

onMounted(filter);
</script>
