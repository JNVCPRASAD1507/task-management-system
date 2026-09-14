import { Box, Typography } from "@mui/material";

export default function EditUserPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Edit User
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Edit user page
      </Typography>
    </Box>
  );
}