<template>
    <div v-if="rating.name">
        <h2>{{ rating.name }}</h2>
        <textarea v-model="rating.description" readonly></textarea>
        <h4>{{ rating.stars }}* | {{ rating.createdAt }}</h4>

        <button @click="removeRating">Delete Current Rating</button>
        <hr />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    modelValue: boolean;
}>();

const emits = defineEmits<{
    (e: "update:modelValue", evt: boolean): void;
}>();

const rating = reactive({
    id: "",
    name: "",
    description: "",
    stars: 0,
    createdAt: "",
});

const removeRating = async () => {
    if (!confirm("Are you sure?")) return;

    const del = await useDeleteRating(rating.id);

    // TODO: Toast
    alert(`${del.rating} has been removed.`);
    emits("update:modelValue", false);
    rating.name = "";
};

onMounted(async () => {
    const userRating = await useFetchRatingUser(0, props.id);

    emits("update:modelValue", !!userRating[0]?.name || false);

    if (userRating.length) {
        rating.id = userRating[0].id;
        rating.name = userRating[0].name;
        rating.description = userRating[0].description || "";
        rating.stars = userRating[0].rating;
        rating.createdAt = String(userRating[0].createdAt);
    }
});
</script>
