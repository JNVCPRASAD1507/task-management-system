import { Box, Typography } from "@mui/material";

export default function TaskListPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Tasks
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Task list page
      </Typography>
    </Box>
  );
}