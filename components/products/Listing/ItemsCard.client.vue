<template>
    <div style="border: 1px solid red">
        <h1>{{ props.title }}</h1>
        <h2>
            <NuxtLink :to="'/products/' + props.id">{{
                props?.subtitle
            }}</NuxtLink>
        </h2>

        <code>{{ props.description }}</code>
        <h4>${{ props.price }}</h4>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    title: string;
    subtitle: string | null;
    description: string;
    images: string;
    tags: string;
    price: number;
    stock: string;
}>();
</script>
