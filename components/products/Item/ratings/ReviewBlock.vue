<template>
    <div style="border: 1px solid red">
        <h2>{{ name }}</h2>
        <p v-if="description">{{ description }}</p>
        <code>{{ rating }}</code>
        <h4>{{ createdAt }}</h4>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    id: string;
    name: string;
    description: string | null;
    rating: number;
    createdAt: string;
}>();
</script>
