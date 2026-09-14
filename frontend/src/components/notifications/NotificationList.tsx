import {
  List,
  Paper,
  Typography,
} from "@mui/material";

import type { Notification } from "../../types/notification.types";

import NotificationItem from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
  onRead?: (
    notification: Notification
  ) => void;
  onDelete?: (
    notification: Notification
  ) => void;
}

const NotificationList = ({
  notifications,
  onRead,
  onDelete,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography color="text.secondary">
          No notifications.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <List disablePadding>
        {notifications.map(
          (notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={onRead}
              onDelete={onDelete}
            />
          )
        )}
      </List>
    </Paper>
  );
};

export default NotificationList;