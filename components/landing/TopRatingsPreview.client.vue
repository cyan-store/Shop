<template>
    <template v-if="show">
        <div class="divider divider-horizontal">Ratings</div>
        <div class="m-auto">
            <h2 class="text-center font-bold text-2xl mt-8">User Ratings</h2>
            <h4 class="text-center text-sm text-content2 opacity-60 my-1">
                Most recent user ratings
            </h4>

            <div class="btn-group m-auto mt-8 btn-group-scrollable">
                <button
                    class="btn"
                    :class="active('all')"
                    @click="period = 'all'"
                >
                    All Time
                </button>
                <button
                    class="btn"
                    :class="active('month')"
                    @click="period = 'month'"
                >
                    Past Month
                </button>
                <button
                    class="btn"
                    :class="active('week')"
                    @click="period = 'week'"
                >
                    Past Week
                </button>
            </div>

            <div v-if="!loading">
                <hr class="my-4 w-[75%] m-auto my-[50px]" />

                <div
                    v-for="rating in ratings"
                    :key="rating.id"
                    class="w-[75%] m-auto"
                >
                    <h4 class="font-bold text-lg">{{ rating.name }}</h4>

                    <NuxtRating
                        class="my-4"
                        rating-size="2"
                        :rating-value="rating.rating"
                    />

                    <div class="my-4 mt-8 break-words">
                        <p v-if="rating.description">
                            {{ rating.description }}
                        </p>

                        <p v-else class="italic font-bold">
                            No content provided.
                        </p>
                    </div>

                    <NuxtLink
                        class="block text-xs text-right text-content2 opacity-60 hover:underline"
                        :to="`/products/${rating.product.id}`"
                    >
                        {{
                            app.$moment(rating.createdAt).format("MMMM Do YYYY")
                        }}
                        |
                        {{ rating.product.title }}
                    </NuxtLink>

                    <hr class="my-4" />
                </div>
            </div>
            <div v-else class="spinner-simple m-auto my-[150px]"></div>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { LandingRating } from "@/composables/useFetchLanding";

const app = useNuxtApp();
const settings = useSettings();
const show = computed(() => settings.ratings);

const period = ref("all");
const loading = ref(true);
const ratings = ref<LandingRating[]>([]);

const active = (n: string) => (period.value === n ? "btn-active" : "");
const getRatings = async () => {
    loading.value = true;

    ratings.value = await useFetchLandingRatings(
        period.value as "all" | "month" | "week"
    );

    loading.value = false;
};

watch(period, getRatings);
onMounted(getRatings);
</script>
