import { getServerSession } from "#auth";

const auth = ["/api/profile"];

export default defineEventHandler(async (evt) => {
    const session = await getServerSession(evt);
    const req = getRequestURL(evt);

    if (auth.includes(req.pathname) && !session?.user) {
        throw createError({
            statusCode: 403,
            statusMessage: "Forbidden!",
        });
    }

    evt.context.auth = session;
});
