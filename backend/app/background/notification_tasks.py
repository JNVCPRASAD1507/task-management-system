
from sqlalchemy.orm import Session

from app.core.constants import NotificationType
from app.models.notification import Notification


def create_task_assignment_notification(
    db: Session,
    user_id: int,
    task_title: str,
) -> Notification:
    """
    Create a notification when a task is assigned to a user.
    """

    notification = Notification(
        title="New Task Assigned",
        message=f'You have been assigned the task "{task_title}".',
        notification_type=NotificationType.TASK_ASSIGNED.value,
        is_read=False,
        user_id=user_id,
    )

    db.add(notification)
    db.flush()
    db.refresh(notification)

    return notification


def create_task_update_notification(
    db: Session,
    user_id: int,
    task_title: str,
) -> Notification:
    """
    Create a notification when an assigned task is updated.
    """

    notification = Notification(
        title="Task Updated",
        message=f'The task "{task_title}" has been updated.',
        notification_type=NotificationType.TASK_UPDATED.value,
        is_read=False,
        user_id=user_id,
    )

    db.add(notification)
    db.flush()
    db.refresh(notification)

    return notification


def create_task_completion_notification(
    db: Session,
    user_id: int,
    task_title: str,
) -> Notification:
    """
    Create a notification when a task is completed.
    """

    notification = Notification(
        title="Task Completed",
        message=f'The task "{task_title}" has been completed.',
        notification_type=NotificationType.TASK_COMPLETED.value,
        is_read=False,
        user_id=user_id,
    )

    db.add(notification)
    db.flush()
    db.refresh(notification)

    return notification


def create_comment_notification(
    db: Session,
    user_id: int,
    task_title: str,
) -> Notification:
    """
    Create a notification when a comment is added to a task.
    """

    notification = Notification(
        title="New Comment",
        message=f'A new comment was added to the task "{task_title}".',
        notification_type=NotificationType.COMMENT_ADDED.value,
        is_read=False,
        user_id=user_id,
    )

    db.add(notification)
    db.flush()
    db.refresh(notification)

    return notification

