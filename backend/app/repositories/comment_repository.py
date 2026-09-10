from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.comment import Comment


class CommentRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, comment_id: int) -> Comment | None:
        return self.db.get(Comment, comment_id)

    def get_by_task(
        self,
        task_id: int,
        skip: int = 0,
        limit: int = 20,
    ) -> list[Comment]:
        statement = (
            select(Comment)
            .where(Comment.task_id == task_id)
            .order_by(Comment.created_at.asc())
            .offset(skip)
            .limit(limit)
        )

        return list(self.db.scalars(statement).all())

    def count_by_task(self, task_id: int) -> int:
        statement = select(func.count(Comment.id)).where(
            Comment.task_id == task_id
        )

        return self.db.scalar(statement) or 0

    def create(self, comment: Comment) -> Comment:
        self.db.add(comment)
        self.db.flush()
        self.db.refresh(comment)

        return comment

    def update(self, comment: Comment) -> Comment:
        self.db.add(comment)
        self.db.flush()
        self.db.refresh(comment)

        return comment

    def delete(self, comment: Comment) -> None:
        self.db.delete(comment)
        self.db.flush()
        
        