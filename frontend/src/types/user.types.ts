
import type { User, UserRole, UserStatus } from "./auth.types";

export interface UserCreate {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserUpdate {
  full_name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  is_active?: boolean;
}

export interface UserListResponse {
  items: User[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
