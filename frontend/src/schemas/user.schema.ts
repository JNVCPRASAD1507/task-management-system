
import { z } from "zod";

export const userSchema = z.object({
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

  role: z.enum([
    "admin",
    "manager",
    "member",
  ]),
});

export const userUpdateSchema = z.object({
  full_name: z
    .string()
    .min(2)
    .max(100)
    .optional(),

  email: z
    .string()
    .email()
    .optional(),

  role: z
    .enum([
      "admin",
      "manager",
      "member",
    ])
    .optional(),

  status: z
    .enum([
      "active",
      "inactive",
    ])
    .optional(),

  is_active: z
    .boolean()
    .optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
