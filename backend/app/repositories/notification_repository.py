

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.notification import Notification


class NotificationRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(
        self,
        notification_id: int,
    ) -> Notification | None:
        return self.db.get(Notification, notification_id)

    def get_by_user(
        self,
        user_id: int,
        skip: int = 0,
        limit: int = 20,
        unread_only: bool = False,
    ) -> list[Notification]:
        statement = select(Notification).where(
            Notification.user_id == user_id
        )

        if unread_only:
            statement = statement.where(
                Notification.is_read.is_(False)
            )

        statement = (
            statement
            .order_by(Notification.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        return list(self.db.scalars(statement).all())

    def count_by_user(
        self,
        user_id: int,
        unread_only: bool = False,
    ) -> int:
        statement = select(func.count(Notification.id)).where(
            Notification.user_id == user_id
        )

        if unread_only:
            statement = statement.where(
                Notification.is_read.is_(False)
            )

        return self.db.scalar(statement) or 0

    def create(
        self,
        notification: Notification,
    ) -> Notification:
        self.db.add(notification)
        self.db.flush()
        self.db.refresh(notification)

        return notification

    def update(
        self,
        notification: Notification,
    ) -> Notification:
        self.db.add(notification)
        self.db.flush()
        self.db.refresh(notification)

        return notification

    def delete(
        self,
        notification: Notification,
    ) -> None:
        self.db.delete(notification)
        self.db.flush()
        
        