<template>
    <div>
        <UiDelayedInput
            v-model="options.search"
            maxlength="20"
            type="text"
            placehold="Search"
        />

        <select v-model="options.order">
            <option value="any">Any</option>
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
        </select>

        <button
            :disabled="options.order === 'any'"
            @click="options.sort = options.sort === 'asc' ? 'desc' : 'asc'"
        >
            {{ options.sort }}
        </button>

        <UiPaginateInput
            v-model="page"
            @clicked="emit('search', page, options)"
        />

        <pre>{{ options }} {{ page }}</pre>
    </div>
</template>

<script lang="ts" setup>
const page = ref(0);

const options = reactive({
    search: "",
    order: "any" as "any" | "title" | "date" | "price" | "rating",
    sort: "desc" as "asc" | "desc",
});

const emit = defineEmits<{
    (e: "search", page: number, values: typeof options): void;
}>();

watch(options, () => {
    emit("search", 0, options);
    page.value = 0;
});
</script>
