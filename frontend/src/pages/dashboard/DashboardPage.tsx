import { Box, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Dashboard page
      </Typography>
    </Box>
  );
}