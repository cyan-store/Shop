<template>
    <template v-if="allowCart">
        <div class="navbar-item relative" @click="() => (dialog = !dialog)">
            <ShoppingCartIcon class="h-6 w-6" />
            <button v-if="cart.items.length" class="btn bg-error cart-icon">
                {{ cartLen }}
            </button>
        </div>

        <input
            v-show="false"
            id="cart-modal"
            v-model="dialog"
            class="modal-state"
            type="checkbox"
        />

        <div class="modal w-screen">
            <label class="modal-overlay" for="cart-modal"></label>
            <div class="modal-content flex flex-col gap-5 w-full">
                <label
                    for="cart-modal"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </label>
                <h2 class="text-xl">Shopping Cart</h2>
                <template v-if="hasItems">
                    <hr />

                    <GeneralNavCartItem
                        v-for="item in cart.items"
                        :id="item.id"
                        :key="item.id"
                        :title="item.title"
                        :subtitle="item.subtitle"
                        :images="item.images"
                        :price="item.price"
                        :amount="item.amount"
                    />
                </template>
                <template v-else>
                    <h2 class="text-center opacity-60 italic my-[100px]">
                        Nothing here
                    </h2>
                </template>

                <div class="flex gap-3">
                    <label for="cart-modal" class="btn btn-block">Cancel</label>
                    <label
                        v-if="hasItems"
                        for="cart-modal"
                        class="btn btn-primary btn-block"
                        @click="checkout"
                    >
                        Checkout
                    </label>
                </div>
            </div>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";

const cart = useCart();
const router = useRouter();
const settings = useSettings();
const dialog = ref(false);

const hasItems = computed(() => !!cart.items.length);
const allowCart = computed(() => settings.state !== "NOPURCHASE");

const cartLen = computed(() => {
    if (cart.items.length > 9) {
        return "9+";
    }

    return cart.items.length;
});

const checkout = () => {
    router.push("/profile/checkout");
};
</script>

<style scoped>
.cart-icon {
    color: #fff;
    border-radius: 100%;
    padding: 0;
    width: 18px;
    height: 18px;
    font-size: 0.8em;
    font-weight: bolder;
    position: absolute;
    bottom: calc(100% - 25px + 5px);
    left: calc(100% - 25px + 5px);
}
</style>
