import {
  CheckCircleOutlined,
  GroupOutlined,
  HourglassEmptyOutlined,
  ListAltOutlined,
  ReportProblemOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import { Grid } from "@mui/material";

import DashboardCard from "./DashboardCard";

import type { DashboardStats as DashboardStatsType } from "../../types/dashboard.types";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="Total Tasks"
          value={stats.total_tasks}
          icon={<ListAltOutlined />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="To Do"
          value={stats.todo_tasks}
          icon={<HourglassEmptyOutlined />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="In Progress"
          value={stats.in_progress_tasks}
          icon={<TaskAltOutlined />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="Completed"
          value={stats.completed_tasks}
          icon={<CheckCircleOutlined />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="Cancelled"
          value={stats.cancelled_tasks}
          icon={<ReportProblemOutlined />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="Total Users"
          value={stats.total_users}
          icon={<GroupOutlined />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="Active Users"
          value={stats.active_users}
          icon={<GroupOutlined />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="Overdue Tasks"
          value={stats.overdue_tasks}
          icon={<ReportProblemOutlined />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DashboardCard
          title="My Tasks"
          value={stats.my_tasks}
          icon={<TaskAltOutlined />}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardStats;