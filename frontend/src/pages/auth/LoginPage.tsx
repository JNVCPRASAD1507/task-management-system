import { Box, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Login
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Login page
      </Typography>
    </Box>
  );
}