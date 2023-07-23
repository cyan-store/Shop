<template>
    <div class="card m-auto max-w-full">
        <div class="card-body">
            <label
                for="cart-modal"
                class="btn btn-block card-header p-0 hover:underline"
                @click="product"
            >
                {{ title }}
            </label>

            <h4
                v-if="subtitle != 'null'"
                class="card-header opacity-60 text-sm"
            >
                {{ subtitle }}
            </h4>

            <div class="text-content2">
                <span class="font-bold"> Price: </span>
                <span class="mb-4 inline-block">
                    ${{ (price / 100).toFixed(2) }} ({{ settings.currency }})
                    x{{ amount }}
                </span>

                <div class="sm:text-left text-center">
                    <UiItemManager :id="id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    id: string;
    title: string;
    subtitle: string;
    images: string;
    price: number;
    amount: number;
}>();

const router = useRouter();
const settings = useSettings();

const product = () => router.push(`/products/${props.id}`);
</script>
