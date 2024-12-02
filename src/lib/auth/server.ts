import { betterAuth, User } from "better-auth";
import { db } from "../db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "../env";
import * as authSchema from "../db/schema/auth";
import { SendVerificationCode } from "../mail/sendVerificationToken";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailVerification: {
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: User;
      url: string;
    }) => {
      await SendVerificationCode({
        id: user.id,
        email: user.email,
        purpose: "Verify your email",
        url: url,
        db_purpose: "email_verification",
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await SendVerificationCode({
        id: user.id,
        email: user.email,
        purpose: "Reset your password",
        url: url,
        db_purpose: "reset_password",
      });
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
