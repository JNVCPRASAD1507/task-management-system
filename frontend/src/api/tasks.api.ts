

import api from "./axios";
import type {
  Task,
  TaskCreate,
  TaskFilters,
  TaskListResponse,
  TaskUpdate,
} from "../types/task.types";

export const getTasks = async (
  params?: TaskFilters,
): Promise<TaskListResponse> => {
  const { search: _search, ...apiParams } = params ?? {};

  const response = await api.get<TaskListResponse>("/tasks", {
    params: apiParams,
  });

  return response.data;
};

export const getTask = async (
  taskId: number,
): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${taskId}`);

  return response.data;
};

export const createTask = async (
  data: TaskCreate,
): Promise<Task> => {
  const response = await api.post<Task>("/tasks", data);

  return response.data;
};

export const updateTask = async (
  taskId: number,
  data: TaskUpdate,
): Promise<Task> => {
  const response = await api.put<Task>(
    `/tasks/${taskId}`,
    data,
  );

  return response.data;
};

export const deleteTask = async (
  taskId: number,
): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};

export const updateTaskStatus = async (
  taskId: number,
  status: Task["status"],
): Promise<Task> => {
  const response = await api.patch<Task>(
    `/tasks/${taskId}/status`,
    {
      status,
    },
  );

  return response.data;
};

