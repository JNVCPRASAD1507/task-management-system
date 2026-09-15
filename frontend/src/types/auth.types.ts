
export type UserRole = "admin" | "manager" | "member";

export type UserStatus = "active" | "inactive";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  is_active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}


