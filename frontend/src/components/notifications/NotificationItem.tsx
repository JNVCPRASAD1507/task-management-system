import {
  DeleteOutlined,
  MarkEmailReadOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import type { Notification } from "../../types/notification.types";

interface NotificationItemProps {
  notification: Notification;
  onRead?: (
    notification: Notification
  ) => void;
  onDelete?: (
    notification: Notification
  ) => void;
}

const NotificationItem = ({
  notification,
  onRead,
  onDelete,
}: NotificationItemProps) => {
  return (
    <ListItem
      divider
      sx={{
        bgcolor: notification.is_read
          ? "transparent"
          : "action.selected",
        alignItems: "flex-start",
      }}
      secondaryAction={
        <>
          {!notification.is_read && onRead && (
            <Tooltip title="Mark as read">
              <IconButton
                size="small"
                onClick={() =>
                  onRead(notification)
                }
              >
                <MarkEmailReadOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {onDelete && (
            <Tooltip title="Delete">
              <IconButton
                size="small"
                color="error"
                onClick={() =>
                  onDelete(notification)
                }
              >
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </>
      }
    >
      <ListItemIcon>
        <NotificationsOutlined
          color={
            notification.is_read
              ? "disabled"
              : "primary"
          }
        />
      </ListItemIcon>

      <ListItemText
        primary={notification.title}
        secondary={
          <>
            {notification.message}
            <br />
            <small>
              {notification.created_at}
            </small>
          </>
        }
        slotProps={{
          primary: {
            sx: {
              fontWeight: notification.is_read
                ? 500
                : 700,
            },
          },
        }}
      />
    </ListItem>
  );
};

export default NotificationItem;