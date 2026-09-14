import {
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import type { Comment } from "../../types/comment.types";

interface CommentItemProps {
  comment: Comment;
  currentUserId?: number;
  onEdit?: (comment: Comment) => void;
  onDelete?: (comment: Comment) => void;
}

const CommentItem = ({
  comment,
  currentUserId,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const canModify =
    currentUserId === comment.user_id;

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack>
            <Typography fontWeight={700}>
              {comment.user?.full_name ??
                `User #${comment.user_id}`}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {comment.created_at}
            </Typography>
          </Stack>

          {canModify && (
            <Stack direction="row">
              {onEdit && (
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={() =>
                      onEdit(comment)
                    }
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {onDelete && (
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      onDelete(comment)
                    }
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          )}
        </Stack>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {comment.content}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default CommentItem;