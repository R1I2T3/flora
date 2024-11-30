import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type SignUpType = z.infer<typeof SignUpSchema>;
export type SignInType = z.infer<typeof SignInSchema>;
