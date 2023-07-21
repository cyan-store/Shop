<template>
    <div>
        <textarea
            v-model="review"
            placeholder="Write a review... (optional)"
            maxlength="149"
        ></textarea>

        <NuxtRating
            :read-only="false"
            :rating-value="stars"
            @rating-selected="(n: number) => (stars = n)"
        />

        <h4 v-if="props.rating">
            Please remove your current rating to write a new one!
        </h4>
        <button :disabled="disabled" @click="rate">Submit</button>
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
