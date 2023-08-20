<template>
    <div v-if="!isFatal" class="mt-[5vh] bg-[#f3f3f3] p-10">
        <div class="lg:grid grid-rows-1 grid-cols-5 max-w-[1600px] m-auto">
            <div class="px-4 col-span-2 max-lg:mb-2">
                <!-- TODO: Logo here -->
                <h2 class="font-bold text-3xl mb-2">{{ shopName }}</h2>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Magni tempore facere earum fugiat, voluptatum eos quas
                    voluptatibus corporis quos alias.
                </p>
            </div>

            <hr class="lg:hidden my-4" />

            <div class="px-4">
                <h2 class="font-bold text-lg max-lg:mb-2">Site Index</h2>
                <div>
                    <NuxtLink class="link block" to="/products">
                        Products
                    </NuxtLink>

                    <NuxtLink class="link block" to="/about">About</NuxtLink>
                    <NuxtLink class="link block" to="/about/faq">FAQ</NuxtLink>
                </div>
            </div>

            <hr class="lg:hidden my-4" />

            <div v-if="auth" class="px-4">
                <h2 class="font-bold text-lg max-lg:mb-2">Profile</h2>
                <div>
                    <NuxtLink
                        v-if="settings.purchase"
                        class="link block"
                        to="/profile/orders"
                    >
                        Order History
                    </NuxtLink>

                    <NuxtLink
                        v-if="settings.ratings"
                        class="link block"
                        to="/profile/ratings"
                    >
                        My Ratings
                    </NuxtLink>
                </div>
            </div>

            <hr class="lg:hidden my-4" />

            <div class="px-4">
                <h2 class="font-bold text-lg max-lg:mb-2">Support</h2>
                <div>
                    <a
                        v-if="supportPhone"
                        class="link block"
                        :href="`tel:+${supportPhone}`"
                    >
                        <PhoneIcon class="h-[1em] w-[1em] inline mr-1" />
                        <span>{{ supportPhone }}</span>
                    </a>

                    <a
                        v-if="supportEmail"
                        class="link block"
                        :href="`mailto:${supportEmail}`"
                    >
                        <EnvelopeIcon class="h-[1em] w-[1em] inline mr-1" />
                        <span>{{ supportEmail }}</span>
                    </a>
                </div>
            </div>

            <!-- Empty grid space -->
            <div v-if="!auth"></div>
        </div>

        <div class="text-right mt-10 max-w-[1600px] m-auto max-sm:text-center">
            <a v-if="facebook" :href="facebook" target="_blank">
                <img
                    src="/socials/fb.svg"
                    class="w-[2em] h-[2em] inline ml-2"
                />
            </a>

            <a v-if="twitter" :href="twitter" target="_blank">
                <img
                    src="/socials/tw.svg"
                    class="w-[2em] h-[2em] inline ml-2"
                />
            </a>

            <a v-if="instagram" :href="instagram" target="_blank">
                <img
                    src="/socials/in.svg"
                    class="w-[2em] h-[2em] inline ml-2"
                />
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/24/outline";

const { status } = useAuth();
const settings = useSettings();

const isFatal = computed(() => settings.state === "FATAL");
const auth = computed(
    () =>
        status.value === "authenticated" &&
        (settings.purchase || settings.ratings)
);

// Shop
const shopName = computed(() => import.meta.env.VITE_SHOP);
const supportPhone = computed(() => import.meta.env.VITE_PHONE);
const supportEmail = computed(() => import.meta.env.VITE_EMAIL);

// Social
const facebook = computed(() => import.meta.env.VITE_FACEBOOK);
const twitter = computed(() => import.meta.env.VITE_TWITTER);
const instagram = computed(() => import.meta.env.VITE_INSTAGRAM);
</script>

<style scoped>
a img:hover {
    opacity: 60%;
}
</style>
