<template>
    <div>
        <h2>Order ID {{ route.params.id }}</h2>

        <pre>{{ order }}</pre>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth", "purchase"] });

const route = useRoute();
const order = ref({});

onMounted(async () => {
    const cancel = route.query?.cancel === "true";
    const req = await useFetchOrder(String(route.params.id), cancel);

    order.value = req;
});
</script>
