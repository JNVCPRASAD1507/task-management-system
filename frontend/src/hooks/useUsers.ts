import { useCallback, useState } from "react";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../api/users.api";

import type { User } from "../types/auth.types";

import type {
  UserCreate,
  UserListResponse,
  UserUpdate,
} from "../types/user.types";

interface UseUserReturn {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;

  fetchUsers: (
    page?: number,
    pageSize?: number,
  ) => Promise<UserListResponse | null>;

  fetchUser: (userId: number) => Promise<User | null>;

  addUser: (data: UserCreate) => Promise<User | null>;

  editUser: (
    userId: number,
    data: UserUpdate,
  ) => Promise<User | null>;

  removeUser: (userId: number) => Promise<boolean>;

  clearSelectedUser: () => void;
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

export const useUser = (): UseUserReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedUser, setSelectedUser] = useState<User | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(
    async (
      requestedPage = 1,
      requestedPageSize = 20,
    ): Promise<UserListResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getUsers({
          page: requestedPage,
          page_size: requestedPageSize,
        });

        setUsers(response.items);
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

  const fetchUser = useCallback(
    async (userId: number): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const user = await getUser(userId);
        setSelectedUser(user);
        return user;
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

  const addUser = useCallback(
    async (data: UserCreate): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const user = await createUser(data);

        setUsers((currentUsers) => [user, ...currentUsers]);
        setTotal((currentTotal) => currentTotal + 1);

        return user;
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

  const editUser = useCallback(
    async (
      userId: number,
      data: UserUpdate,
    ): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedUser = await updateUser(userId, data);

        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === userId ? updatedUser : user,
          ),
        );

        setSelectedUser((currentUser) =>
          currentUser?.id === userId ? updatedUser : currentUser,
        );

        return updatedUser;
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

  const removeUser = useCallback(
    async (userId: number): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await deleteUser(userId);

        setUsers((currentUsers) =>
          currentUsers.filter((user) => user.id !== userId),
        );

        setTotal((currentTotal) => Math.max(0, currentTotal - 1));

        setSelectedUser((currentUser) =>
          currentUser?.id === userId ? null : currentUser,
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

  const clearSelectedUser = useCallback(() => {
    setSelectedUser(null);
  }, []);

  return {
    users,
    total,
    page,
    pageSize,
    totalPages,
    selectedUser,
    isLoading,
    error,
    fetchUsers,
    fetchUser,
    addUser,
    editUser,
    removeUser,
    clearSelectedUser,
  };
};
