<template>
    <tr>
        <td>
            <NuxtLink :to="'/profile/orders/' + props.id">
                {{ props.status }}
            </NuxtLink>
        </td>
        <td>{{ quantity }}</td>
        <td>{{ props.amount }}</td>
        <td>{{ props.country }} - {{ props.postal }}</td>
        <td>{{ props.shipping }}</td>
        <td>{{ props.createdAt }}</td>
        <td>{{ props.updatedAt }}</td>
    </tr>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    productID: string;
    status: string;
    quantity: string;
    amount: number;
    country: string;
    postal: string;
    shipping: string;
    createdAt: string;
    updatedAt: string;
}>();

const quantity = computed(() => props.quantity.replace(/,/g, ", "));
</script>
