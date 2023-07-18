<template>
    <div class="text-center my-4">
        <button
            class="btn btn-solid-secondary"
            :disabled="disabled"
            @click="$emit('clicked')"
        >
            Load More
        </button>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    disabled: boolean;
}>();

defineEmits<{
    (e: "clicked"): void;
}>();
</script>
