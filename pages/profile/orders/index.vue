<template>
    <div>
        <h2>Orders List</h2>
        <ClientOnly>
            <table>
                <tr>
                    <td>Status</td>
                    <td>Quantity</td>
                    <td>Amount Paid</td>
                    <td>Country/Postal</td>
                    <td>Shipping Status</td>
                    <td>Created</td>
                    <td>Updated</td>
                </tr>

                <ProfileSimpleOrder
                    v-for="order in orders"
                    :id="order.id"
                    :key="order.id"
                    :product-i-d="order.productID"
                    :status="order.status"
                    :quantity="order.quantity"
                    :amount="order.amount"
                    :country="order.country"
                    :postal="order.postal"
                    :shipping="order.shipping"
                    :created-at="String(order.createdAt)"
                    :updated-at="String(order.updatedAt)"
                />
            </table>

            <h2 v-if="!orders.length">Nothing here...</h2>
        </ClientOnly>

        <UiPaginateInput v-model="page" />
    </div>
</template>

<script lang="ts" setup>
import type { Orders } from "composables/useFetchOrders";

definePageMeta({ middleware: ["auth", "purchase"] });

const page = ref(0);
const orders = ref<Orders[]>([]);

const loadOrders = async () => {
    orders.value = await useFetchOrders(page.value);
};

onMounted(loadOrders);
watch(page, loadOrders);
</script>
