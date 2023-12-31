<template>
    <div class="mb-8">
        <div class="grid md:grid-cols-5 md:grid-rows-1 md:gap-4 grid-cols-1">
            <UiDelayedInput
                v-model="options.search"
                classes="md:col-span-4 max-w-full input-ghost-primary input"
                maxlength="20"
                type="text"
                placehold="Search"
            />

            <button
                class="md:col-start-5 md:mt-0 mt-2 btn btn-solid-primary"
                :disabled="options.order === 'any'"
                @click="options.sort = options.sort === 'asc' ? 'desc' : 'asc'"
            >
                {{ options.sort.toUpperCase() }}
            </button>
        </div>

        <div class="my-2">
            <div class="hidden md:inline-block">
                <button
                    v-for="f in filters"
                    :key="f"
                    :class="`${
                        options.order === f
                            ? 'btn-solid-secondary'
                            : 'btn-outline-secondary'
                    }`"
                    class="btn mr-2"
                    @click="setFilter(f)"
                >
                    {{ getFilter(f) }}
                </button>
            </div>

            <select
                v-model="options.order"
                class="select md:hidden block text-center max-w-full"
            >
                <option value="any">Any</option>
                <option value="title">Title</option>
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
            </select>

            <div
                v-if="props.loading"
                class="spinner-simple md:inline-block md:float-right m-auto block my-4 w-8 h-8"
            ></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
type FilterType = "any" | "title" | "date" | "price" | "rating";

const filters = ["any", "title", "date", "price", "rating"];
const props = defineProps<{
    loading: boolean;
    paginate: number;
}>();

const options = reactive({
    search: "",
    order: "any" as FilterType,
    sort: "asc" as "asc" | "desc",
});

const emit = defineEmits<{
    (e: "search", page: number, values: typeof options, reset: boolean): void;
}>();

const setFilter = (filter: string) => {
    options.order = filter as FilterType;
};

const getFilter = (filter: string) => {
    return filter.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
};

watch(
    () => props.paginate,
    () => {
        emit("search", props.paginate, options, false);
    }
);

watch(options, () => emit("search", 0, options, true));
</script>
