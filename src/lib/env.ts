import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_URL: z.string(),
    UPLOADTHING_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string(),
    NEXT_PUBLIC_DOMAIN: z.string(),
  },
  runtimeEnv: {
    DB_URL: process.env.DB_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  },
});
