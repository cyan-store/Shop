<template>
    <div v-if="rating.name">
        <h2 class="sm:text-xl my-4">Previous Rating:</h2>
        <textarea
            v-if="rating.description != ''"
            v-model="rating.description"
            class="textarea textarea-solid resize-none"
            readonly
        ></textarea>
        <textarea
            v-else
            class="textarea textarea-solid resize-none italic font-bold"
            value="No content provided."
            readonly
        ></textarea>

        <div class="flex my-2">
            <NuxtRating class="flex-1" :rating-value="rating.stars" />

            <div class="opacity-60 text-sm hidden sm:inline">{{ created }}</div>
        </div>

        <div class="text-right">
            <button
                class="btn btn-solid-error w-full sm:w-auto"
                @click="removeRating"
            >
                Delete Current Rating
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { $moment } = useNuxtApp();

const props = defineProps<{
    id: string;
    modelValue: boolean;
}>();

const emits = defineEmits<{
    (e: "update:modelValue", evt: boolean): void;
}>();

const created = computed(() =>
    $moment(rating.createdAt).format("MMMM Do YYYY h:mm a")
);

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
