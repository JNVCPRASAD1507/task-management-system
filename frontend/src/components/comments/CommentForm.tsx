import {
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface CommentFormProps {
  initialValue?: string;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (
    content: string
  ) => void | Promise<void>;
}

const CommentForm = ({
  initialValue = "",
  loading = false,
  submitLabel = "Add Comment",
  onSubmit,
}: CommentFormProps) => {
  const [content, setContent] =
    useState(initialValue);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value = content.trim();

    if (!value) {
      return;
    }

    await onSubmit(value);

    if (!initialValue) {
      setContent("");
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={1.5}
    >
      <TextField
        label="Comment"
        value={content}
        onChange={(event) =>
          setContent(event.target.value)
        }
        multiline
        minRows={3}
        fullWidth
        inputProps={{
          maxLength: 5000,
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={
          loading || !content.trim()
        }
        sx={{
          alignSelf: {
            xs: "stretch",
            sm: "flex-start",
          },
        }}
      >
        {loading ? "Saving..." : submitLabel}
      </Button>
    </Stack>
  );
};

export default CommentForm;