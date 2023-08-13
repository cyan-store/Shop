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
                    Explore Products
                </NuxtLink>

                <a class="btn btn-secondary ml-2 mt-[1em]" @click="directAuth">
                    {{ auth ? "My Profile" : "Sign in" }}
                </a>
            </div>
        </div>

        <div class="divider divider-horizontal">Products</div>
        <div class="m-auto">
            <h2 class="text-center font-bold text-2xl">Best Sellers</h2>

            <LandingBestSellersPreview />
        </div>

        <!--
        <div class="divider divider-horizontal">Ratings</div>
        <div class="m-auto">
            <h2 class="text-center font-bold text-2xl">User Ratings</h2>

            <LandingTopRatingsPreview />
        </div>
        -->
    </div>
</template>

<script lang="ts" setup>
const { status, signIn } = useAuth();
const router = useRouter();

const shopNameFull = computed(() => import.meta.env.VITE_FULL);
const shopNameSub = computed(() => import.meta.env.VITE_SUB);

const auth = computed(() => status.value === "authenticated");
const directAuth = () => {
    if (auth.value) {
        router.push("/profile");
        return;
    }

    signIn("auth0");
};

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
