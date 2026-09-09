

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field

from app.core.constants import TaskPriority, TaskStatus


class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str | None = None
    priority: TaskPriority = TaskPriority.MEDIUM
    due_date: date | None = None


class TaskCreate(TaskBase):
    assignee_id: int | None = None


class TaskUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=1,
        max_length=200,
    )

    description: str | None = None

    status: TaskStatus | None = None

    priority: TaskPriority | None = None

    due_date: date | None = None

    assignee_id: int | None = None


class TaskResponse(TaskBase):
    id: int
    status: TaskStatus
    assignee_id: int | None
    created_by: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskListResponse(BaseModel):
    items: list[TaskResponse]
    total: int
    page: int
    page_size: int
    total_pages: int