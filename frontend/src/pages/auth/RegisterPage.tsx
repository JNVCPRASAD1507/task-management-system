import { Box, Typography } from "@mui/material";

export default function RegisterPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Register
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Register page
      </Typography>
    </Box>
  );
}