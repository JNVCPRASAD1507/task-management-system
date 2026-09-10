

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.comment import (
    CommentCreate,
    CommentListResponse,
    CommentResponse,
    CommentUpdate,
)
from app.services.comment_service import CommentService


router = APIRouter(
    prefix="/comments",
    tags=["Comments"],
)


@router.get(
    "/task/{task_id}",
    response_model=CommentListResponse,
)
def get_task_comments(
    task_id: int,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = CommentService(db)

    return service.get_by_task(
        task_id=task_id,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/{comment_id}",
    response_model=CommentResponse,
)
def get_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = CommentService(db)

    return service.get_by_id(comment_id)


@router.post(
    "/task/{task_id}",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_comment(
    task_id: int,
    data: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = CommentService(db)

    return service.create(
        task_id=task_id,
        data=data,
        current_user_id=current_user.id,
    )


@router.put(
    "/{comment_id}",
    response_model=CommentResponse,
)
def update_comment(
    comment_id: int,
    data: CommentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = CommentService(db)

    return service.update(
        comment_id=comment_id,
        data=data,
        current_user_id=current_user.id,
    )


@router.delete(
    "/{comment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = CommentService(db)

    service.delete(
        comment_id=comment_id,
        current_user_id=current_user.id,
    )

    return None

