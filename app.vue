<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script lang="ts" setup>
const settings = useSettings();

if (!settings.loaded) {
    const { error } = await settings.init();

    if (error.value) {
        showError({
            statusCode: 503,
            statusMessage: "Website is under maintenance.",
        });
    }
}
</script>

<style>
.page-enter-from {
    opacity: 0;
}
.page-enter-active {
    transition: all 0.1s ease-in-out;
}
</style>
