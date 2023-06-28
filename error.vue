<template>
    <NuxtLayout>
        <h1>Error!</h1>
        <h3>{{ error?.statusCode }}</h3>
        <p>{{ error?.message }}</p>
        <button @click="goBack">Go back</button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { NuxtError } from "nuxt/app";

defineProps<{
    error: Partial<NuxtError>;
}>();

const goBack = () => {
    clearError({
        redirect: "/",
    });
};
</script>
