
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
// import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, Typography } from "@mui/material";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) => {
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
      <ErrorOutlineIcon
        sx={{
          fontSize: { xs: 48, sm: 56 },
          color: "error.main",
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
        Unable to load data
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          maxWidth: 500,
          mb: 2,
        }}
      >
        {message}
      </Typography>

      {onRetry && (
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </Box>
  );
};

export default ErrorState;
