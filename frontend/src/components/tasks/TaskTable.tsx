import {
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import type { Task } from "../../types/task.types";

import PriorityBadge from "./PriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";

interface TaskTableProps {
  tasks: Task[];
  onDelete?: (task: Task) => void;
}

const TaskTable = ({
  tasks,
  onDelete,
}: TaskTableProps) => {
  const navigate = useNavigate();

  if (tasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography color="text.secondary">
          No tasks found.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflowX: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Task</strong>
            </TableCell>

            <TableCell>
              <strong>Status</strong>
            </TableCell>

            <TableCell>
              <strong>Priority</strong>
            </TableCell>

            <TableCell>
              <strong>Assignee</strong>
            </TableCell>

            <TableCell>
              <strong>Due Date</strong>
            </TableCell>

            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              hover
            >
              <TableCell>
                <Typography
                  fontWeight={600}
                  sx={{
                    minWidth: 180,
                    maxWidth: 300,
                    wordBreak: "break-word",
                  }}
                >
                  {task.title}
                </Typography>
              </TableCell>

              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>

              <TableCell>
                <PriorityBadge priority={task.priority} />
              </TableCell>

              <TableCell>
                {task.assignee_id
                  ? `#${task.assignee_id}`
                  : "Unassigned"}
              </TableCell>

              <TableCell>
                {task.due_date || "No due date"}
              </TableCell>

              <TableCell align="right">
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                >
                  <Tooltip title="View">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate(`/tasks/${task.id}`)
                      }
                    >
                      <VisibilityOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate(`/tasks/${task.id}/edit`)
                      }
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {onDelete && (
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(task)}
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;