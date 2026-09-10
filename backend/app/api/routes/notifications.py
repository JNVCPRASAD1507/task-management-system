

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.notification import (
    NotificationListResponse,
    NotificationResponse,
)
from app.services.notification_service import NotificationService


router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get(
    "",
    response_model=NotificationListResponse,
)
def get_my_notifications(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    unread_only: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = NotificationService(db)

    return service.get_my_notifications(
        user_id=current_user.id,
        page=page,
        page_size=page_size,
        unread_only=unread_only,
    )


@router.get(
    "/{notification_id}",
    response_model=NotificationResponse,
)
def get_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = NotificationService(db)

    return service.get_by_id(
        notification_id=notification_id,
        current_user_id=current_user.id,
    )


@router.patch(
    "/{notification_id}/read",
    response_model=NotificationResponse,
)
def mark_notification_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = NotificationService(db)

    return service.mark_as_read(
        notification_id=notification_id,
        current_user_id=current_user.id,
    )


@router.patch(
    "/read-all",
    status_code=status.HTTP_204_NO_CONTENT,
)
def mark_all_notifications_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = NotificationService(db)

    service.mark_all_as_read(
        current_user_id=current_user.id,
    )

    return None


@router.delete(
    "/{notification_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = NotificationService(db)

    service.delete(
        notification_id=notification_id,
        current_user_id=current_user.id,
    )

    return None

