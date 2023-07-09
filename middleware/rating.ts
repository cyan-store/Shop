export default defineNuxtRouteMiddleware(() => {
    const settings = useSettings();

    if (!settings.ratings) {
        return navigateTo("/");
    }
});
