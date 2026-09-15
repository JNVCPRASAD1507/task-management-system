
import {
  ArrowBackOutlined,
  CheckCircleOutlined,
  EditOutlined,
  PlayArrowOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import PriorityBadge from "../../components/tasks/PriorityBadge";
import TaskStatusBadge from "../../components/tasks/TaskStatusBadge";
import { updateTaskStatus } from "../../api/tasks.api";
import { useAuth } from "../../hooks/useAuth";
import { useTask } from "../../hooks/useTasks";

export default function TaskDetailsPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const { user } = useAuth();

  const {
    selectedTask,
    isLoading,
    error,
    fetchTask,
  } = useTask();

  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

  const id = Number(taskId);

  useEffect(() => {
    if (Number.isFinite(id)) {
      void fetchTask(id);
    }
  }, [fetchTask, id]);

  /*
   * ---------------------------------------------------------
   * Invalid task ID
   * ---------------------------------------------------------
   */
  if (!Number.isFinite(id)) {
    return (
      <ErrorState
        message="Invalid task ID."
        onRetry={() => navigate("/tasks")}
      />
    );
  }

  /*
   * ---------------------------------------------------------
   * Loading
   * ---------------------------------------------------------
   */
  if (isLoading && !selectedTask) {
    return <Loader />;
  }

  /*
   * ---------------------------------------------------------
   * Error
   * ---------------------------------------------------------
   */
  if (error && !selectedTask) {
    return (
      <ErrorState
        message={error}
        onRetry={() => void fetchTask(id)}
      />
    );
  }

  /*
   * ---------------------------------------------------------
   * Task not found
   * ---------------------------------------------------------
   */
  if (!selectedTask) {
    return (
      <ErrorState
        message="Task not found."
        onRetry={() => navigate("/tasks")}
      />
    );
  }

  /*
   * ---------------------------------------------------------
   * User permissions
   * ---------------------------------------------------------
   */

  const isMember = user?.role === "member";

  const isAssignedToCurrentUser =
    selectedTask.assignee_id === user?.id;

  /*
   * A member can update the task status only when:
   * 1. The logged-in user is a member
   * 2. The task is assigned to that member
   * 3. The task is not already completed
   */
  const canUpdateStatus =
    isMember &&
    isAssignedToCurrentUser &&
    selectedTask.status !== "completed";

  /*
   * ---------------------------------------------------------
   * Status change
   * ---------------------------------------------------------
   */

  const handleStatusChange = async (
    nextStatus: "in_progress" | "completed",
  ) => {
    try {
      setStatusLoading(true);
      setStatusError(null);

      await updateTaskStatus(id, nextStatus);

      /*
       * Fetch the updated task from the backend
       * so the UI always displays the real database state.
       */
      await fetchTask(id);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to update task status.";

      setStatusError(message);
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        maxWidth: 1000,
        mx: "auto",
        width: "100%",
      }}
    >
      {/* ---------------------------------------------------
          Header Actions
      --------------------------------------------------- */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        sx={{
          justifyContent: "space-between",
          gap: 1,
          mb: 2,
        }}
      >
        <Button
          startIcon={<ArrowBackOutlined />}
          onClick={() => navigate("/tasks")}
        >
          Back to tasks
        </Button>

        {!isMember && (
          <Button
            variant="contained"
            startIcon={<EditOutlined />}
            onClick={() => navigate(`/tasks/${id}/edit`)}
          >
            Edit Task
          </Button>
        )}
      </Stack>

      {/* ---------------------------------------------------
          Status Error
      --------------------------------------------------- */}

      {statusError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setStatusError(null)}
        >
          {statusError}
        </Alert>
      )}

      {/* ---------------------------------------------------
          Task Card
      --------------------------------------------------- */}

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Stack spacing={2.5}>
            {/* ------------------------------------------------
                Task Title
            ------------------------------------------------ */}

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                wordBreak: "break-word",
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.5rem",
                },
              }}
            >
              {selectedTask.title}
            </Typography>

            {/* ------------------------------------------------
                Status + Priority
            ------------------------------------------------ */}

            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: "wrap",
              }}
              useFlexGap
            >
              <TaskStatusBadge
                status={selectedTask.status}
              />

              <PriorityBadge
                priority={selectedTask.priority}
              />
            </Stack>

            <Divider />

            {/* ------------------------------------------------
                Description
            ------------------------------------------------ */}

            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                minHeight: 80,
                wordBreak: "break-word",
              }}
            >
              {selectedTask.description ||
                "No description provided."}
            </Typography>

            {/* ------------------------------------------------
                Task Information
            ------------------------------------------------ */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              sx={{
                flexWrap: "wrap",
              }}
              useFlexGap
            >
              <Chip
                label={
                  selectedTask.assignee_id
                    ? `Assignee #${selectedTask.assignee_id}`
                    : "Unassigned"
                }
              />

              <Chip
                label={
                  selectedTask.due_date
                    ? `Due ${selectedTask.due_date}`
                    : "No due date"
                }
              />

              <Chip
                label={`Created by #${selectedTask.created_by}`}
              />
            </Stack>

            {/* ------------------------------------------------
                MEMBER TASK ACTIONS
            ------------------------------------------------ */}

            {isMember && isAssignedToCurrentUser && (
              <>
                <Divider />

                <Stack spacing={1.5}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    Task Actions
                  </Typography>

                  {/* ------------------------------------------
                      TODO → IN PROGRESS
                  ------------------------------------------ */}

                  {canUpdateStatus &&
                    selectedTask.status === "todo" && (
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={
                          <PlayArrowOutlined />
                        }
                        disabled={statusLoading}
                        onClick={() =>
                          void handleStatusChange(
                            "in_progress",
                          )
                        }
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "auto",
                          },
                        }}
                      >
                        {statusLoading
                          ? "Starting..."
                          : "Start Task"}
                      </Button>
                    )}

                  {/* ------------------------------------------
                      IN PROGRESS → COMPLETED
                  ------------------------------------------ */}

                  {canUpdateStatus &&
                    selectedTask.status ===
                      "in_progress" && (
                      <Button
                        variant="contained"
                        color="success"
                        size="large"
                        startIcon={
                          <CheckCircleOutlined />
                        }
                        disabled={statusLoading}
                        onClick={() =>
                          void handleStatusChange(
                            "completed",
                          )
                        }
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "auto",
                          },
                        }}
                      >
                        {statusLoading
                          ? "Completing..."
                          : "Mark as Completed"}
                      </Button>
                    )}

                  {/* ------------------------------------------
                      COMPLETED
                  ------------------------------------------ */}

                  {selectedTask.status ===
                    "completed" && (
                    <Alert
                      severity="success"
                      icon={
                        <CheckCircleOutlined />
                      }
                    >
                      You have completed this task.
                    </Alert>
                  )}
                </Stack>
              </>
            )}

            {/* ------------------------------------------------
                MEMBER VIEWING SOMEONE ELSE'S TASK
            ------------------------------------------------ */}

            {isMember &&
              !isAssignedToCurrentUser && (
                <Alert severity="info">
                  This task is not assigned to you. You
                  can view it, but you cannot update its
                  status.
                </Alert>
              )}

            {/* ------------------------------------------------
                NON-MEMBER COMPLETED TASK
            ------------------------------------------------ */}

            {!isMember &&
              selectedTask.status ===
                "completed" && (
                <>
                  <Divider />

                  <Alert
                    severity="success"
                    icon={
                      <CheckCircleOutlined />
                    }
                  >
                    This task has been completed.
                  </Alert>
                </>
              )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

