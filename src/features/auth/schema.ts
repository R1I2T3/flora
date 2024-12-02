import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const forgetPasswordSchema = z.object({
  email: z.string().email(),
});
export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
export type SignUpType = z.infer<typeof SignUpSchema>;
export type SignInType = z.infer<typeof SignInSchema>;
export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
