import { DoneAllOutlined, RefreshOutlined } from "@mui/icons-material";
import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import NotificationList from "../../components/notifications/NotificationList";
import { useNotification } from "../../hooks/useNotifications";
import type { Notification } from "../../types/notification.types";

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    page,
    totalPages,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotification();
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState<Notification | null>(null);

  const load = () => void fetchNotifications(page, 20, unreadOnly);

  useEffect(() => {
    void fetchNotifications(1, 20, unreadOnly);
  }, [fetchNotifications, unreadOnly]);

  const handleDelete = async () => {
    if (!deleteNotification) return;
    const success = await removeNotification(deleteNotification.id);
    if (success) setDeleteNotification(null);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, gap: 2, mb: 3 }}>
        <Box>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap" }} useFlexGap>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>Notifications</Typography>
            <Chip label={`${unreadCount} unread`} color={unreadCount ? "primary" : "default"} size="small" />
          </Stack>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>Stay up to date with task activity.</Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button variant={unreadOnly ? "contained" : "outlined"} onClick={() => setUnreadOnly((value) => !value)}>
            Unread only
          </Button>
          <Button variant="outlined" startIcon={<DoneAllOutlined />} onClick={() => void markAllAsRead()} disabled={!unreadCount || isLoading}>
            Mark all read
          </Button>
          <Button variant="outlined" startIcon={<RefreshOutlined />} onClick={load} disabled={isLoading}>Refresh</Button>
        </Stack>
      </Stack>

      {error && !notifications.length ? <ErrorState message={error} onRetry={load} /> : null}
      {error && notifications.length ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
      {isLoading && !notifications.length ? <Loader /> : null}
      {!isLoading || notifications.length > 0 ? (
        <NotificationList notifications={notifications} onRead={(item) => void markAsRead(item.id)} onDelete={setDeleteNotification} />
      ) : null}
      <Pagination page={page} totalPages={totalPages} onChange={(nextPage) => void fetchNotifications(nextPage, 20, unreadOnly)} disabled={isLoading} />

      <ConfirmDialog
        open={Boolean(deleteNotification)}
        title="Delete notification?"
        message="This notification will be permanently removed."
        confirmText="Delete"
        loading={isLoading}
        onCancel={() => setDeleteNotification(null)}
        onConfirm={() => void handleDelete()}
      />
    </Box>
  );
}
