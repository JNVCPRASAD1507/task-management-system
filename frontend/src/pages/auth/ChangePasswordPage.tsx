import { Box, Typography } from "@mui/material";

export default function ChangePasswordPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Change Password
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Change password page
      </Typography>
    </Box>
  );
}