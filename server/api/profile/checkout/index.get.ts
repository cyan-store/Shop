export default defineSafeEventHandler((evt) => {
    if (evt.context.settings.status === "NOPURCHASE") {
        // Return nothing -> 404
        return;
    }

    return "orders";
});
