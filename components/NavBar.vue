<template>
    <div v-if="!isFatal" class="navbar rounded-lg">
        <div class="navbar-start">
            <div v-if="auth" class="avatar avatar-ring avatar-md">
                <div class="dropdown-container">
                    <div class="dropdown">
                        <label
                            class="btn btn-ghost flex cursor-pointer px-0"
                            tabindex="0"
                        >
                            <img :src="data?.user?.image || ''" alt="avatar" />
                        </label>
                        <div class="dropdown-menu dropdown-menu-bottom-right">
                            <NuxtLink
                                to="/profile"
                                class="dropdown-item text-sm"
                            >
                                My Profile
                            </NuxtLink>

                            <NuxtLink
                                to="/profile/orders"
                                tabindex="-1"
                                class="dropdown-item text-sm"
                            >
                                Orders
                            </NuxtLink>

                            <NuxtLink
                                to="/profile/ratings"
                                tabindex="-1"
                                class="dropdown-item text-sm"
                            >
                                Ratings
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <NuxtLink to="/products" class="navbar-item">
                <BuildingStorefrontIcon class="h-6 w-6" />
            </NuxtLink>
        </div>

        <div class="navbar-center">
            <NuxtLink class="navbar-item" to="/">
                <b class="font-bold text-xl">Shop</b>
            </NuxtLink>
        </div>

        <div class="navbar-end">
            <template v-if="auth">
                <GeneralNavCart />

                <div class="navbar-item" @click="logout">
                    <ArrowRightOnRectangleIcon class="h-6 w-6" />
                </div>
            </template>
            <template v-else>
                <div class="navbar-item" @click="signIn('auth0')">
                    <UserPlusIcon class="h-6 w-6" />
                </div>

                <div class="navbar-item" @click="signIn('auth0')">
                    <ArrowLeftOnRectangleIcon class="h-6 w-6" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    ArrowLeftOnRectangleIcon,
    UserPlusIcon,
    BuildingStorefrontIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

const { signIn, signOut, status, data } = useAuth();

const settings = useSettings();
const cart = useCart();
const auth = computed(() => status.value === "authenticated");
const isFatal = computed(() => settings.state === "FATAL");

const logout = async () => {
    if (confirm("Are you sure?")) {
        cart.clear();

        await signOut({
            redirect: true,
            callbackUrl: "/",
        });
    }
};
</script>
