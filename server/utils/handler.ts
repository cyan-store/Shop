import type { EventHandler } from "h3";

export const defineSafeEventHandler = (handler: EventHandler) => {
    return defineEventHandler(async (event) => {
        try {
            return await handler(event);
        } catch (err: any) {
            if (err?.statusMessage) {
                throw err;
            }

            process.stderr.write(String(err));

            throw createError({
                statusCode: 500,
                statusMessage: "Internal server error",
            });
        }
    });
};
