
export type TaskStatus =
  | "todo"
  | "in_progress"
  | "completed"
  | "cancelled";

export type TaskPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: TaskPriority;
  due_date: string | null;
  status: TaskStatus;
  assignee_id: number | null;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string | null;
  priority: TaskPriority;
  due_date?: string | null;
  assignee_id?: number | null;
}

export interface TaskUpdate {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: string | null;
  assignee_id?: number | null;
}

export interface TaskListResponse {
  items: Task[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface TaskFilters {
  page?: number;
  page_size?: number;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee_id?: number;
  search?: string;
}
