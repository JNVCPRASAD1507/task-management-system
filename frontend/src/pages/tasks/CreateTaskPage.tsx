import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TaskForm from "../../components/tasks/TaskForm";
import { useTask } from "../../hooks/useTasks";
import type { TaskCreate } from "../../types/task.types";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const { addTask, isLoading, error } = useTask();

  const handleSubmit = async (values: TaskCreate) => {
    const task = await addTask(values);
    if (task) navigate(`/tasks/${task.id}`);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 900, mx: "auto", width: "100%" }}>
      <Button startIcon={<ArrowBackOutlined />} onClick={() => navigate("/tasks")} sx={{ mb: 2 }}>Back to tasks</Button>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Create Task</Typography>
          <Typography color="text.secondary">Add a new task to your workspace.</Typography>
        </Stack>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <TaskForm submitLabel="Create Task" loading={isLoading} onSubmit={(values) => void handleSubmit(values as TaskCreate)} />
      </Paper>
    </Box>
  );
}
