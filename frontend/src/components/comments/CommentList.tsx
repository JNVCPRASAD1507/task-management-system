import { Stack, Typography } from "@mui/material";

import type { Comment } from "../../types/comment.types";

import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
  currentUserId?: number;
  onEdit?: (comment: Comment) => void;
  onDelete?: (comment: Comment) => void;
}

const CommentList = ({
  comments,
  currentUserId,
  onEdit,
  onDelete,
}: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <Typography
        color="text.secondary"
       sx={{ textAlign:"center", py:3 }}
        
      >
        No comments yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
};

export default CommentList;