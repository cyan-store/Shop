// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@sidebase/nuxt-auth",
        "nuxt-rating",
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
    ],

    app: {
        pageTransition: { name: "page", mode: "out-in" },
    },

    imports: { dirs: ["./store"] },
    devtools: { enabled: false },

    pinia: {
        autoImports: ["defineStore", "acceptHMRUpdate"],
    },
});
