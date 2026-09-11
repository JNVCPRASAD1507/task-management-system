
import type { TaskPriority, TaskStatus } from "./task.types";

export interface DashboardStats {
  total_tasks: number;
  todo_tasks: number;
  in_progress_tasks: number;
  completed_tasks: number;
  cancelled_tasks: number;
  total_users: number;
  active_users: number;
  overdue_tasks: number;
  my_tasks: number;
}

export interface DashboardTaskSummary {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  assignee_name: string | null;
}

export interface DashboardResponse {
  stats: DashboardStats;
  recent_tasks: DashboardTaskSummary[];
}

