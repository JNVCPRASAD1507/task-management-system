
import { useCallback, useState } from "react";

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../api/tasks.api";

import type {
  Task,
  TaskCreate,
  TaskFilters,
  TaskListResponse,
  TaskUpdate,
} from "../types/task.types";

interface UseTaskReturn {
  tasks: Task[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;

  fetchTasks: (filters?: TaskFilters) => Promise<TaskListResponse | null>;
  fetchTask: (taskId: number) => Promise<Task | null>;
  addTask: (data: TaskCreate) => Promise<Task | null>;
  editTask: (
    taskId: number,
    data: TaskUpdate,
  ) => Promise<Task | null>;
  removeTask: (taskId: number) => Promise<boolean>;
  clearSelectedTask: () => void;
}

const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            detail?: string;
            message?: string;
          };
        };
      }
    ).response;

    return (
      response?.data?.detail ??
      response?.data?.message ??
      "An unexpected error occurred."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};

export const useTask = (): UseTaskReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(
    async (
      filters?: TaskFilters,
    ): Promise<TaskListResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getTasks(filters);

        setTasks(response.items);
        setTotal(response.total);
        setPage(response.page);
        setPageSize(response.page_size);
        setTotalPages(response.total_pages);

        return response;
      } catch (requestError) {
        const message = getErrorMessage(requestError);
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchTask = useCallback(
    async (taskId: number): Promise<Task | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const task = await getTask(taskId);
        setSelectedTask(task);
        return task;
      } catch (requestError) {
        const message = getErrorMessage(requestError);
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const addTask = useCallback(
    async (data: TaskCreate): Promise<Task | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const task = await createTask(data);
        setTasks((currentTasks) => [task, ...currentTasks]);
        setTotal((currentTotal) => currentTotal + 1);
        return task;
      } catch (requestError) {
        const message = getErrorMessage(requestError);
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const editTask = useCallback(
    async (
      taskId: number,
      data: TaskUpdate,
    ): Promise<Task | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedTask = await updateTask(taskId, data);

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === taskId ? updatedTask : task,
          ),
        );

        setSelectedTask((currentTask) =>
          currentTask?.id === taskId ? updatedTask : currentTask,
        );

        return updatedTask;
      } catch (requestError) {
        const message = getErrorMessage(requestError);
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const removeTask = useCallback(
    async (taskId: number): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await deleteTask(taskId);

        setTasks((currentTasks) =>
          currentTasks.filter((task) => task.id !== taskId),
        );

        setTotal((currentTotal) => Math.max(0, currentTotal - 1));

        setSelectedTask((currentTask) =>
          currentTask?.id === taskId ? null : currentTask,
        );

        return true;
      } catch (requestError) {
        const message = getErrorMessage(requestError);
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const clearSelectedTask = useCallback(() => {
    setSelectedTask(null);
  }, []);

  return {
    tasks,
    total,
    page,
    pageSize,
    totalPages,
    selectedTask,
    isLoading,
    error,
    fetchTasks,
    fetchTask,
    addTask,
    editTask,
    removeTask,
    clearSelectedTask,
  };
};

