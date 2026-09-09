
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AttachmentResponse(BaseModel):
    id: int
    file_name: str
    file_path: str
    file_type: str | None
    file_size: int | None
    task_id: int
    uploaded_by: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AttachmentListResponse(BaseModel):
    items: list[AttachmentResponse]
    total: int
    page: int
    page_size: int
    total_pages: int