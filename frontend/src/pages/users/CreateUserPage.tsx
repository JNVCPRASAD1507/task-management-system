import { Box, Typography } from "@mui/material";

export default function CreateUserPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Create User
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Create user page
      </Typography>
    </Box>
  );
}