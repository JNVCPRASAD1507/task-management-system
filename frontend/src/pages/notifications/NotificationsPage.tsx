import { Box, Typography } from "@mui/material";

export default function NotificationsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Notifications
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Notifications page
      </Typography>
    </Box>
  );
}