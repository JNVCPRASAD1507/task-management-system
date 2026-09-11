
import api from "./axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/auth.types";

export const login = async (
  data: LoginRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
};

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");

  return response.data;
};
