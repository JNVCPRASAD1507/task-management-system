
from datetime import date

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.constants import TaskPriority, TaskStatus
from app.models.task import Task


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, task_id: int) -> Task | None:
        return self.db.get(Task, task_id)

    def get_all(
        self,
        skip: int = 0,
        limit: int = 20,
        status: TaskStatus | None = None,
        priority: TaskPriority | None = None,
        assignee_id: int | None = None,
    ) -> list[Task]:
        statement = select(Task)

        if status:
            statement = statement.where(Task.status == status.value)

        if priority:
            statement = statement.where(Task.priority == priority.value)

        if assignee_id is not None:
            statement = statement.where(Task.assignee_id == assignee_id)

        statement = (
            statement
            .order_by(Task.id.desc())
            .offset(skip)
            .limit(limit)
        )

        return list(self.db.scalars(statement).all())

    def count(
        self,
        status: TaskStatus | None = None,
        priority: TaskPriority | None = None,
        assignee_id: int | None = None,
    ) -> int:
        statement = select(func.count(Task.id))

        if status:
            statement = statement.where(Task.status == status.value)

        if priority:
            statement = statement.where(Task.priority == priority.value)

        if assignee_id is not None:
            statement = statement.where(Task.assignee_id == assignee_id)

        return self.db.scalar(statement) or 0

    def count_by_status(self, status: TaskStatus) -> int:
        statement = select(func.count(Task.id)).where(
            Task.status == status.value
        )

        return self.db.scalar(statement) or 0

    def count_by_assignee(self, assignee_id: int) -> int:
        statement = select(func.count(Task.id)).where(
            Task.assignee_id == assignee_id
        )

        return self.db.scalar(statement) or 0

    def count_overdue(self) -> int:
        statement = select(func.count(Task.id)).where(
            Task.due_date < date.today(),
            Task.status.notin_(
                [
                    TaskStatus.COMPLETED.value,
                    TaskStatus.CANCELLED.value,
                ]
            ),
        )

        return self.db.scalar(statement) or 0

    def get_recent(
        self,
        limit: int = 5,
    ) -> list[Task]:
        statement = (
            select(Task)
            .order_by(Task.created_at.desc())
            .limit(limit)
        )

        return list(self.db.scalars(statement).all())

    def create(self, task: Task) -> Task:
        self.db.add(task)
        self.db.flush()
        self.db.refresh(task)

        return task

    def update(self, task: Task) -> Task:
        self.db.add(task)
        self.db.flush()
        self.db.refresh(task)

        return task

    def delete(self, task: Task) -> None:
        self.db.delete(task)
        self.db.flush()
        
        