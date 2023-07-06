<template>
    <div>
        <h2>{{ props.title }}</h2>
        <pre>{{ props }}</pre>
    </div>
</template>

<script lang="ts" setup>
import { Stock } from "@prisma/client";

const props = defineProps<{
    title: string;
    subtitle: string | null;
    description: string;
    images: string;
    tags: string;
    price: number;
    stock: Stock;
    createdAt: string;
    updatedAt: string;
}>();
</script>
