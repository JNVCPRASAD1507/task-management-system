
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

import type {
  Task,
  TaskCreate,
  TaskPriority,
  TaskStatus,
  TaskUpdate,
} from "../../types/task.types";

interface TaskFormProps {
  initialValues?: Partial<Task>;
  editMode?: boolean;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (
    values: TaskCreate | TaskUpdate,
  ) => void | Promise<void>;
}

const TaskForm = ({
  initialValues,
  editMode = false,
  loading = false,
  submitLabel = "Save Task",
  onSubmit,
}: TaskFormProps) => {
  const [title, setTitle] = useState(
    initialValues?.title ?? "",
  );

  const [description, setDescription] =
    useState(
      initialValues?.description ?? "",
    );

  const [priority, setPriority] =
    useState<TaskPriority>(
      initialValues?.priority ?? "medium",
    );

  const [status, setStatus] =
    useState<TaskStatus>(
      initialValues?.status ?? "todo",
    );

  const [dueDate, setDueDate] = useState(
    initialValues?.due_date ?? "",
  );

  const [assigneeId, setAssigneeId] =
    useState(
      initialValues?.assignee_id !== null &&
        initialValues?.assignee_id !==
          undefined
        ? String(
            initialValues.assignee_id,
          )
        : "",
    );

  useEffect(() => {
    setTitle(
      initialValues?.title ?? "",
    );

    setDescription(
      initialValues?.description ?? "",
    );

    setPriority(
      initialValues?.priority ?? "medium",
    );

    setStatus(
      initialValues?.status ?? "todo",
    );

    setDueDate(
      initialValues?.due_date ?? "",
    );

    setAssigneeId(
      initialValues?.assignee_id !==
        null &&
        initialValues?.assignee_id !==
          undefined
        ? String(
            initialValues.assignee_id,
          )
        : "",
    );
  }, [initialValues]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (editMode) {
      const payload: TaskUpdate = {
        title: title.trim(),
        description:
          description.trim() || null,
        status,
        priority,
        due_date: dueDate || null,
        assignee_id: assigneeId
          ? Number(assigneeId)
          : null,
      };

      await onSubmit(payload);
      return;
    }

    const payload: TaskCreate = {
      title: title.trim(),
      description:
        description.trim() || null,
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
        id="task-title"
        label="Task Title"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        required
        fullWidth
        slotProps={{
          htmlInput: {
            minLength: 2,
            maxLength: 200,
          },
        }}
      />

      <TextField
        id="task-description"
        label="Description"
        value={description}
        onChange={(event) =>
          setDescription(
            event.target.value,
          )
        }
        multiline
        minRows={4}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="task-priority-label">
          Priority
        </InputLabel>

        <Select
          id="task-priority"
          labelId="task-priority-label"
          value={priority}
          label="Priority"
          onChange={(event) =>
            setPriority(
              event.target.value as TaskPriority,
            )
          }
        >
          <MenuItem value="low">
            Low
          </MenuItem>

          <MenuItem value="medium">
            Medium
          </MenuItem>

          <MenuItem value="high">
            High
          </MenuItem>

          <MenuItem value="urgent">
            Urgent
          </MenuItem>
        </Select>
      </FormControl>

      {editMode && (
        <FormControl fullWidth>
          <InputLabel id="task-status-label">
            Status
          </InputLabel>

          <Select
            id="task-status"
            labelId="task-status-label"
            value={status}
            label="Status"
            onChange={(event) =>
              setStatus(
                event.target.value as TaskStatus,
              )
            }
          >
            <MenuItem value="todo">
              To Do
            </MenuItem>

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
      )}

      <TextField
        id="task-due-date"
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(event) =>
          setDueDate(event.target.value)
        }
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      <TextField
        id="task-assignee-id"
        label="Assignee ID"
        type="number"
        value={assigneeId}
        onChange={(event) =>
          setAssigneeId(
            event.target.value,
          )
        }
        helperText="Leave empty for an unassigned task."
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={
          loading ||
          !title.trim()
        }
        sx={{
          alignSelf: {
            xs: "stretch",
            sm: "flex-start",
          },
        }}
      >
        {loading
          ? "Saving..."
          : submitLabel}
      </Button>
    </Stack>
  );
};

export default TaskForm;

