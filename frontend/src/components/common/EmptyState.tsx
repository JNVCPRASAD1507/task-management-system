
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

const EmptyState = ({
  title = "No data found",
  message = "There is nothing to display here.",
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 220,
        px: 3,
        py: 5,
        textAlign: "center",
      }}
    >
      <InboxOutlinedIcon
        sx={{
          fontSize: { xs: 48, sm: 56 },
          color: "text.secondary",
          mb: 2,
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          maxWidth: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;
