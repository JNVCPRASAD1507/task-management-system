import { Box, Typography } from "@mui/material";

export default function CreateTaskPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Create Task
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Create task page
      </Typography>
    </Box>
  );
}