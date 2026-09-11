
export interface CommentUser {
  id: number;
  full_name: string;
  email: string;
}

export interface Comment {
  id: number;
  content: string;
  task_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: CommentUser | null;
}

export interface CommentCreate {
  content: string;
}

export interface CommentUpdate {
  content: string;
}

export interface CommentListResponse {
  items: Comment[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

