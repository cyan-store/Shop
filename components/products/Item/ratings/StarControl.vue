<template>
    <select v-model="star">
        <option value="0">Any</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Stars</option>
    </select>
</template>

<script lang="ts" setup>
defineProps<{ modelValue: string }>();

const star = ref("0");
const emits = defineEmits<{
    (e: "update:modelValue", evt: String): void;
    (e: "switched"): void;
}>();

watch(star, () => {
    emits("update:modelValue", star.value);
    emits("switched");
});
</script>
