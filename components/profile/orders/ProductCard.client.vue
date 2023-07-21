<template>
    <div v-if="id !== '0'">
        <h4>
            <NuxtLink :to="'/products/' + id">
                {{ title }} | ${{ (price / 100).toFixed(2) }}
            </NuxtLink>
            x{{ amount }}
        </h4>

        <!-- TODO: Improve stock display globally -->
        <p>{{ stock }}</p>
    </div>
    <h4 v-else>Hidden Product</h4>
</template>

<script lang="ts" setup>
defineProps<{
    id: string;
    title: string;
    price: number;
    stock: string;
    amount: string;
}>();
</script>
