export default defineNuxtRouteMiddleware(() => {
    const settings = useSettings();

    if (settings.state === "NOPURCHASE") {
        return navigateTo("/");
    }
});
