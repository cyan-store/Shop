<template>
    <div>
        <div class="flex max-h-[500px] m-auto">
            <img
                src="https://source.unsplash.com/random/400x400"
                class="w-1/2 p-4 bg"
            />

            <div class="w-full py-4">
                <h2 class="font-bold text-5xl mb-3">{{ shopNameFull }}</h2>
                <h4 class="text-content2 text-xl opacity-60">
                    {{ shopNameSub }}
                </h4>

                <p class="text-sm max-w-[40em] my-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Iste nobis in numquam illo est ratione deleniti quod,
                    quaerat veritatis explicabo quae nostrum eveniet eaque,
                    ipsum laboriosam, provident adipisci vero. Numquam!
                </p>

                <NuxtLink to="/products" class="btn btn-primary mt-[1em]">
                    Explore
                </NuxtLink>

                <NuxtLink to="/about" class="btn btn-secondary ml-2 mt-[1em]">
                    About Us
                </NuxtLink>
            </div>
        </div>

        <LandingBestSellersPreview />
        <LandingTopRatingsPreview />
    </div>
</template>

<script lang="ts" setup>
const shopNameFull = computed(() => import.meta.env.VITE_FULL);
const shopNameSub = computed(() => import.meta.env.VITE_SUB);

useHead({ title: useTitle("Home") });
definePageMeta({ layout: "margin" });
</script>

<style scoped>
.bg {
    width: 50%;
    height: 50%;
    object-fit: contain;
    border-radius: 25px;
}
</style>
