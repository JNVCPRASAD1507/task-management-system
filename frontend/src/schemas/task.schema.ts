
import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required.")
    .max(200, "Task title must be 200 characters or less."),

  description: z
    .string()
    .optional()
    .nullable(),

  priority: z.enum([
    "low",
    "medium",
    "high",
    "urgent",
  ]),

  due_date: z
    .string()
    .optional()
    .nullable(),

  assignee_id: z
    .number()
    .int()
    .positive()
    .optional()
    .nullable(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
