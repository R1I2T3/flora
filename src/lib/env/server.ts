import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverENV = createEnv({
  server: {
    DB_URL: z.string(),
    UPLOADTHING_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
});
