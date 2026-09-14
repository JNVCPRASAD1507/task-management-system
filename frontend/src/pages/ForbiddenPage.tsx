import { Box, Button, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
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
            fontSize: {
              xs: "4rem",
              sm: "6rem",
            },
            fontWeight: 800
          }}
        >
          403
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Access Forbidden
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          You don't have permission to access this page.
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