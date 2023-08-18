<template>
    <div class="hidden sm:block">
        <div class="grid items-center grid-cols-5 grid-rows-1 gap-2 py-2">
            <div
                class="block rounded-md max-w-[150px] max-h-[50px] overflow-hidden bg-forced"
                :style="`background-image: url('${img}')`"
            >
                <img :src="img" class="opacity-0" />
            </div>

            <label for="cart-modal" @click="product">
                <h2 class="hover:underline">{{ title }}</h2>
                <h4 v-if="subtitle != 'null'" class="opacity-60 text-[0.7em]">
                    {{ subtitle }}
                </h4>
            </label>

            <div className="col-span-2 col-start-3">
                <UiItemManager
                    :id="id"
                    class="scale-[70%] text-center leading-[45px]"
                />
            </div>

            <div class="text-[0.9em] text-center">
                <div>${{ (price / 100).toFixed(2) }}</div>
                <div class="text-[0.7em]">({{ settings.currency }})</div>
            </div>
        </div>

        <hr class="mt-4" />
    </div>

    <!-- Mobile -->
    <div class="block sm:hidden">
        <div class="m-auto max-w-full">
            <div class="my-4">
                <label for="cart-modal" class="font-bold text-xl">
                    <span class="hover:underline" @click="product">
                        {{ title }}
                    </span>

                    <h4 class="opacity-60 text-sm float-right">
                        x{{ amount }}
                    </h4>
                </label>

                <div class="text-content2 mt-2">
                    <span class="font-bold">Price: </span>
                    <span class="mb-4 inline-block">
                        ${{ (price / 100).toFixed(2) }} ({{
                            settings.currency
                        }})
                    </span>

                    <div class="sm:text-left text-center">
                        <UiItemManager :id="id" />
                    </div>
                </div>
            </div>
        </div>

        <hr class="mt-4" />
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
const img = computed(() => useImage(props.images));
</script>

<style scoped>
.bg-forced {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 150px;
}
</style>
