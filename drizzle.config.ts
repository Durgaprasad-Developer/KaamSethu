// drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts", // Point to your schema file
  out: "./drizzle", // Directory to output migration files
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Get the URL from your .env.local
  },
});