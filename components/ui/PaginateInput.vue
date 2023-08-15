<template>
    <div class="my-4">
        <button
            class="btn btn-solid-primary mx-2"
            :disabled="modelValue === 0"
            @click="paged(-1)"
        >
            <ArrowLeftIcon class="w-4 h-4" />
        </button>

        <span class="font-bold text-xl select-none">
            {{ modelValue + 1 }}
        </span>

        <button
            class="btn btn-solid-primary mx-2"
            :disabled="modelValue > 50000"
            @click="paged(1)"
        >
            <ArrowRightIcon class="w-4 h-4" />
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/20/solid";

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
