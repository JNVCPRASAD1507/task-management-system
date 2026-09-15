import { ArrowBackOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import PriorityBadge from "../../components/tasks/PriorityBadge";
import TaskStatusBadge from "../../components/tasks/TaskStatusBadge";
import { useTask } from "../../hooks/useTasks";

export default function TaskDetailsPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { selectedTask, isLoading, error, fetchTask } = useTask();
  const id = Number(taskId);

  useEffect(() => {
    if (Number.isFinite(id)) void fetchTask(id);
  }, [fetchTask, id]);

  if (!Number.isFinite(id)) return <ErrorState message="Invalid task ID." onRetry={() => navigate("/tasks")} />;
  if (isLoading && !selectedTask) return <Loader />;
  if (error && !selectedTask) return <ErrorState message={error} onRetry={() => void fetchTask(id)} />;
  if (!selectedTask) return <ErrorState message="Task not found." onRetry={() => navigate("/tasks")} />;

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1000, mx: "auto", width: "100%" }}>
      <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", gap: 1, mb: 2 }}>
        <Button startIcon={<ArrowBackOutlined />} onClick={() => navigate("/tasks")}>Back to tasks</Button>
        <Button variant="contained" startIcon={<EditOutlined />} onClick={() => navigate(`/tasks/${id}/edit`)}>Edit Task</Button>
      </Stack>
      <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Stack spacing={2.5}>
            <Typography variant="h4" sx={{ fontWeight: 800, wordBreak: "break-word" }}>{selectedTask.title}</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
              <TaskStatusBadge status={selectedTask.status} />
              <PriorityBadge priority={selectedTask.priority} />
            </Stack>
            <Divider />
            <Typography sx={{ whiteSpace: "pre-wrap", minHeight: 80 }}>{selectedTask.description || "No description provided."}</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ flexWrap: "wrap" }} useFlexGap>
              <Chip label={selectedTask.assignee_id ? `Assignee #${selectedTask.assignee_id}` : "Unassigned"} />
              <Chip label={selectedTask.due_date ? `Due ${selectedTask.due_date}` : "No due date"} />
              <Chip label={`Created by #${selectedTask.created_by}`} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
