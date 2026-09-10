

from sqlalchemy.orm import Session

from app.core.constants import AuditAction
from app.models.audit_log import AuditLog


class AuditService:
    def __init__(self, db: Session):
        self.db = db

    def log(
        self,
        action: AuditAction,
        entity_type: str,
        entity_id: int | None = None,
        description: str | None = None,
        user_id: int | None = None,
    ) -> AuditLog:
        audit_log = AuditLog(
            action=action.value,
            entity_type=entity_type,
            entity_id=entity_id,
            description=description,
            user_id=user_id,
        )

        self.db.add(audit_log)
        self.db.flush()
        self.db.refresh(audit_log)

        return audit_log

    def log_create(
        self,
        entity_type: str,
        entity_id: int,
        user_id: int | None = None,
        description: str | None = None,
    ) -> AuditLog:
        return self.log(
            action=AuditAction.CREATE,
            entity_type=entity_type,
            entity_id=entity_id,
            description=description,
            user_id=user_id,
        )

    def log_update(
        self,
        entity_type: str,
        entity_id: int,
        user_id: int | None = None,
        description: str | None = None,
    ) -> AuditLog:
        return self.log(
            action=AuditAction.UPDATE,
            entity_type=entity_type,
            entity_id=entity_id,
            description=description,
            user_id=user_id,
        )

    def log_delete(
        self,
        entity_type: str,
        entity_id: int,
        user_id: int | None = None,
        description: str | None = None,
    ) -> AuditLog:
        return self.log(
            action=AuditAction.DELETE,
            entity_type=entity_type,
            entity_id=entity_id,
            description=description,
            user_id=user_id,
        )

    def log_login(
        self,
        user_id: int,
        description: str | None = None,
    ) -> AuditLog:
        return self.log(
            action=AuditAction.LOGIN,
            entity_type="user",
            entity_id=user_id,
            description=description or "User logged in",
            user_id=user_id,
        )

    def log_logout(
        self,
        user_id: int,
        description: str | None = None,
    ) -> AuditLog:
        return self.log(
            action=AuditAction.LOGOUT,
            entity_type="user",
            entity_id=user_id,
            description=description or "User logged out",
            user_id=user_id,
        )
        