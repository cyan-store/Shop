<template>
    <div>
        <h2>{{ props.title }}</h2>
        <pre>{{ props }}</pre>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string;
    subtitle: string | null;
    description: string;
    images: string;
    tags: string;
    price: number;
    stock: "IN_STOCK " | "OUT_STOCK" | "DISCONTINUED";
    createdAt: string;
    updatedAt: string;
}>();
</script>
