import { Box, Typography } from "@mui/material";

export default function ProfilePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Profile
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Profile page
      </Typography>
    </Box>
  );
}