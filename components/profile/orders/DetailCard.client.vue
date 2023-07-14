<template>
    <div>
        <div>
            <h3>Location</h3>
            {{ props.country }} | {{ props.postal }}
            <!-- TODO: Map -->
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
            <div>${{ props.amount / 100 }} ({{ settings.currency }})</div>
            <!-- TODO: Convert currency -->
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
</script>
