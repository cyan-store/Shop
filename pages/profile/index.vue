<template>
    <div class="md:w-1/2 m-auto mt-10">
        <ProfileUserInfo />

        <div
            class="max-md:block grid gap-x-2"
            :class="{
                'grid-cols-2': settings.ratings && settings.purchase,
            }"
        >
            <NuxtLink
                v-if="settings.ratings"
                class="btn btn-primary max-md:w-full max-md:my-2"
                to="/profile/ratings"
            >
                My Ratings
            </NuxtLink>

            <NuxtLink
                v-if="settings.purchase"
                class="btn btn-secondary max-md:w-full"
                to="/profile/orders"
            >
                My Orders
            </NuxtLink>

            <div class="btn btn-error my-2 w-full md:hidden">Sign Out</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "margin",
    middleware: "auth",
});

const { data } = useAuth();
const settings = useSettings();

useHead({ title: useTitle(`${data.value?.user?.name}'s Profile`) });
</script>
