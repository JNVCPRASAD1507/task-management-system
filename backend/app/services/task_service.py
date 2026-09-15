from math import ceil

from sqlalchemy.orm import Session

from app.core.constants import TaskPriority, TaskStatus
from app.core.exceptions import ForbiddenException, NotFoundException
from app.models.task import Task
from app.repositories.task_repository import TaskRepository
from app.repositories.user_repository import UserRepository
from app.schemas.task import (
    TaskCreate,
    TaskListResponse,
    TaskResponse,
    TaskUpdate,
)


class TaskService:
    def __init__(self, db: Session):
        self.db = db
        self.task_repository = TaskRepository(db)
        self.user_repository = UserRepository(db)

    def get_by_id(self, task_id: int) -> TaskResponse:
        task = self.task_repository.get_by_id(task_id)

        if not task:
            raise NotFoundException("Task not found")

        return TaskResponse.model_validate(task)

    def get_all(
        self,
        page: int = 1,
        page_size: int = 20,
        status: TaskStatus | None = None,
        priority: TaskPriority | None = None,
        assignee_id: int | None = None,
    ) -> TaskListResponse:
        skip = (page - 1) * page_size

        tasks = self.task_repository.get_all(
            skip=skip,
            limit=page_size,
            status=status,
            priority=priority,
            assignee_id=assignee_id,
        )

        total = self.task_repository.count(
            status=status,
            priority=priority,
            assignee_id=assignee_id,
        )

        total_pages = ceil(total / page_size) if total else 0

        return TaskListResponse(
            items=[
                TaskResponse.model_validate(task)
                for task in tasks
            ],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    def create(
        self,
        data: TaskCreate,
        current_user_id: int,
    ) -> TaskResponse:
        if data.assignee_id is not None:
            assignee = self.user_repository.get_by_id(
                data.assignee_id
            )

            if not assignee:
                raise NotFoundException(
                    "Assigned user not found"
                )

            if not assignee.is_active:
                raise NotFoundException(
                    "Assigned user is inactive"
                )

        task = Task(
            title=data.title,
            description=data.description,
            priority=data.priority.value,
            status=TaskStatus.TODO.value,
            due_date=data.due_date,
            assignee_id=data.assignee_id,
            created_by=current_user_id,
        )

        self.task_repository.create(task)

        self.db.commit()
        self.db.refresh(task)

        return TaskResponse.model_validate(task)

    def update(
        self,
        task_id: int,
        data: TaskUpdate,
    ) -> TaskResponse:
        task = self.task_repository.get_by_id(task_id)

        if not task:
            raise NotFoundException("Task not found")

        if data.assignee_id is not None:
            assignee = self.user_repository.get_by_id(
                data.assignee_id
            )

            if not assignee:
                raise NotFoundException(
                    "Assigned user not found"
                )

            if not assignee.is_active:
                raise NotFoundException(
                    "Assigned user is inactive"
                )

            task.assignee_id = data.assignee_id

        if data.title is not None:
            task.title = data.title

        if data.description is not None:
            task.description = data.description

        if data.status is not None:
            task.status = data.status.value

        if data.priority is not None:
            task.priority = data.priority.value

        if data.due_date is not None:
            task.due_date = data.due_date

        self.task_repository.update(task)

        self.db.commit()
        self.db.refresh(task)

        return TaskResponse.model_validate(task)

    def update_status(
        self,
        task_id: int,
        status: TaskStatus,
        current_user_id: int,
    ) -> TaskResponse:
        task = self.task_repository.get_by_id(task_id)

        if not task:
            raise NotFoundException("Task not found")

        # Member can update only tasks assigned to themselves.
        if task.assignee_id != current_user_id:
            raise ForbiddenException(
                "You can update the status only of tasks assigned to you"
            )

        # Prevent changes to completed tasks.
        current_status = task.status

        if current_status == TaskStatus.COMPLETED.value:
            raise ForbiddenException(
                "Completed tasks cannot be changed"
            )

        # Members cannot move a task back to Todo.
        if status == TaskStatus.TODO:
            raise ForbiddenException(
                "Assigned members cannot move a task back to Todo"
            )

        task.status = status.value

        self.task_repository.update(task)

        self.db.commit()
        self.db.refresh(task)

        return TaskResponse.model_validate(task)

    def delete(self, task_id: int) -> None:
        task = self.task_repository.get_by_id(task_id)

        if not task:
            raise NotFoundException("Task not found")

        self.task_repository.delete(task)

        self.db.commit()