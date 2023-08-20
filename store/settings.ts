export interface Settings {
    id: string;
    currency: string;
    shipping: string;
    purchase: boolean;
    ratings: boolean;
}

export const useSettings = defineStore("settings", () => {
    const loaded = ref(false);
    const state = ref("FATAL");

    const currency = ref("");
    const shipping = ref("");
    const purchase = ref(true);
    const ratings = ref(true);

    const init = async () => {
        const { data, error } = await useFetch<Settings>("/api/settings", {
            key: "settings",
        });

        if (data.value) {
            currency.value = data.value.currency;
            shipping.value = data.value.shipping;
            purchase.value = data.value.purchase;
            ratings.value = data.value.ratings;
            state.value = "DEFAULT";
        }

        loaded.value = true;
        return { data, error };
    };

    return { init, loaded, state, currency, shipping, purchase, ratings };
});
