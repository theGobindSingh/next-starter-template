import { media } from "@/collections/media";
import { users } from "@/collections/users";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: users.slug,
    importMap: { baseDir: dirname },
  },
  collections: [users, media],
  editor: lexicalEditor(),
  // Payload refuses to start without it; set PAYLOAD_SECRET in .env.
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL ?? "file:./payload.db" },
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
