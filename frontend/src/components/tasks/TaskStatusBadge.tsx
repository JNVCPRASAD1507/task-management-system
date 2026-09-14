import { Chip } from "@mui/material";

import type { TaskStatus } from "../../types/task.types";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<
  TaskStatus,
  {
    label: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "warning"
      | "info";
  }
> = {
  todo: {
    label: "To Do",
    color: "default",
  },
  in_progress: {
    label: "In Progress",
    color: "info",
  },
  completed: {
    label: "Completed",
    color: "success",
  },
  cancelled: {
    label: "Cancelled",
    color: "error",
  },
};

const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default TaskStatusBadge;