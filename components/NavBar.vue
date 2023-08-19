<template>
    <div v-if="!isFatal" class="navbar navbar-floating sticky rounded-lg">
        <div class="navbar-start">
            <div :class="{ 'avatar avatar-ring avatar-md': auth }">
                <div class="dropdown-container">
                    <div class="dropdown">
                        <label
                            class="btn btn-ghost flex cursor-pointer px-0"
                            :class="{ 'px-2': !auth }"
                            tabindex="0"
                        >
                            <Bars3Icon v-if="!auth" class="w-6 h-6" />
                            <img
                                v-else
                                :src="data?.user?.image || ''"
                                alt="avatar"
                            />
                        </label>

                        <div class="dropdown-menu dropdown-menu-bottom-right">
                            <NuxtLink to="/" class="dropdown-item text-sm">
                                Home
                            </NuxtLink>

                            <NuxtLink to="/about" class="dropdown-item text-sm">
                                About
                            </NuxtLink>

                            <NuxtLink
                                to="/products"
                                class="dropdown-item text-sm"
                            >
                                Products
                            </NuxtLink>

                            <hr />

                            <template v-if="auth">
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

                                <hr />
                                <a
                                    class="dropdown-item text-sm"
                                    @click="logout"
                                >
                                    Logout
                                </a>
                            </template>
                            <template v-else>
                                <a class="dropdown-item text-sm" @click="login">
                                    Login
                                </a>

                                <a class="dropdown-item text-sm" @click="login">
                                    Register
                                </a>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
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
                <div class="navbar-item" @click="login">
                    <UserPlusIcon class="h-6 w-6" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    Bars3Icon,
    UserPlusIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

const { signIn, signOut, status, data } = useAuth();
const { $swal } = useNuxtApp();

const settings = useSettings();
const cart = useCart();
const shopName = computed(() => import.meta.env.VITE_SHOP);
const auth = computed(() => status.value === "authenticated");
const isFatal = computed(() => settings.state === "FATAL");

const login = async () => {
    cart.clear();
    await signIn("auth0");
};

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
