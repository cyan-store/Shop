<template>
    <div class="lg:block lg:p-4">
        <div class="lg:block hidden">
            <h2 class="text-xl font-bold">Filter by:</h2>
            <h4 class="text-sm opacity-60 my-2">
                {{ stats?.average.toFixed(2) }} average
            </h4>
            <hr class="my-2" />
        </div>

        <div class="lg:block hidden">
            <div
                v-for="r in 5"
                :key="6 - r"
                :class="{ 'active-rating': activeRating(6 - r) }"
                class="grid grid-cols-2 opacity-40 hover:opacity-100"
                @click="() => (star = String(6 - r))"
            >
                <NuxtRating :rating-value="6 - r" rating-size="8" />
                <div class="text-right font-bold">
                    {{ stats?.total[5 - r] }}x
                </div>
            </div>

            <hr class="my-2" />

            <button class="btn btn-solid-primary w-full mt-5" @click="reset">
                Reset
            </button>
        </div>

        <div>
            <h4 class="lg:hidden block text-center font-bold text-2xl my-2">
                Average: {{ stats?.average.toFixed(2) }}
            </h4>

            <hr class="lg:hidden block my-4" />

            <select
                v-model="star"
                :disabled="loading"
                class="select lg:hidden block text-center max-w-full"
            >
                <option value="0">Any</option>
                <option value="5">5 Stars ({{ stats?.total[4] }})</option>
                <option value="4">4 Stars ({{ stats?.total[3] }})</option>
                <option value="3">3 Stars ({{ stats?.total[2] }})</option>
                <option value="2">2 Stars ({{ stats?.total[1] }})</option>
                <option value="1">1 Stars ({{ stats?.total[0] }})</option>
            </select>

            <NuxtLink
                v-if="props.stock !== 'DISCONTINUED' && auth"
                :to="`/products/${props.id}/ratings/create`"
                class="btn lg:btn-solid-secondary btn-solid-primary w-full my-2"
            >
                Leave a rating
            </NuxtLink>

            <hr class="lg:hidden block mb-4 mt-1" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { status } = useAuth();

const props = defineProps<{
    modelValue: string;
    stock: string;
    id: string;
    loading: boolean;
}>();

const emits = defineEmits<{
    (e: "update:modelValue", evt: String): void;
    (e: "switched"): void;
    (e: "reset"): void;
}>();

const star = ref("0");
const stats = await useFetchRatingsStats(props.id);
const activeRating = (r: number) => star.value === String(r);
const auth = computed(() => status.value === "authenticated");

const reset = () => {
    star.value = "0";
    emits("reset");
};

watch(star, () => {
    emits("update:modelValue", star.value);
    emits("switched");
});
</script>

<style>
.active-rating {
    opacity: 1;
}
</style>
