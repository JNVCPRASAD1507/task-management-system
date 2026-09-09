
from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_tasks: int
    todo_tasks: int
    in_progress_tasks: int
    completed_tasks: int
    cancelled_tasks: int

    total_users: int
    active_users: int

    overdue_tasks: int
    my_tasks: int


class DashboardTaskSummary(BaseModel):
    id: int
    title: str
    status: str
    priority: str
    due_date: str | None
    assignee_name: str | None


class DashboardResponse(BaseModel):
    stats: DashboardStats
    recent_tasks: list[DashboardTaskSummary]
    
    