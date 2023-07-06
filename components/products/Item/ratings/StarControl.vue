<template>
    <div>
        <h2>Average: {{ stats?.average }}*</h2>
        <select v-model="star">
            <option value="0">Any</option>
            <option value="5">5 Stars ({{ stats?.total[4] }})</option>
            <option value="4">4 Stars ({{ stats?.total[3] }})</option>
            <option value="3">3 Stars ({{ stats?.total[2] }})</option>
            <option value="2">2 Stars ({{ stats?.total[1] }})</option>
            <option value="1">1 Stars ({{ stats?.total[0] }})</option>
        </select>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    modelValue: string;
    id: string;
}>();

const emits = defineEmits<{
    (e: "update:modelValue", evt: String): void;
    (e: "switched"): void;
}>();

const star = ref("0");
const stats = await useFetchRatingsStats(props.id);

watch(star, () => {
    emits("update:modelValue", star.value);
    emits("switched");
});
</script>
