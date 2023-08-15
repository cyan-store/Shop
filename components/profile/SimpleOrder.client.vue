<template>
    <tr @click="openOrder">
        <td>{{ props.status }}</td>
        <td>{{ quantity }}</td>

        <td>
            ${{ (props.amount / 100).toFixed(2) }}
            <span class="text-[0.7em]"> ({{ settings.currency }}) </span>
        </td>

        <td>{{ props.country }} - {{ props.postal }}</td>
        <td>{{ props.shipping }}</td>

        <td :title="props.createdAt">{{ created }}</td>
        <td :title="props.updatedAt">{{ updated }}</td>
    </tr>
</template>

<script lang="ts" setup>
const app = useNuxtApp();
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

const router = useRouter();
const settings = useSettings();

const quantity = computed(
    () =>
        props.quantity
            .split(",")
            .map((n) => parseInt(n))
            .reduce((sm, a) => sm + a) + "x"
);

const created = computed(() =>
    app.$moment(props.createdAt).format("MMMM Do YYYY")
);
const updated = computed(() =>
    app.$moment(props.updatedAt).format("MMMM Do YYYY")
);

const openOrder = () => {
    router.push(`/profile/orders/${props.id}`);
};
</script>

<style scoped>
tr {
    cursor: pointer;
}

tr:hover td {
    opacity: 0.6;
}
</style>
