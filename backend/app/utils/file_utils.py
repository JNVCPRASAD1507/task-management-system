

import os
import uuid
from pathlib import Path

from fastapi import UploadFile


BASE_DIR = Path(__file__).resolve().parents[2]
UPLOAD_DIR = BASE_DIR / "uploads"

UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


def save_upload_file(
    upload_file: UploadFile,
) -> tuple[str, str, str | None, int]:
    original_file_name = upload_file.filename or "uploaded_file"

    file_extension = Path(
        original_file_name
    ).suffix

    unique_file_name = (
        f"{uuid.uuid4().hex}{file_extension}"
    )

    file_path = UPLOAD_DIR / unique_file_name

    file_content = upload_file.file.read()

    with open(file_path, "wb") as file:
        file.write(file_content)

    file_size = len(file_content)

    return (
        original_file_name,
        str(file_path),
        upload_file.content_type,
        file_size,
    )


def delete_file(file_path: str) -> None:
    path = Path(file_path)

    if path.exists() and path.is_file():
        os.remove(path)
        
        