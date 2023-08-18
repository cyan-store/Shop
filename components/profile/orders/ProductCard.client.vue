<template>
    <div class="sm:flex my-4 max-sm:text-center">
        <div
            class="rounded-md w-[250px] max-h-[200px] inline-block max-md:w-[50%] max-sm:hidden bg-forced"
            :style="`background-image: url('${img}')`"
        >
            <img :src="img" class="opacity-0" />
        </div>

        <div class="inline-block ml-2">
            <h2 v-if="id !== '0'" class="hover:underline font-bold text-xl">
                <NuxtLink :to="'/products/' + id">
                    {{ title }}
                </NuxtLink>
            </h2>
            <h2 v-else class="font-bold text-xl">Hidden Product</h2>

            <div class="text-content2 font-bold">
                <p>{{ productStock }}</p>
                <div class="">
                    <p class="inline opacity-60">
                        ${{ (price / 100).toFixed(2) }}
                    </p>
                    <p class="inline ml-[4em]">x{{ amount }}</p>
                </div>
            </div>
        </div>

        <hr class="sm:hidden my-4" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    title: string;
    images: string;
    price: number;
    stock: string;
    amount: string;
}>();

const productStock = computed(() => {
    return {
        IN_STOCK: "In stock",
        OUT_STOCK: "Out of stock!",
        DISCONTINUED: "Discontinued",
        UNKNOWN: "Unknown Stock",
        HIDDEN: "Unknown Stock",
    }[props.stock];
});

const img = computed(() => useImage(props.images));
</script>

<style scoped>
.bg-forced {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 500px;
}
</style>
