<template>
    <h2>Orders</h2>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth", "purchase"] });
</script>
