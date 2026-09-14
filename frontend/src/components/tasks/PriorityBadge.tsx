import { Chip } from "@mui/material";

import type { TaskPriority } from "../../types/task.types";

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const priorityConfig: Record<
  TaskPriority,
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
  low: {
    label: "Low",
    color: "success",
  },
  medium: {
    label: "Medium",
    color: "info",
  },
  high: {
    label: "High",
    color: "warning",
  },
  urgent: {
    label: "Urgent",
    color: "error",
  },
};

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default PriorityBadge;