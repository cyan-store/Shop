<template>
    <div>
        <div class="flex max-h-[500px] m-auto">
            <img :src="landing" class="w-1/2 h-[500px] p-4 bg max-md:hidden" />
            <div class="w-full py-4">
                <h2
                    class="font-bold text-5xl mb-3 max-md:text-center max-md:text-3xl"
                >
                    {{ shopNameFull }}
                </h2>

                <h4
                    class="text-content2 text-xl opacity-60 max-md:text-center max-md:text-sm"
                >
                    {{ shopNameSub }}
                </h4>

                <p class="text-sm max-w-[40em] my-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Iste nobis in numquam illo est ratione deleniti quod,
                    quaerat veritatis explicabo quae nostrum eveniet eaque,
                    ipsum laboriosam, provident adipisci vero. Numquam!
                </p>

                <NuxtLink
                    to="/products"
                    class="btn btn-primary mt-[1em] max-md:w-full"
                >
                    Explore
                </NuxtLink>

                <NuxtLink
                    to="/about"
                    class="btn btn-secondary md:ml-2 md:mt-[1em] mt-2 max-md:w-full"
                >
                    About Us
                </NuxtLink>
            </div>
        </div>

        <LandingBestSellersPreview />
        <LandingTopRatingsPreview v-if="ratings" />
    </div>
</template>

<script lang="ts" setup>
const settings = useSettings();

const shopNameFull = computed(() => import.meta.env.VITE_FULL);
const shopNameSub = computed(() => import.meta.env.VITE_SUB);
const landing = computed(() => useAsset("landing/landing1.jpg"));
const ratings = computed(() => settings.ratings);

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
