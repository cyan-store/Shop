import { defineSafeEventHandler } from "@/server/utils/handler";

export default defineSafeEventHandler((evt) => {
    return evt.context.auth;
});
