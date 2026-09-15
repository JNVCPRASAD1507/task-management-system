import {
  AssignmentOutlined,
  CheckCircleOutlined,
  GroupOutlined,
  PendingActionsOutlined,
  RefreshOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  // Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../../api/dashboard.api";
import DashboardStats from "../../components/dashboard/DashboardStats";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import PriorityBadge from "../../components/tasks/PriorityBadge";
import TaskStatusBadge from "../../components/tasks/TaskStatusBadge";
import type { DashboardResponse } from "../../types/dashboard.types";

const formatDate = (value: string | null) => {
  if (!value) return "No due date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getDashboard());
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (loading && !data) return <Loader />;
  if (error && !data) return <ErrorState message={error} onRetry={loadDashboard} />;
  if (!data) return null;

  const stats = data.stats;
  const completionRate = stats.total_tasks
    ? Math.round((stats.completed_tasks / stats.total_tasks) * 100)
    : 0;

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, gap: 2, mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Dashboard
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Overview of your tasks and team activity.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshOutlined />}
          onClick={() => void loadDashboard()}
          disabled={loading}
          sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}
        >
          Refresh
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <DashboardStats stats={stats} />

      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card elevation={0} sx={{ height: "100%", border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <AssignmentOutlined color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Task Progress</Typography>
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{completionRate}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={completionRate}
                sx={{ mt: 2, height: 9, borderRadius: 10 }}
              />
              <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography color="text.secondary">To Do</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{stats.todo_tasks}</Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography color="text.secondary">In Progress</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{stats.in_progress_tasks}</Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Completed</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{stats.completed_tasks}</Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Overdue</Typography>
                  <Typography sx={{ fontWeight: 600, color: stats.overdue_tasks ? "error.main" : "text.primary" }}>
                    {stats.overdue_tasks}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card elevation={0} sx={{ height: "100%", border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Tasks</Typography>
                <Button size="small" onClick={() => navigate("/tasks")}>View all</Button>
              </Stack>
              <Divider />
              {data.recent_tasks.length === 0 ? (
                <Stack sx={{ alignItems: "center", py: 5 }} spacing={1}>
                  <PendingActionsOutlined color="disabled" fontSize="large" />
                  <Typography color="text.secondary">No recent tasks.</Typography>
                </Stack>
              ) : (
                <Stack divider={<Divider />}>
                  {data.recent_tasks.map((task) => (
                    <Box
                      key={task.id}
                      onClick={() => navigate(`/tasks/${task.id}`)}
                      sx={{ py: 1.75, cursor: "pointer", "&:hover": { bgcolor: "action.hover" }, px: 1, mx: -1, borderRadius: 1 }}
                    >
                      <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", gap: 1 }}>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 650, wordBreak: "break-word" }}>{task.title}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {task.assignee_name ?? "Unassigned"} • Due {formatDate(task.due_date)}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
                          <TaskStatusBadge status={task.status} />
                          <PriorityBadge priority={task.priority} />
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <CheckCircleOutlined color="success" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Completed</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{stats.completed_tasks}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <WarningAmberOutlined color="warning" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Overdue</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{stats.overdue_tasks}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <GroupOutlined color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Active Users</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{stats.active_users}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
