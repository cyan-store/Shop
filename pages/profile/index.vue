<template>
    <div>
        <h2>{{ status }}</h2>
        <pre>{{ data }}</pre>

        <NuxtLink to="/profile/ratings">Ratings</NuxtLink>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: "auth" });

const { status, data } = useAuth();
</script>
