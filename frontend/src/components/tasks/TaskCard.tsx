import {
  CalendarTodayOutlined,
  EditOutlined,
  PersonOutline,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import type { Task } from "../../types/task.types";

import PriorityBadge from "./PriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 2,
        },
      }}
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {task.title}
            </Typography>

            {onEdit && (
              <Tooltip title="Edit task">
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit(task);
                  }}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {task.description}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <TaskStatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </Stack>

          <Stack spacing={1}>
            {task.assignee_id !== null && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <PersonOutline
                  fontSize="small"
                  color="action"
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Assignee #{task.assignee_id}
                </Typography>
              </Stack>
            )}

            {task.due_date && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <CalendarTodayOutlined
                  fontSize="small"
                  color="action"
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Due: {task.due_date}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;