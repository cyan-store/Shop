<template>
    <div
        class="bg-img rounded-md w-full h-full xl:m-10 m-2 relative"
        :style="`background-image: ${image}`"
    >
        <div
            v-if="loading"
            class="absolute flex items-center justify-center w-full h-full"
        >
            <div
                class="bg-black opacity-40 w-full h-full absolute rounded-md"
            ></div>
            <div class="spinner-simple"></div>
        </div>

        <div class="flex h-full items-center px-2">
            <div class="flex-1">
                <button
                    class="btn btn-solid rounded-full px-2 py-4 h-0 opacity-60 hover:opacity-90"
                    :disabled="loading"
                    @click="update(-1)"
                >
                    <ArrowLeftIcon class="w-4 h-4" />
                </button>
            </div>

            <div class="flex-1 text-right">
                <button
                    class="btn btn-solid rounded-full px-2 py-4 h-0 opacity-60 hover:opacity-90"
                    :disabled="loading"
                    @click="update(1)"
                >
                    <ArrowRightIcon class="w-4 h-4" />
                </button>
            </div>
        </div>

        <div class="absolute bottom-0 w-full py-3 text-center">
            <button
                v-for="(i, j) in images"
                :key="i"
                :class="{ 'opacity-90': j == idx }"
                :disabled="loading"
                class="w-3 h-3 rounded-full mx-1 bg-white opacity-60 hover:opacity-90"
                @click="() => (idx = j)"
            ></button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/20/solid";

const images = ref([
    "https://source.unsplash.com/random/400x280",
    "https://source.unsplash.com/random/401x280",
    "https://source.unsplash.com/random/402x280",
    "https://source.unsplash.com/random/403x280",
]);

const idx = ref(0);
const image = ref("");
const loading = ref(true);

const update = (n: number) => {
    if (idx.value + n < 0) {
        idx.value = images.value.length - 1;

        return;
    } else if (idx.value + n >= images.value.length) {
        idx.value = 0;
        return;
    }

    idx.value += n;
};

const load = () => {
    const img = new Image();

    loading.value = true;
    img.src = images.value[idx.value];

    img.onload = () => {
        loading.value = false;
    };

    image.value = `url("${img.src}")`;
};

onMounted(load);
watch(idx, load);
</script>

<style scoped>
.bg-img {
    min-height: 280px;
    max-height: 450px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
</style>
