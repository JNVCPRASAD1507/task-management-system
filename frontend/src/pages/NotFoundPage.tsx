import { Box, Button, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box sx={{ textAlign: "center", maxWidth: 500 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: "4rem",
              sm: "6rem",
            },
          }}
        >
          404
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Page Not Found
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          The page you're looking for doesn't exist.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
}
