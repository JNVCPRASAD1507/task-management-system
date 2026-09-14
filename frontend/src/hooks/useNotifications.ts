
import { useCallback, useState } from "react";

import {
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../api/notifications.api";

import type {
  Notification,
  NotificationListResponse,
} from "../types/notification.types";

interface UseNotificationReturn {
  notifications: Notification[];
  unreadCount: number;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  fetchNotifications: (
    page?: number,
    pageSize?: number,
    unreadOnly?: boolean,
  ) => Promise<NotificationListResponse | null>;

  markAsRead: (
    notificationId: number,
  ) => Promise<Notification | null>;

  markAllAsRead: () => Promise<boolean>;

  removeNotification: (
    notificationId: number,
  ) => Promise<boolean>;
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

export const useNotification = (): UseNotificationReturn => {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(
    async (
      requestedPage = 1,
      requestedPageSize = 20,
      unreadOnly = false,
    ): Promise<NotificationListResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getNotifications({
          page: requestedPage,
          page_size: requestedPageSize,
          unread_only: unreadOnly,
        });

        setNotifications(response.items);
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

  const markAsRead = useCallback(
    async (
      notificationId: number,
    ): Promise<Notification | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedNotification =
          await markNotificationAsRead(notificationId);

        setNotifications((currentNotifications) =>
          currentNotifications.map((notification) =>
            notification.id === notificationId
              ? updatedNotification
              : notification,
          ),
        );

        return updatedNotification;
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

  const markAllAsRead = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await markAllNotificationsAsRead();

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
          ...notification,
          is_read: true,
        })),
      );

      return true;
    } catch (requestError) {
      const message = getErrorMessage(requestError);
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeNotification = useCallback(
    async (notificationId: number): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await deleteNotification(notificationId);

        setNotifications((currentNotifications) =>
          currentNotifications.filter(
            (notification) =>
              notification.id !== notificationId,
          ),
        );

        setTotal((currentTotal) =>
          Math.max(0, currentTotal - 1),
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

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  return {
    notifications,
    unreadCount,
    total,
    page,
    pageSize,
    totalPages,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };
};

