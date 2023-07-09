import type { Status } from "@prisma/client";

export interface Settings {
    id: string;
    status: Status | "FATAL";
    currency: string;
    ratings: boolean;
}

export const useSettings = defineStore("settings", () => {
    const loaded = ref(false);
    const state = ref("FATAL");
    const currency = ref("");
    const ratings = ref(true);

    const init = async () => {
        const { data, error } = await useFetch<Settings>("/api/settings", {
            key: "settings",
        });

        if (data.value) {
            state.value = data.value.status;
            currency.value = data.value.currency;
            ratings.value = data.value.ratings;
        }

        loaded.value = true;
        return { data, error };
    };

    return { init, loaded, state, currency, ratings };
});
