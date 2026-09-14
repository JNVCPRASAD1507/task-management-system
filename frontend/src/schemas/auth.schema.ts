
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required.")
    .max(128, "Password is too long."),
});

export const registerSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must contain at least 2 characters.")
    .max(100, "Full name is too long."),

  email: z
    .string()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password is too long."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
