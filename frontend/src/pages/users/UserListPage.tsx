import { Box, Typography } from "@mui/material";

export default function UserListPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Users
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        User list page
      </Typography>
    </Box>
  );
}