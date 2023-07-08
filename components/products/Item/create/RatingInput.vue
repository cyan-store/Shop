<template>
    <div>
        <p>Rating input</p>
        <pre>{{ props.rating }}</pre>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    rating: boolean;
}>();
</script>
