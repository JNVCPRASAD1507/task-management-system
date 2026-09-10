

from math import ceil

from sqlalchemy.orm import Session

from app.core.exceptions import ForbiddenException, NotFoundException
from app.models.attachment import Attachment
from app.repositories.task_repository import TaskRepository
from app.schemas.attachment import (
    AttachmentListResponse,
    AttachmentResponse,
)
from app.utils.file_utils import delete_file, save_upload_file


class AttachmentService:
    def __init__(self, db: Session):
        self.db = db
        self.task_repository = TaskRepository(db)

    def get_by_task(
        self,
        task_id: int,
        page: int = 1,
        page_size: int = 20,
    ) -> AttachmentListResponse:
        task = self.task_repository.get_by_id(task_id)

        if not task:
            raise NotFoundException("Task not found")

        skip = (page - 1) * page_size

        attachments = list(
            self.db.query(Attachment)
            .filter(Attachment.task_id == task_id)
            .order_by(Attachment.created_at.desc())
            .offset(skip)
            .limit(page_size)
            .all()
        )

        total = (
            self.db.query(Attachment)
            .filter(Attachment.task_id == task_id)
            .count()
        )

        total_pages = ceil(total / page_size) if total else 0

        return AttachmentListResponse(
            items=[
                AttachmentResponse.model_validate(attachment)
                for attachment in attachments
            ],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    def create(
        self,
        task_id: int,
        upload_file,
        current_user_id: int,
    ) -> AttachmentResponse:
        task = self.task_repository.get_by_id(task_id)

        if not task:
            raise NotFoundException("Task not found")

        file_name, file_path, file_type, file_size = save_upload_file(
            upload_file
        )

        attachment = Attachment(
            file_name=file_name,
            file_path=file_path,
            file_type=file_type,
            file_size=file_size,
            task_id=task_id,
            uploaded_by=current_user_id,
        )

        self.db.add(attachment)
        self.db.commit()
        self.db.refresh(attachment)

        return AttachmentResponse.model_validate(attachment)

    def delete(
        self,
        attachment_id: int,
        current_user_id: int,
    ) -> None:
        attachment = self.db.get(
            Attachment,
            attachment_id,
        )

        if not attachment:
            raise NotFoundException("Attachment not found")

        if attachment.uploaded_by != current_user_id:
            raise ForbiddenException(
                "You can only delete your own attachments"
            )

        delete_file(attachment.file_path)

        self.db.delete(attachment)
        self.db.commit()
        
        