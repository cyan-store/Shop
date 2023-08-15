<template>
    <div>
        <div class="w-full">
            <iframe
                class="rounded-md"
                width="100%"
                height="600"
                frameborder="0"
                :src="mapURL"
            ></iframe>
        </div>

        <h2 class="text-xs text-content2 opacity-60 text-center my-4">
            Last Updated on {{ updatedAt }}
        </h2>
    </div>
</template>

<script lang="ts" setup>
const app = useNuxtApp();
const props = defineProps<{
    postal: string;
    updatedAt: string;
}>();

const updatedAt = computed(() =>
    app.$moment(props.updatedAt).format("MMMM Do, YYYY")
);

const mapURL = computed(() => {
    const params = new URLSearchParams({
        hl: "en",
        q: props.postal,
        output: "embed",
    });

    return `https://maps.google.com/maps?${params.toString()}`;
});
</script>
