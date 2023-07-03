export default defineSafeEventHandler((evt) => {
    return evt.context.auth;
});
