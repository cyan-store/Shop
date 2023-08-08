<template>
    <div>
        <div>
            <h3>Location</h3>
            <div>{{ props.country }} | {{ props.postal }}</div>

            <div class="w-full">
                <iframe
                    width="100%"
                    height="600"
                    frameborder="0"
                    :src="mapURL"
                ></iframe>
            </div>
        </div>

        <div>
            <h3>Shipping Status:</h3>
            {{ props.shipping }}
        </div>

        <div>
            <h3>Created/Updated:</h3>
            {{ props.createdAt }} | {{ props.updatedAt }}
        </div>

        <div>
            <h3>Cost:</h3>
            <div>
                ${{ (props.amount / 100).toFixed(2) }} ({{ settings.currency }})
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    status: string;
    amount: number;
    country: string;
    postal: string;
    shipping: string;
    createdAt: string;
    updatedAt: string;
}>();

const settings = useSettings();
const mapURL = computed(() => {
    const params = new URLSearchParams({
        hl: "en",
        q: props.postal,
        output: "embed",
    });

    return `https://maps.google.com/maps?${params.toString()}`;
});
</script>
