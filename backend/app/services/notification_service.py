

from math import ceil

from sqlalchemy.orm import Session

from app.core.constants import NotificationType
from app.core.exceptions import NotFoundException
from app.models.notification import Notification
from app.repositories.notification_repository import NotificationRepository
from app.schemas.notification import (
    NotificationListResponse,
    NotificationResponse,
)


class NotificationService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_repository = NotificationRepository(db)

    def get_by_id(
        self,
        notification_id: int,
        current_user_id: int,
    ) -> NotificationResponse:
        notification = self.notification_repository.get_by_id(
            notification_id
        )

        if not notification:
            raise NotFoundException("Notification not found")

        if notification.user_id != current_user_id:
            raise NotFoundException("Notification not found")

        return NotificationResponse.model_validate(notification)

    def get_my_notifications(
        self,
        user_id: int,
        page: int = 1,
        page_size: int = 20,
        unread_only: bool = False,
    ) -> NotificationListResponse:
        skip = (page - 1) * page_size

        notifications = self.notification_repository.get_by_user(
            user_id=user_id,
            skip=skip,
            limit=page_size,
            unread_only=unread_only,
        )

        total = self.notification_repository.count_by_user(
            user_id=user_id,
            unread_only=unread_only,
        )

        total_pages = ceil(total / page_size) if total else 0

        return NotificationListResponse(
            items=[
                NotificationResponse.model_validate(notification)
                for notification in notifications
            ],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    def create(
        self,
        user_id: int,
        title: str,
        message: str,
        notification_type: NotificationType = NotificationType.SYSTEM,
    ) -> NotificationResponse:
        notification = Notification(
            title=title,
            message=message,
            notification_type=notification_type.value,
            is_read=False,
            user_id=user_id,
        )

        self.notification_repository.create(notification)

        self.db.commit()
        self.db.refresh(notification)

        return NotificationResponse.model_validate(notification)

    def mark_as_read(
        self,
        notification_id: int,
        current_user_id: int,
    ) -> NotificationResponse:
        notification = self.notification_repository.get_by_id(
            notification_id
        )

        if not notification:
            raise NotFoundException("Notification not found")

        if notification.user_id != current_user_id:
            raise NotFoundException("Notification not found")

        notification.is_read = True

        self.notification_repository.update(notification)

        self.db.commit()
        self.db.refresh(notification)

        return NotificationResponse.model_validate(notification)

    def mark_all_as_read(
        self,
        current_user_id: int,
    ) -> None:
        notifications = self.notification_repository.get_by_user(
            user_id=current_user_id,
            skip=0,
            limit=10000,
            unread_only=True,
        )

        for notification in notifications:
            notification.is_read = True
            self.notification_repository.update(notification)

        self.db.commit()

    def delete(
        self,
        notification_id: int,
        current_user_id: int,
    ) -> None:
        notification = self.notification_repository.get_by_id(
            notification_id
        )

        if not notification:
            raise NotFoundException("Notification not found")

        if notification.user_id != current_user_id:
            raise NotFoundException("Notification not found")

        self.notification_repository.delete(notification)

        self.db.commit()
        
        