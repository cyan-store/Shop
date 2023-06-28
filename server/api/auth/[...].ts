import { env } from "process";
import Auth0Provider from "next-auth/providers/auth0";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    secret: env.AUTH_SECRET,
    pages: {
        signIn: "/",
    },

    providers: [
        // @ts-expect-error
        Auth0Provider.default({
            clientId: env.AUTH0_CLIENT,
            clientSecret: env.AUTH0_SECRET,
            issuer: env.AUTH0_ISSUER,
        }),
    ],
});
