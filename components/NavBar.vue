<template>
    <div v-if="!isFatal" class="navbar navbar-floating sticky rounded-lg">
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
                                to="/"
                                class="dropdown-item text-sm md:hidden inline"
                            >
                                Home
                            </NuxtLink>

                            <NuxtLink
                                to="/products"
                                class="dropdown-item text-sm md:hidden inline"
                            >
                                Products
                            </NuxtLink>

                            <hr class="md:hidden inline" />

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

                            <hr class="md:hidden inline" />
                            <a
                                class="dropdown-item text-sm md:hidden inline"
                                @click="logout"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hide if auth and md -->
            <NuxtLink
                to="/products"
                class="navbar-item"
                :class="{ 'md:inline hidden': auth }"
            >
                <BuildingStorefrontIcon class="h-6 w-6" />
            </NuxtLink>
        </div>

        <div class="navbar-center">
            <NuxtLink class="navbar-item" to="/">
                <b class="font-bold text-xl">{{ shopName }}</b>
            </NuxtLink>
        </div>

        <div class="navbar-end">
            <template v-if="auth">
                <GeneralNavCart />

                <div class="navbar-item md:inline hidden" @click="logout">
                    <ArrowRightOnRectangleIcon class="h-6 w-6" />
                </div>
            </template>
            <template v-else>
                <div
                    class="navbar-item md:inline hidden"
                    @click="signIn('auth0')"
                >
                    <UserPlusIcon class="h-6 w-6" />
                </div>

                <div
                    class="navbar-item md:inline hidden"
                    @click="signIn('auth0')"
                >
                    <ArrowLeftOnRectangleIcon class="h-6 w-6" />
                </div>

                <div
                    class="navbar-item md:hidden inline"
                    @click="signIn('auth0')"
                >
                    <UserGroupIcon class="h-6 w-6" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    ArrowLeftOnRectangleIcon,
    UserPlusIcon,
    UserGroupIcon,
    BuildingStorefrontIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

const { signIn, signOut, status, data } = useAuth();
const { $swal } = useNuxtApp();

const settings = useSettings();
const cart = useCart();
const shopName = computed(() => import.meta.env.VITE_SHOP);
const auth = computed(() => status.value === "authenticated");
const isFatal = computed(() => settings.state === "FATAL");

const logout = () => {
    $swal
        .fire({
            title: "Are you sure you want to logout?",
            text: "Unsaved items in cart will be lost.",
            showCancelButton: true,
            confirmButtonText: "Logout",
        })
        .then(async (result: { isConfirmed: boolean }) => {
            if (result.isConfirmed) {
                cart.clear();

                await signOut({
                    redirect: true,
                    callbackUrl: "/",
                });
            }
        });
};
</script>
