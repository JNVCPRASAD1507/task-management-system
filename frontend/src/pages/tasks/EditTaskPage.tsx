import { Box, Typography } from "@mui/material";

export default function EditTaskPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Edit Task
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Edit task page
      </Typography>
    </Box>
  );
}