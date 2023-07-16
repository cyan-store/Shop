<template>
    <div class="card m-auto max-w-full">
        <div class="card-body">
            <h2 class="card-header">{{ title }}</h2>
            <h4 class="card-header opacity-60 text-sm">{{ subtitle }}</h4>
            <div class="text-content2">
                <p>{{ price }} | x{{ amount }}</p>

                <UiItemManager :id="id" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    id: string;
    title: string;
    subtitle: string;
    images: string;
    price: number;
    amount: number;
}>();
</script>
