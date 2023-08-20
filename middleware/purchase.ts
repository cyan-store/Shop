export default defineNuxtRouteMiddleware(() => {
    const settings = useSettings();

    if (!settings.purchase) {
        return navigateTo("/");
    }
});
