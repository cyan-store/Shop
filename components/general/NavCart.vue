<template>
    <span v-if="settings.state !== 'NOPURCHASE'">
        <span @click="dialog = true">Cart</span>
        <dialog :open="dialog">
            <h2>Cart</h2>

            <div v-if="cart.items.length">
                <div v-for="item in cart.items" :key="item.id">
                    <h2>{{ item.title }} - {{ item.subtitle }}</h2>
                    <p>{{ item.price }} | x{{ item.amount }}</p>
                    <button @click="cart.remove(item.id)">Remove</button>
                    <hr />
                </div>

                <button @click="clear">Clear Cart</button>
                <NuxtLink to="/profile/checkout">Checkout</NuxtLink>
            </div>
            <div v-else>
                <h2>Nothing here</h2>
            </div>

            <button @click="dialog = false">Close</button>
        </dialog>
        |
    </span>
</template>

<script lang="ts" setup>
const cart = useCart();
const settings = useSettings();
const dialog = ref(false);

const clear = () => {
    if (confirm("Are you sure?")) {
        cart.clear();
    }
};
</script>
