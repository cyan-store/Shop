import { env } from "process";
import { createClient } from "redis";

const client = createClient({
    url: env.CACHE_URL!,
});

client.on("error", (err) => {
    process.stderr.write(`[redis] Error at: ${env.CACHE_URL}`);
    process.stderr.write(`[redis] isReady: ${client.isReady}`);
    process.stderr.write(`[redis] ${err}`);
    process.stdout.write("\n");
});

client.connect();

export default client;
