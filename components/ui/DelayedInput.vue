<template>
    <input
        type="text"
        :class="classes"
        :placeholder="placehold"
        :disabled="disabled"
        :value="modelValue"
        @input="updateInput"
    />
</template>

<script lang="ts" setup>
type Timeout = ReturnType<typeof setTimeout>;
let timer: Timeout;

defineProps<{
    modelValue: string;
    placehold: string;
    classes?: string;
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
