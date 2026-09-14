
import api from "./axios";
import type {
  Attachment,
  AttachmentListResponse,
} from "../types/attachment.types";

export interface AttachmentListParams {
  page?: number;
  page_size?: number;
}

export const getTaskAttachments = async (
  taskId: number,
  params?: AttachmentListParams,
): Promise<AttachmentListResponse> => {
  const response = await api.get<AttachmentListResponse>(
    `/attachments/task/${taskId}`,
    {
      params,
    },
  );

  return response.data;
};

export const uploadAttachment = async (
  taskId: number,
  file: File,
): Promise<Attachment> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<Attachment>(
    `/attachments/task/${taskId}`,
    formData,
  );

  return response.data;
};

export const deleteAttachment = async (
  attachmentId: number,
): Promise<void> => {
  await api.delete(`/attachments/${attachmentId}`);
};
