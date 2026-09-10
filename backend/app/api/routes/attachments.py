

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.attachment import (
    AttachmentListResponse,
    AttachmentResponse,
)
from app.services.attachment_service import AttachmentService


router = APIRouter(
    prefix="/attachments",
    tags=["Attachments"],
)


@router.get(
    "/task/{task_id}",
    response_model=AttachmentListResponse,
)
def get_task_attachments(
    task_id: int,
    page: int = 1,
    page_size: int = 20,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AttachmentService(db)

    return service.get_by_task(
        task_id=task_id,
        page=page,
        page_size=page_size,
    )


@router.post(
    "/task/{task_id}",
    response_model=AttachmentResponse,
    status_code=status.HTTP_201_CREATED,
)
def upload_attachment(
    task_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AttachmentService(db)

    return service.create(
        task_id=task_id,
        upload_file=file,
        current_user_id=current_user.id,
    )


@router.delete(
    "/{attachment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_attachment(
    attachment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AttachmentService(db)

    service.delete(
        attachment_id=attachment_id,
        current_user_id=current_user.id,
    )

    return None

