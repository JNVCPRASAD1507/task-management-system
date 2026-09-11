
import api from "./axios";
import type { User } from "../types/auth.types";
import type {
  UserCreate,
  UserListResponse,
  UserUpdate,
} from "../types/user.types";

export interface UserListParams {
  page?: number;
  page_size?: number;
}

export const getUsers = async (
  params?: UserListParams,
): Promise<UserListResponse> => {
  const response = await api.get<UserListResponse>("/users", {
    params,
  });

  return response.data;
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);

  return response.data;
};

export const createUser = async (
  data: UserCreate,
): Promise<User> => {
  const response = await api.post<User>("/users", data);

  return response.data;
};

export const updateUser = async (
  userId: number,
  data: UserUpdate,
): Promise<User> => {
  const response = await api.put<User>(`/users/${userId}`, data);

  return response.data;
};

export const deleteUser = async (
  userId: number,
): Promise<void> => {
  await api.delete(`/users/${userId}`);
};
