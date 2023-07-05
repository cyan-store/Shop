<template>
    <div>
        <button :disabled="modelValue === 0" @click="paged(-1)">Last</button>
        <span>{{ modelValue + 1 }}</span>
        <button :disabled="modelValue > 50000" @click="paged(1)">Next</button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    modelValue: number;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", evt: number): void;
    (e: "clicked"): void;
}>();

const paged = (n: number) => {
    if (props.modelValue + n < 0) {
        return;
    }

    emit("update:modelValue", props.modelValue + n);
    emit("clicked");
};
</script>
