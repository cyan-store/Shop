<template>
    <NuxtLayout>
        <div class="text-center p-10 max-sm:p-5">
            <div class="mt-[100px] leading-[3em]">
                <h1 class="text-5xl font-bold">Website Error!</h1>
                <h2 class="text-xl opacity-60 mt-2 font-bold text-content2">
                    Status {{ props.error?.statusCode }}
                </h2>

                <p class="my-4">{{ props.error?.message }}</p>
            </div>

            <button
                v-if="!maintenance"
                class="btn btn-primary my-4 max-md:w-full"
                @click="goBack"
            >
                Go Back
            </button>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { NuxtError } from "nuxt/app";

const props = defineProps<{
    error: Partial<NuxtError>;
}>();

const goBack = () => clearError({ redirect: "/" });
const maintenance = computed(() => props.error.statusCode === 503);

useHead({
    title: useTitle(`Error ${props.error.statusCode}`),
});
</script>
