import { env } from "process";
import Stripe from "stripe";

export default new Stripe(env.STRIPE_KEY!, {
    apiVersion: "2022-11-15",
    typescript: true,
});
