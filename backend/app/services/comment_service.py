

from math import ceil

from sqlalchemy.orm import Session

from app.core.exceptions import ForbiddenException, NotFoundException
from app.models.comment import Comment
from app.repositories.comment_repository import CommentRepository
from app.repositories.task_repository import TaskRepository
from app.schemas.comment import (
    CommentCreate,
    CommentListResponse,
    CommentResponse,
    CommentUpdate,
)


class CommentService:
    def __init__(self, db: Session):
        self.db = db
        self.comment_repository = CommentRepository(db)
        self.task_repository = TaskRepository(db)

    def get_by_id(self, comment_id: int) -> CommentResponse:
        comment = self.comment_repository.get_by_id(comment_id)

        if not comment:
            raise NotFoundException("Comment not found")

        return CommentResponse.model_validate(comment)

    def get_by_task(
        self,
        task_id: int,
        page: int = 1,
        page_size: int = 20,
    ) -> CommentListResponse:
        task = self.task_repository.get_by_id(task_id)

        if not task:
            raise NotFoundException("Task not found")

        skip = (page - 1) * page_size

        comments = self.comment_repository.get_by_task(
            task_id=task_id,
            skip=skip,
            limit=page_size,
        )

        total = self.comment_repository.count_by_task(task_id)

        total_pages = ceil(total / page_size) if total else 0

        return CommentListResponse(
            items=[
                CommentResponse.model_validate(comment)
                for comment in comments
            ],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    def create(
        self,
        task_id: int,
        data: CommentCreate,
        current_user_id: int,
    ) -> CommentResponse:
        task = self.task_repository.get_by_id(task_id)

        if not task:
            raise NotFoundException("Task not found")

        comment = Comment(
            content=data.content,
            task_id=task_id,
            user_id=current_user_id,
        )

        self.comment_repository.create(comment)

        self.db.commit()
        self.db.refresh(comment)

        return CommentResponse.model_validate(comment)

    def update(
        self,
        comment_id: int,
        data: CommentUpdate,
        current_user_id: int,
    ) -> CommentResponse:
        comment = self.comment_repository.get_by_id(comment_id)

        if not comment:
            raise NotFoundException("Comment not found")

        if comment.user_id != current_user_id:
            raise ForbiddenException(
                "You can only edit your own comments"
            )

        comment.content = data.content

        self.comment_repository.update(comment)

        self.db.commit()
        self.db.refresh(comment)

        return CommentResponse.model_validate(comment)

    def delete(
        self,
        comment_id: int,
        current_user_id: int,
    ) -> None:
        comment = self.comment_repository.get_by_id(comment_id)

        if not comment:
            raise NotFoundException("Comment not found")

        if comment.user_id != current_user_id:
            raise ForbiddenException(
                "You can only delete your own comments"
            )

        self.comment_repository.delete(comment)

        self.db.commit()
        
        