<template>
    <div>
        <div>
            <button :disabled="max" @click="add">+</button>
            <span>{{ count }}</span>
            <button @click="sub">-</button>
        </div>

        <button @click="cart.remove(id)">Remove</button>
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
