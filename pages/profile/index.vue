<template>
    <div>
        <pre>{{ data }}</pre>
        <ProfileUserInfo />

        <NuxtLink v-if="settings.ratings" to="/profile/ratings">
            Ratings
        </NuxtLink>
        <NuxtLink v-if="settings.state !== 'NOPURCHASE'" to="/profile/orders">
            Orders
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "margin",
    middleware: "auth",
});

const { data } = useAuth();
const settings = useSettings();

useHead({ title: useTitle(`${data.value?.user?.name}'s Profile'`) });
</script>
