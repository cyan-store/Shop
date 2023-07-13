import { env } from "process";
import { createClient } from "redis";

const client = createClient({
    url: env.CACHE_URL!,
});

client.on("error", (err) => {
    // TODO: Improve this
    process.stderr.write(String(err));
});

client.connect();

export default client;
