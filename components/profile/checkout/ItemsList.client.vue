<template>
    <div
        class="md:flex my-4 max-md:card max-md:mx-auto max-md:p-4 max-md:text-center"
    >
        <img
            src="https://source.unsplash.com/random/300x200"
            class="md:block hidden flex-1 m-2 rounded-md max-w-[300px]"
        />

        <div class="flex-1 ml-2">
            <h2 class="text-3xl font-bold hover:underline" @click="product">
                {{ title }}
            </h2>

            <h4 v-if="subtitle != 'null'" class="text-lg opacity-60 my-2">
                {{ subtitle }}
            </h4>

            <div class="text-content2">
                <p class="my-8 font-bold mx-4">
                    ${{ (price / 100).toFixed(2) }} ({{ settings.currency }})
                </p>

                <UiItemManager :id="id" />
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
