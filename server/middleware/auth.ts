import { getServerSession, getToken } from "#auth";

const auth = ["/api/profile", "/api/profile/ratings"];

export default defineEventHandler(async (evt) => {
    const session = await getServerSession(evt);
    const token = await getToken({ event: evt });
    const req = getRequestURL(evt);

    if (auth.includes(req.pathname) && (!session?.user || !token?.sub)) {
        throw createError({
            statusCode: 403,
            statusMessage: "Forbidden!",
        });
    }

    evt.context.token = token;
    evt.context.auth = session;
});
