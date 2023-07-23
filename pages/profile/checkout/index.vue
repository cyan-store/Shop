<template>
    <div>
        <div class="pt-10 pb-2 text-center w-full font-bold">
            <h2 class="text-4xl">Checkout</h2>
            <h4 class="text-1xl my-2 opacity-60">
                Prices listed in {{ settings.currency }}
            </h4>
        </div>

        <div v-if="cart?.items.length" class="my-4">
            <hr class="my-4" />

            <ProfileCheckoutItemsList
                v-for="item in cart.items"
                :id="item.id"
                :key="item.id"
                :title="item.title"
                :subtitle="item.subtitle"
                :images="item.images"
                :price="item.price"
                :amount="item.amount"
            />
        </div>
        <div v-else>
            <h2
                class="text-center md:text-3xl text-2xl lg:my-[200px] my-[100px] italic opacity-60"
            >
                No items in cart!
            </h2>
        </div>

        <hr />
        <ProfileCheckoutControlCart />
    </div>
</template>

<script lang="ts" setup>
useHead({ title: useTitle("Checkout") });
definePageMeta({
    layout: "margin",
    middleware: ["auth", "purchase"],
});

const settings = useSettings();
const cart = useCart();
</script>
