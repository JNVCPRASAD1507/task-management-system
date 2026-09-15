import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import TaskForm from "../../components/tasks/TaskForm";
import { useTask } from "../../hooks/useTasks";
import type { TaskUpdate } from "../../types/task.types";

export default function EditTaskPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { selectedTask, isLoading, error, fetchTask, editTask } = useTask();
  const id = Number(taskId);

  useEffect(() => {
    if (Number.isFinite(id)) void fetchTask(id);
  }, [fetchTask, id]);

  if (!Number.isFinite(id))
    return (
      <ErrorState
        message="Invalid task ID."
        onRetry={() => navigate("/tasks")}
      />
    );
  if (isLoading && !selectedTask) return <Loader />;
  if (error && !selectedTask)
    return <ErrorState message={error} onRetry={() => void fetchTask(id)} />;
  if (!selectedTask)
    return (
      <ErrorState
        message="Task not found."
        onRetry={() => navigate("/tasks")}
      />
    );

  const handleSubmit = async (values: TaskUpdate) => {
    const task = await editTask(id, values);
    if (task) navigate(`/tasks/${id}`);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: 900,
        mx: "auto",
        width: "100%",
      }}
    >
      <Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate(`/tasks/${id}`)}
        sx={{ mb: 2 }}
      >
        Back to task
      </Button>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Edit Task
          </Typography>
          <Typography color="text.secondary">
            Update task details and status.
          </Typography>
        </Stack>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TaskForm
          initialValues={selectedTask}
          editMode
          submitLabel="Update Task"
          loading={isLoading}
          onSubmit={(values) => void handleSubmit(values as TaskUpdate)}
        />
      </Paper>
    </Box>
  );
}
