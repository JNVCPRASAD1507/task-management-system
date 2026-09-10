

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db, require_roles
from app.core.constants import TaskPriority, TaskStatus, UserRole
from app.models.user import User
from app.schemas.task import (
    TaskCreate,
    TaskListResponse,
    TaskResponse,
    TaskUpdate,
)
from app.services.task_service import TaskService


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.get(
    "",
    response_model=TaskListResponse,
)
def get_tasks(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    task_status: TaskStatus | None = Query(
        default=None,
        alias="status",
    ),
    priority: TaskPriority | None = None,
    assignee_id: int | None = Query(
        default=None,
        ge=1,
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = TaskService(db)

    return service.get_all(
        page=page,
        page_size=page_size,
        status=task_status,
        priority=priority,
        assignee_id=assignee_id,
    )


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = TaskService(db)

    return service.get_by_id(task_id)


@router.post(
    "",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_task(
    data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            UserRole.ADMIN,
            UserRole.MANAGER,
        )
    ),
):
    service = TaskService(db)

    return service.create(
        data=data,
        current_user_id=current_user.id,
    )


@router.put(
    "/{task_id}",
    response_model=TaskResponse,
)
def update_task(
    task_id: int,
    data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = TaskService(db)

    return service.update(
        task_id=task_id,
        data=data,
    )


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            UserRole.ADMIN,
            UserRole.MANAGER,
        )
    ),
):
    service = TaskService(db)

    service.delete(task_id)

    return None

