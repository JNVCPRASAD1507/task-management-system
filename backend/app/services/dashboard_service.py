

from datetime import date

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.constants import TaskStatus
from app.models.task import Task
from app.models.user import User
from app.schemas.dashboard import (
    DashboardResponse,
    DashboardStats,
    DashboardTaskSummary,
)


class DashboardService:
    def __init__(self, db: Session):
        self.db = db

    def get_dashboard(
        self,
        current_user_id: int,
    ) -> DashboardResponse:
        total_tasks = self._count_tasks()

        todo_tasks = self._count_tasks(
            status=TaskStatus.TODO
        )

        in_progress_tasks = self._count_tasks(
            status=TaskStatus.IN_PROGRESS
        )

        completed_tasks = self._count_tasks(
            status=TaskStatus.COMPLETED
        )

        cancelled_tasks = self._count_tasks(
            status=TaskStatus.CANCELLED
        )

        total_users = self.db.scalar(
            select(func.count(User.id))
        ) or 0

        active_users = self.db.scalar(
            select(func.count(User.id)).where(
                User.is_active.is_(True)
            )
        ) or 0

        overdue_tasks = self.db.scalar(
            select(func.count(Task.id)).where(
                Task.due_date < date.today(),
                Task.status.notin_(
                    [
                        TaskStatus.COMPLETED.value,
                        TaskStatus.CANCELLED.value,
                    ]
                ),
            )
        ) or 0

        my_tasks = self.db.scalar(
            select(func.count(Task.id)).where(
                Task.assignee_id == current_user_id
            )
        ) or 0

        recent_tasks = self._get_recent_tasks()

        return DashboardResponse(
            stats=DashboardStats(
                total_tasks=total_tasks,
                todo_tasks=todo_tasks,
                in_progress_tasks=in_progress_tasks,
                completed_tasks=completed_tasks,
                cancelled_tasks=cancelled_tasks,
                total_users=total_users,
                active_users=active_users,
                overdue_tasks=overdue_tasks,
                my_tasks=my_tasks,
            ),
            recent_tasks=recent_tasks,
        )

    def _count_tasks(
        self,
        status: TaskStatus | None = None,
    ) -> int:
        statement = select(func.count(Task.id))

        if status:
            statement = statement.where(
                Task.status == status.value
            )

        return self.db.scalar(statement) or 0

    def _get_recent_tasks(
        self,
        limit: int = 5,
    ) -> list[DashboardTaskSummary]:
        statement = (
            select(
                Task.id,
                Task.title,
                Task.status,
                Task.priority,
                Task.due_date,
                User.full_name,
            )
            .outerjoin(
                User,
                User.id == Task.assignee_id,
            )
            .order_by(Task.created_at.desc())
            .limit(limit)
        )

        rows = self.db.execute(statement).all()

        return [
            DashboardTaskSummary(
                id=row.id,
                title=row.title,
                status=row.status,
                priority=row.priority,
                due_date=(
                    row.due_date.isoformat()
                    if row.due_date
                    else None
                ),
                assignee_name=row.full_name,
            )
            for row in rows
        ]
        
        