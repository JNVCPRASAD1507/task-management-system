import {
  Button,
  Stack,
  Typography,
} from "@mui/material";
import {
  AttachFileOutlined,
} from "@mui/icons-material";
import { useState } from "react";

interface AttachmentUploadProps {
  loading?: boolean;
  onUpload: (
    file: File
  ) => void | Promise<void>;
}

const AttachmentUpload = ({
  loading = false,
  onUpload,
}: AttachmentUploadProps) => {
  const [file, setFile] =
    useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) {
      return;
    }

    await onUpload(file);
    setFile(null);
  };

  return (
    <Stack spacing={2}>
      <Button
        component="label"
        variant="outlined"
        startIcon={<AttachFileOutlined />}
        sx={{
          alignSelf: {
            xs: "stretch",
            sm: "flex-start",
          },
        }}
      >
        Select File

        <input
          type="file"
          hidden
          onChange={(event) => {
            const selected =
              event.target.files?.[0];

            setFile(selected ?? null);
          }}
        />
      </Button>

      {file && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            wordBreak: "break-word",
          }}
        >
          Selected: {file.name}
        </Typography>
      )}

      <Button
        variant="contained"
        disabled={!file || loading}
        onClick={handleSubmit}
        sx={{
          alignSelf: {
            xs: "stretch",
            sm: "flex-start",
          },
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </Stack>
  );
};

export default AttachmentUpload;