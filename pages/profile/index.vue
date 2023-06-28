<template>
    <div>
        <h2>{{ status }}</h2>
        <pre>{{ data }}</pre>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: "auth" });

const { status, data } = useAuth();

// eslint-disable-next-line no-console
useFetch("/api/profile").then(console.info);
</script>
