<template>
    <div>
        <hr />
        <p>${{ total }} ({{ settings.currency }})</p>
        <button :disabled="cartEmpty" @click="clear">Clear Cart</button>
        <button :disabled="cartEmpty" @click="checkout">Checkout</button>
    </div>
</template>

<script lang="ts" setup>
const cart = useCart();
const settings = useSettings();

const cartEmpty = computed(() => !cart.items.length);
const total = computed(() => {
    let t = 0;

    for (const i of cart.items) {
        t += i.price * i.amount;
    }

    return (t / 100).toFixed(2);
});

const clear = () => {
    if (confirm("Are you sure?")) {
        cart.clear();
    }
};

const checkout = async () => {
    const checkout = await useFetchCheckout(cart.items);

    if (!checkout.url) {
        throw createError({
            statusCode: 500,
            statusMessage: "No checkout URL!",
        });
    }

    cart.clear();
    window.location.href = checkout.url;
};
</script>
