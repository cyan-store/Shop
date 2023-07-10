<template>
    <div>
        <h2>{{ status }}</h2>
        <pre>{{ data }}</pre>

        <NuxtLink v-if="settings.ratings" to="/profile/ratings">
            Ratings
        </NuxtLink>
        <NuxtLink v-if="settings.state !== 'NOPURCHASE'" to="/profile/orders">
            Orders
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: "auth" });

const { status, data } = useAuth();
const settings = useSettings();
</script>
