import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import type {
  TaskFilters as TaskFiltersType,
  TaskPriority,
  TaskStatus,
} from "../../types/task.types";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onChange: (
    filters: TaskFiltersType
  ) => void;
}

const TaskFilters = ({
  filters,
  onChange,
}: TaskFiltersProps) => {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={2}
      sx={{flexWrap:"wrap"}}
      useFlexGap
    >
      <FormControl
        size="small"
        sx={{ minWidth: 170 }}
      >
        <InputLabel>Status</InputLabel>

        <Select
          value={filters.status ?? ""}
          label="Status"
          onChange={(event) => {
            const value = event.target.value as TaskStatus | "";

            onChange({
              ...filters,
              page: 1,
              status: value || undefined,
            });
          }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in_progress">
            In Progress
          </MenuItem>
          <MenuItem value="completed">
            Completed
          </MenuItem>
          <MenuItem value="cancelled">
            Cancelled
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{ minWidth: 170 }}
      >
        <InputLabel>Priority</InputLabel>

        <Select
          value={filters.priority ?? ""}
          label="Priority"
          onChange={(event) => {
            const value =
              event.target.value as TaskPriority | "";

            onChange({
              ...filters,
              page: 1,
              priority: value || undefined,
            });
          }}
        >
          <MenuItem value="">All Priorities</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="urgent">Urgent</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default TaskFilters;