import {
  DeleteOutline,
  DownloadOutlined,
  InsertDriveFileOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import type { Attachment } from "../../types/attachment.types";

interface AttachmentListProps {
  attachments: Attachment[];
  onDelete?: (
    attachment: Attachment
  ) => void;
}

const AttachmentList = ({
  attachments,
  onDelete,
}: AttachmentListProps) => {
  if (attachments.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 3,
        }}
      >
        <Typography color="text.secondary">
          No attachments.
        </Typography>
      </Paper>
    );
  }

  return (
    <List disablePadding>
      {attachments.map((attachment) => (
        <ListItem
          key={attachment.id}
          divider
          secondaryAction={
            <Stack direction="row">
              {attachment.file_path && (
                <Tooltip title="Download">
                  <IconButton
                    component="a"
                    href={attachment.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                  >
                    <DownloadOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {onDelete && (
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      onDelete(attachment)
                    }
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          }
        >
          <ListItemIcon>
            <InsertDriveFileOutlined />
          </ListItemIcon>

          <ListItemText
            primary={attachment.file_name}
            secondary={
              attachment.file_size
                ? `${Math.round(
                    attachment.file_size / 1024
                  )} KB`
                : attachment.file_type
            }
            slotProps={{
              primary: {
                sx: {
                  fontWeight: 600,
                  wordBreak: "break-word",
                },
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AttachmentList;