import prisma from "@/server/data/prisma";

export default defineEventHandler(async (evt) => {
    try {
        evt.context.settings = await prisma.system.findFirstOrThrow();
    } catch (err) {
        process.stdout.write("[FATAL] Could not fetch system settings!");
        process.stderr.write(String(err));
    }
});
