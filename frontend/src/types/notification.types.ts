
export type NotificationType =
  | "task_assigned"
  | "task_updated"
  | "task_completed"
  | "comment_added"
  | "system";

export interface Notification {
  id: number;
  title: string;
  message: string;
  notification_type: NotificationType;
  is_read: boolean;
  user_id: number;
  created_at: string;
}

export interface NotificationListResponse {
  items: Notification[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}



