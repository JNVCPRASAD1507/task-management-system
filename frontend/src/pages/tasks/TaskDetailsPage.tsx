import { Box, Typography } from "@mui/material";

export default function TaskDetailsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Task Details
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Task details page
      </Typography>
    </Box>
  );
}