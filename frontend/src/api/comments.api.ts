
import api from "./axios";
import type {
  Comment,
  CommentCreate,
  CommentListResponse,
  CommentUpdate,
} from "../types/comment.types";

export interface CommentListParams {
  page?: number;
  page_size?: number;
}

export const getTaskComments = async (
  taskId: number,
  params?: CommentListParams,
): Promise<CommentListResponse> => {
  const response = await api.get<CommentListResponse>(
    `/comments/task/${taskId}`,
    {
      params,
    },
  );

  return response.data;
};

export const getComment = async (
  commentId: number,
): Promise<Comment> => {
  const response = await api.get<Comment>(
    `/comments/${commentId}`,
  );

  return response.data;
};

export const createComment = async (
  taskId: number,
  data: CommentCreate,
): Promise<Comment> => {
  const response = await api.post<Comment>(
    `/comments/task/${taskId}`,
    data,
  );

  return response.data;
};

export const updateComment = async (
  commentId: number,
  data: CommentUpdate,
): Promise<Comment> => {
  const response = await api.put<Comment>(
    `/comments/${commentId}`,
    data,
  );

  return response.data;
};

export const deleteComment = async (
  commentId: number,
): Promise<void> => {
  await api.delete(`/comments/${commentId}`);
};
