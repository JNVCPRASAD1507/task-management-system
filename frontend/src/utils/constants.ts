
import type {
  TaskPriority,
  TaskStatus,
} from "../types/task.types";
import type {
  UserRole,
  UserStatus,
} from "../types/auth.types";

export const USER_ROLES: UserRole[] = [
  "admin",
  "manager",
  "member",
];

export const USER_STATUSES: UserStatus[] = [
  "active",
  "inactive",
];

export const TASK_STATUSES: TaskStatus[] = [
  "todo",
  "in_progress",
  "completed",
  "cancelled",
];

export const TASK_PRIORITIES: TaskPriority[] = [
  "low",
  "medium",
  "high",
  "urgent",
];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  manager: "Manager",
  member: "Member",
};

export const PAGE_SIZE = 10;
