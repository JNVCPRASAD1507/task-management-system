

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  login as loginApi,
  register as registerApi,
} from "../api/auth.api";

import type {
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/auth.types";

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem("access_token"),
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setAccessToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setAccessToken(null);
      setUser(null);
      return;
    }

    try {
      const currentUser = await getCurrentUser();

      setAccessToken(token);
      setUser(currentUser);

      localStorage.setItem(
        "user",
        JSON.stringify(currentUser),
      );
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshUser();
      } finally {
        setIsLoading(false);
      }
    };

    void initializeAuth();
  }, [refreshUser]);

  const login = useCallback(
    async (data: LoginRequest) => {
      const response = await loginApi(data);

      localStorage.setItem(
        "access_token",
        response.access_token,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user),
      );

      setAccessToken(response.access_token);
      setUser(response.user);
    },
    [],
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      const response = await registerApi(data);

      localStorage.setItem(
        "access_token",
        response.access_token,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user),
      );

      setAccessToken(response.access_token);
      setUser(response.user);
    },
    [],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken && user),
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [
      user,
      accessToken,
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider",
    );
  }

  return context;
};

