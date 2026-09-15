import {
  AddOutlined,
  GridViewOutlined,
  RefreshOutlined,
  TableRowsOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  // IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import SearchInput from "../../components/common/SearchInput";
import TaskCard from "../../components/tasks/TaskCard";
import TaskFilters from "../../components/tasks/TaskFilters";
import TaskTable from "../../components/tasks/TaskTable";
import { useAuth } from "../../hooks/useAuth";
import { useTask } from "../../hooks/useTasks";
import type {
  Task,
  TaskFilters as TaskFiltersType,
} from "../../types/task.types";

export default function TaskListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, page, totalPages, isLoading, error, fetchTasks, removeTask } =
    useTask();
  const [filters, setFilters] = useState<TaskFiltersType>({
    page: 1,
    page_size: 20,
  });
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const canCreate = user?.role === "admin" || user?.role === "manager";
  const canDelete = user?.role === "admin" || user?.role === "manager";

  useEffect(() => {
    void fetchTasks(filters);
  }, [fetchTasks, filters]);

  const visibleTasks = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return tasks;
    return tasks.filter((task) =>
      `${task.title} ${task.description ?? ""}`.toLowerCase().includes(term),
    );
  }, [tasks, search]);

  const handleDelete = async () => {
    if (!deleteTask) return;
    const success = await removeTask(deleteTask.id);
    if (success) setDeleteTask(null);
  };

  const handleFilterChange = (next: TaskFiltersType) => {
    setFilters({ ...next, page: next.page ?? 1, page_size: 20 });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { md: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Tasks
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Create, track and manage your tasks.
          </Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            variant="outlined"
            startIcon={<RefreshOutlined />}
            onClick={() => void fetchTasks(filters)}
            disabled={isLoading}
          >
            Refresh
          </Button>
          {canCreate && (
            <Button
              variant="contained"
              startIcon={<AddOutlined />}
              onClick={() => navigate("/tasks/create")}
            >
              Create Task
            </Button>
          )}
        </Stack>
      </Stack>

      {error && !tasks.length ? (
        <ErrorState message={error} onRetry={() => void fetchTasks(filters)} />
      ) : null}
      {error && tasks.length ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}

      <Stack spacing={2} sx={{ mb: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ justifyContent: "space-between", gap: 2 }}
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search tasks on this page..."
            disabled={isLoading}
          />
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, value) => value && setView(value)}
            size="small"
            sx={{ alignSelf: { xs: "stretch", md: "auto" } }}
          >
            <ToggleButton value="table">
              <TableRowsOutlined fontSize="small" />
            </ToggleButton>
            <ToggleButton value="grid">
              <GridViewOutlined fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <TaskFilters filters={filters} onChange={handleFilterChange} />
      </Stack>

      {isLoading && !tasks.length ? <Loader /> : null}
      {!isLoading && visibleTasks.length === 0 && !error ? (
        <Box
          sx={{
            p: 6,
            textAlign: "center",
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            No tasks found
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {search
              ? "Try a different search term."
              : "Create your first task to get started."}
          </Typography>
        </Box>
      ) : null}

      {visibleTasks.length > 0 &&
        (view === "table" ? (
          <TaskTable
            tasks={visibleTasks}
            onDelete={canDelete ? setDeleteTask : undefined}
          />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => navigate(`/tasks/${task.id}/edit`)}
              />
            ))}
          </Box>
        ))}

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(nextPage) =>
          setFilters((current) => ({ ...current, page: nextPage }))
        }
        disabled={isLoading}
      />

      <ConfirmDialog
        open={Boolean(deleteTask)}
        title="Delete task?"
        message={
          deleteTask
            ? `Delete “${deleteTask.title}”? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        loading={isLoading}
        onCancel={() => setDeleteTask(null)}
        onConfirm={() => void handleDelete()}
      />
    </Box>
  );
}
