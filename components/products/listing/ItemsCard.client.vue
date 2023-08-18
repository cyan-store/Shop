<template>
    <div class="card card-image-cover m-auto sm:m-0">
        <div
            class="min-h-[200px] h-[200px] overflow-hidden bg-forced rounded-md"
            :style="`background-image: url('${img}')`"
        >
            <img :src="img" class="opacity-0" />
        </div>

        <div class="card-body">
            <NuxtLink
                :to="'/products/' + id"
                class="card-header hover:underline"
            >
                {{ title }}
            </NuxtLink>

            <h4 class="card-header text-sm opacity-60">
                {{ subtitle ? subtitle + " | " : "" }} ${{
                    (price / 100).toFixed(2)
                }}
                {{ settings.currency }}
            </h4>

            <p class="text-content2">
                {{ desc }}
            </p>

            <div class="card-footer">
                <NuxtLink :to="'/products/' + id" class="btn-primary btn">
                    View
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    title: string;
    subtitle: string | null;
    description: string;
    images: string;
    tags: string;
    price: number;
    stock: string;
}>();

const settings = useSettings();
const desc = computed(() => props.description.replace(/(.{50})..+/, "$1..."));
const img = computed(() => useImage(props.images));
</script>

<style scoped>
.bg-forced {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.card-body {
    height: 100%;
}
.text-content2 {
    height: 100%;
}

@media (max-width: 640px) {
    .card-footer .btn {
        width: 100%;
    }
}
</style>
