<template>
    <div>
        <h2>
            <NuxtLink :to="'/products/' + id">
                {{ title }} | {{ subtitle }}
            </NuxtLink>
            <span> x{{ amount }}</span>
        </h2>

        <!-- TODO: Images -->
        <!-- <img :src="images" /> -->
        <code>{{ price }}</code>
        <UiItemManager :id="id" />
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    id: string;
    title: string;
    subtitle: string;
    images: string;
    price: number;
    amount: number;
}>();
</script>
