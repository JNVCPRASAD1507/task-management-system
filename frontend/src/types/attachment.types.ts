export interface Attachment {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  task_id: number;
  uploaded_by: number;
  created_at: string;
}

export interface AttachmentListResponse {
  items: Attachment[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
