<template>
    <div class="my-4">
        <div class="md:inline-flex md:w-[75%]">
            <button
                class="flex-1 mr-2 btn btn-solid-error w-full"
                :disabled="cartEmpty"
                @click="clear"
            >
                Clear Cart
            </button>

            <button
                class="flex-1 btn btn-solid-success w-full my-2 md:my-0"
                :disabled="cartEmpty"
                @click="checkout"
            >
                Checkout
            </button>
        </div>

        <hr class="my-4 inline-block w-full md:hidden" />
        <p class="md:float-right font-bold text-xl text-center">
            ${{ total }} ({{ settings.currency }})
        </p>
    </div>
</template>

<script lang="ts" setup>
const app = useNuxtApp();
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
    app.$swal
        .fire({
            title: "Are you sure you want to empty your cart?",
            showCancelButton: true,
            confirmButtonText: "Clear",
        })
        .then((result: { isConfirmed: boolean }) => {
            if (result.isConfirmed) {
                cart.clear();
            }
        });
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
