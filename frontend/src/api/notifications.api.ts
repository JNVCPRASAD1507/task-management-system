
import api from "./axios";
import type {
  Notification,
  NotificationListResponse,
} from "../types/notification.types";

export interface NotificationListParams {
  page?: number;
  page_size?: number;
  unread_only?: boolean;
}

export const getNotifications = async (
  params?: NotificationListParams,
): Promise<NotificationListResponse> => {
  const response = await api.get<NotificationListResponse>(
    "/notifications",
    {
      params,
    },
  );

  return response.data;
};

export const getNotification = async (
  notificationId: number,
): Promise<Notification> => {
  const response = await api.get<Notification>(
    `/notifications/${notificationId}`,
  );

  return response.data;
};

export const markNotificationAsRead = async (
  notificationId: number,
): Promise<Notification> => {
  const response = await api.patch<Notification>(
    `/notifications/${notificationId}/read`,
  );

  return response.data;
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await api.patch("/notifications/read-all");
};

export const deleteNotification = async (
  notificationId: number,
): Promise<void> => {
  await api.delete(`/notifications/${notificationId}`);
};
