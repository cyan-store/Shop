<template>
    <div class="lg:grid block grid-cols-4 gap-4">
        <ProductsItemRatingsStarControl
            :id="String(route.params.id)"
            v-model="star"
            :stock="String(product?.stock)"
            :loading="loading"
            @switched="filter"
            @reset="page = 0"
        />

        <div v-if="data" class="col-span-3">
            <ClientOnly>
                <ProductsItemRatingsReviewBlock
                    v-for="rating in data"
                    :id="rating.id"
                    :key="rating.id"
                    :name="rating.name"
                    :description="rating.description"
                    :rating="rating.rating"
                    :created-at="String(rating.createdAt)"
                />

                <div
                    v-if="loading"
                    class="spinner-simple mx-auto lg:my-[200px] my-[100px]"
                ></div>
                <h2
                    v-else-if="!data.length"
                    class="text-center text-3xl lg:my-[200px] my-[100px] italic opacity-60"
                >
                    <h2>No ratings found!</h2>
                </h2>
            </ClientOnly>

            <div class="text-center">
                <UiPaginateInput v-model="page" />
                <NuxtLink
                    class="btn btn-solid-secondary lg:hidden w-full"
                    :to="'/products/' + route.params.id"
                >
                    Back
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Ratings } from "@prisma/client";

const route = useRoute();
const product = await useFetchProductID(String(route.params.id));

definePageMeta({
    middleware: "rating",
    layout: "margin",
});

const data = ref<Ratings[]>([]);
const loading = ref(false);
const star = ref("0");
const page = ref(0);

const filter = async () => {
    loading.value = true;

    const res = await useFetchRatings(
        String(route.params.id),
        page.value,
        parseInt(star.value)
    );

    data.value = JSON.parse(JSON.stringify(res));
    loading.value = false;
};

watch(page, filter);
watch(star, () => {
    page.value = 0;
    filter();
});

onMounted(filter);
useHead({ title: useTitle(`${product?.title || "Product"} - Ratings`) });
</script>
