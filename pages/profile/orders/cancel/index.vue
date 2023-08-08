<template>
    <div class="text-center my-[100px]">
        <h2 class="text-6xl font-bold text-error">Order Complete!</h2>
        <p class="my-[50px] text-xl text-content2">
            Your order has been canceled!
        </p>

        <NuxtLink
            to="/profile/orders"
            class="btn btn-primary text-xl p-[25px] font-bold max-md:w-full"
        >
            Go Back
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
useHead({ title: useTitle("Order Canceled") });
definePageMeta({
    layout: "margin",
    middleware: ["auth", "purchase"],
});
</script>
