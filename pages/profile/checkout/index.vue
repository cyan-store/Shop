<template>
    <div>
        <h2>Checkout</h2>

        <div v-if="cart.items">
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
            <h2>Nothing here...</h2>
        </div>

        <ProfileCheckoutControlCart />
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth", "purchase"] });

const cart = useCart();
</script>
