

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_roles
from app.core.constants import UserRole
from app.models.audit_log import AuditLog
from app.models.user import User


router = APIRouter(
    prefix="/audit-logs",
    tags=["Audit Logs"],
)


@router.get(
    "",
)
def get_audit_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            UserRole.ADMIN,
        )
    ),
):
    statement = (
        select(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .limit(100)
    )

    logs = list(db.scalars(statement).all())

    return [
        {
            "id": log.id,
            "action": log.action,
            "entity_type": log.entity_type,
            "entity_id": log.entity_id,
            "description": log.description,
            "user_id": log.user_id,
            "created_at": log.created_at,
        }
        for log in logs
    ]
    
    