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

    const init = async () => {
        const { data, error } = await useFetch<Settings>("/api/settings", {
            key: "settings",
        });

        loaded.value = true;
        state.value = data.value?.status || "FATAL";

        return { data, error };
    };

    return { init, loaded, state };
});
