<template>
    <div>
        <button class="btn btn-solid-primary" :disabled="max" @click="add">
            +
        </button>

        <span class="text-lg mx-3 select-none">{{ count }}x</span>
        <button class="btn btn-solid-primary" @click="sub">-</button>

        <button
            class="ml-2 item-rm btn btn-solid-secondary"
            @click="cart.remove(id)"
        >
            Remove
        </button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ id: string }>();
const cart = useCart();

const max = computed(() => {
    const inc = cart.includes(props.id);

    if (inc === -1) return false;
    return cart.items[inc].amount >= 20;
});

const count = computed(() => {
    const inc = cart.includes(props.id);

    if (inc === -1) return 0;
    return cart.items[inc].amount;
});

const add = () => {
    const inc = cart.includes(props.id);

    if (inc !== -1) {
        cart.add(cart.items[inc]);
    }
};

const sub = () => {
    const inc = cart.includes(props.id);

    if (inc !== -1) {
        cart.sub(cart.items[inc]);
    }
};
</script>

<style scoped>
@media screen and (max-width: 400px) {
    .item-rm {
        display: inline-block;
        width: 100%;
        margin-top: 5px;
    }
}
</style>
