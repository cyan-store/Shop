<template>
    <div>
        <template v-if="props.rating">
            <hr class="my-10" />
            <h2 class="sm:text-xl my-4">
                Please remove your current rating to write a new one!
            </h2>
        </template>

        <textarea
            v-model="review"
            class="textarea textarea-solid resize-none"
            placeholder="Write a review... (optional)"
            maxlength="149"
        ></textarea>

        <div class="flex my-2">
            <NuxtRating
                class="flex-1"
                :read-only="false"
                :rating-value="stars"
                @rating-selected="(n: number) => (stars = n)"
            />

            <div class="opacity-60 text-sm hidden sm:inline">
                {{ review.length }} / 150
            </div>
        </div>

        <div class="text-right">
            <button
                class="btn btn-solid-primary w-full sm:w-auto"
                :disabled="disabled"
                @click="rate"
            >
                Submit
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    rating: boolean;
}>();

const stars = ref(0);
const review = ref("");
const router = useRouter();

const disabled = computed(() => {
    return props.rating || !stars.value;
});

const rate = async () => {
    const req = await useCreateRating(props.id, stars.value, review.value);

    // TODO: Toast
    alert(`${req.rating} created!`);
    router.push(`/products/${props.id}/ratings`);
};
</script>
