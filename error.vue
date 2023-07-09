<template>
    <NuxtLayout>
        <div>
            <h1>Error!</h1>
            <h3>{{ props.error?.statusCode }}</h3>
            <p>{{ props.error?.message }}</p>
        </div>

        <button v-if="!maintenance" @click="goBack">Go back</button>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { NuxtError } from "nuxt/app";

const props = defineProps<{
    error: Partial<NuxtError>;
}>();

const goBack = () => clearError({ redirect: "/" });
const maintenance = computed(() => props.error.statusCode === 503);
</script>
