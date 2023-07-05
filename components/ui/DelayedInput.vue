<template>
    <input
        v-if="!label"
        type="text"
        :placeholder="placehold"
        :disabled="disabled"
        :value="modelValue"
        @input="updateInput"
    />

    <label v-else>
        <span>{{ label }}</span>
        <input
            type="text"
            :placeholder="placehold"
            :disabled="disabled"
            :value="modelValue"
            @input="updateInput"
        />
    </label>
</template>

<script lang="ts" setup>
type Timeout = ReturnType<typeof setTimeout>;
let timer: Timeout;

defineProps<{
    modelValue: string;
    placehold: string;
    label?: string;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", evt: String): void;
}>();

const updateInput = (evt: Event) => {
    const text = (evt.target as HTMLInputElement).value;

    clearInterval(timer);
    timer = setTimeout(() => {
        emit("update:modelValue", text);
    }, 500);
};
</script>
