import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

import type {
  Task,
  TaskCreate,
  TaskPriority,
  TaskUpdate,
} from "../../types/task.types";

interface TaskFormProps {
  initialValues?: Partial<Task>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (
    values: TaskCreate | TaskUpdate
  ) => void | Promise<void>;
}

const TaskForm = ({
  initialValues,
  loading = false,
  submitLabel = "Save Task",
  onSubmit,
}: TaskFormProps) => {
  const [title, setTitle] = useState(
    initialValues?.title ?? ""
  );

  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );

  const [priority, setPriority] =
    useState<TaskPriority>(
      initialValues?.priority ?? "medium"
    );

  const [dueDate, setDueDate] = useState(
    initialValues?.due_date ?? ""
  );

  const [assigneeId, setAssigneeId] = useState(
    initialValues?.assignee_id
      ? String(initialValues.assignee_id)
      : ""
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const payload: TaskCreate = {
      title: title.trim(),
      description: description.trim() || null,
      priority,
      due_date: dueDate || null,
      assignee_id: assigneeId
        ? Number(assigneeId)
        : null,
    };

    await onSubmit(payload);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2.5}
    >
      <TextField
        label="Task Title"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        required
        fullWidth
        inputProps={{ maxLength: 200 }}
      />

      <TextField
        label="Description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        multiline
        minRows={4}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>

        <Select
          value={priority}
          label="Priority"
          onChange={(event) =>
            setPriority(
              event.target.value as TaskPriority
            )
          }
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="urgent">Urgent</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(event) =>
          setDueDate(event.target.value)
        }
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />

      <TextField
        label="Assignee ID"
        type="number"
        value={assigneeId}
        onChange={(event) =>
          setAssigneeId(event.target.value)
        }
        helperText="Leave empty for an unassigned task."
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading || !title.trim()}
        sx={{
          alignSelf: {
            xs: "stretch",
            sm: "flex-start",
          },
        }}
      >
        {loading ? "Saving..." : submitLabel}
      </Button>
    </Stack>
  );
};

export default TaskForm;