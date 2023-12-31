<template>
    <div>
        <div class="py-10 text-center w-full font-bold">
            <h2 class="md:text-6xl text-4xl">Product Listing</h2>
            <h4 class="md:text-2xl text-lg opacity-80 mt-4">
                Find your ideal product.
            </h4>
        </div>

        <ProductsListingItemsControl
            :loading="loading"
            :paginate="paginate"
            @search="searchProducts"
        />

        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            :class="{ 'opacity-60': loading }"
        >
            <ProductsListingItemsCard
                v-for="i in order"
                :id="products[i].id"
                :key="i"
                :title="products[i].title"
                :subtitle="products[i].subtitle"
                :description="products[i].description"
                :images="products[i].images"
                :tags="products[i].tags"
                :price="products[i].price"
                :stock="products[i].stock"
            />
        </div>

        <div v-if="!products.length && !loading" class="my-20">
            <h2 class="text-center text-4xl italic opacity-60">
                Nothing Found!
            </h2>
        </div>

        <UiLoadMore :disabled="paginate * 16 > count" @clicked="paginate++" />
    </div>
</template>

<script lang="ts" setup>
import type { Products } from "@prisma/client";

useHead({ title: useTitle("Product Listing") });
definePageMeta({ layout: "margin" });

const products = ref([] as Products[]);
const loading = ref(true);
const count = ref(0);
const paginate = ref(0);

const order = computed(() =>
    Object.keys(products.value).map((n) => parseInt(n))
);

const searchProducts = async (
    page?: number,
    options?: {
        search: string;
        order: "any" | "title" | "date" | "price" | "rating";
        sort: "asc" | "desc";
    },
    reset?: boolean
) => {
    loading.value = true;

    if (page !== undefined) {
        paginate.value = page;
    }

    const res = await useFetchProducts(
        page || 0,
        options?.search || "",
        options?.order || "any",
        options?.sort || "asc"
    );

    if (!reset) {
        const full = [...products.value, ...res.data];
        const ids = full.map((n) => n.id);

        products.value = full.filter(
            (item, pos) => ids.indexOf(item.id) === pos
        );
    } else {
        products.value = res.data;
    }

    count.value = res.count;
    loading.value = false;
};

onMounted(searchProducts);
</script>
