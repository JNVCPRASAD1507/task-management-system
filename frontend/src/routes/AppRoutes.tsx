import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";
import AppLayout from "../components/layout/AppLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/auth/ProfilePage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import TaskListPage from "../pages/tasks/TaskListPage";
import CreateTaskPage from "../pages/tasks/CreateTaskPage";
import EditTaskPage from "../pages/tasks/EditTaskPage";
import TaskDetailsPage from "../pages/tasks/TaskDetailsPage";

import UserListPage from "../pages/users/UserListPage";
import CreateUserPage from "../pages/users/CreateUserPage";
import EditUserPage from "../pages/users/EditUserPage";

import NotificationsPage from "../pages/notifications/NotificationsPage";

import ForbiddenPage from "../pages/ForbiddenPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* ================================================== */}
        {/* Public Routes */}
        {/* ================================================== */}

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* ================================================== */}
        {/* Protected Application Routes */}
        {/* ================================================== */}

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* Dashboard */}

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            {/* ================================================== */}
            {/* Profile */}
            {/* ================================================== */}

            <Route
              path="/profile"
              element={<ProfilePage />}
            />

            <Route
              path="/change-password"
              element={<ChangePasswordPage />}
            />

            {/* ================================================== */}
            {/* Tasks */}
            {/* ================================================== */}

            <Route
              path="/tasks"
              element={<TaskListPage />}
            />

            {/* Admin + Manager */}
            <Route element={<RoleRoute allowedRoles={["admin", "manager"]} />}>
              <Route
                path="/tasks/create"
                element={<CreateTaskPage />}
              />
            </Route>

            {/* Authenticated users */}
            <Route
              path="/tasks/:taskId"
              element={<TaskDetailsPage />}
            />

            <Route
              path="/tasks/:taskId/edit"
              element={<EditTaskPage />}
            />

            {/* ================================================== */}
            {/* Notifications */}
            {/* ================================================== */}

            <Route
              path="/notifications"
              element={<NotificationsPage />}
            />

            {/* ================================================== */}
            {/* Admin Routes */}
            {/* ================================================== */}

            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route
                path="/users"
                element={<UserListPage />}
              />

              <Route
                path="/users/create"
                element={<CreateUserPage />}
              />

              <Route
                path="/users/:userId/edit"
                element={<EditUserPage />}
              />
            </Route>
          </Route>
        </Route>

        {/* ================================================== */}
        {/* Error Routes */}
        {/* ================================================== */}

        <Route
          path="/forbidden"
          element={<ForbiddenPage />}
        />

        <Route
          path="/404"
          element={<NotFoundPage />}
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
