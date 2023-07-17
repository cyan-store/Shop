<template>
    <div class="card card-image-cover m-auto sm:m-0">
        <img src="https://source.unsplash.com/random/300x200" />
        <div class="card-body">
            <NuxtLink :to="'/products/' + id" class="card-header">
                {{ title }}
            </NuxtLink>

            <h4 class="card-header text-sm opacity-60">
                {{ subtitle ? subtitle + " | " : "" }} ${{ price / 100 }}
                {{ settings.currency }}
            </h4>

            <p class="text-content2">
                {{ description }}
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
defineProps<{
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
</script>
