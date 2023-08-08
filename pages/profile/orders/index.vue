<template>
    <div>
        <div class="md:flex justify-between my-4">
            <h2
                class="text-lg max-md:text-2xl max-md:font-bold max-md:text-center mt-2"
            >
                My Orders
            </h2>

            <h4 class="text-content2 text-center my-2 text-sm md:hidden">
                Order history
            </h4>

            <button class="btn btn-primary max-md:w-full" @click="sortItem">
                {{ sort.toUpperCase() }}
            </button>

            <hr class="md:hidden my-4" />
        </div>

        <ClientOnly>
            <div v-if="loading">
                <div class="spinner-simple m-auto my-[20vh]"></div>
            </div>
            <template v-else>
                <h2
                    v-if="!orders.length"
                    class="text-center opacity-60 italic text-2xl my-[25vh]"
                >
                    No orders found!
                </h2>
                <div v-else class="flex w-full overflow-x-auto">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Quantity</th>
                                <th>Amount Paid</th>
                                <th>Country/Postal</th>
                                <th>Shipping Status</th>
                                <th>Created</th>
                                <th>Updated</th>
                            </tr>
                        </thead>

                        <tbody>
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
                        </tbody>
                    </table>
                </div>
            </template>
        </ClientOnly>

        <div class="text-center my-8">
            <UiPaginateInput v-model="page" class="inline-block" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Orders } from "composables/useFetchOrders";

useHead({ title: useTitle("Orders") });
definePageMeta({
    layout: "margin",
    middleware: ["auth", "purchase"],
});

const page = ref(0);
const sort = ref("desc");
const loading = ref(true);
const orders = ref<Orders[]>([]);

const loadOrders = async () => {
    loading.value = true;
    orders.value = await useFetchOrders(page.value, sort.value);
    loading.value = false;
};

const sortItem = () => {
    sort.value = sort.value === "asc" ? "desc" : "asc";
};

onMounted(loadOrders);
watch(page, loadOrders);
watch(sort, loadOrders);
</script>
