
from datetime import datetime

from sqlalchemy import Boolean , DateTime , Column , Integer , String , func
from sqlalchemy.orm import Mapped , mapped_column , relationship

from app.core.constants import UserRole , UserStatus

from app.core.database import Base


class User(Base):
    __tablename__ = "users"
    
    id : Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True,
    )
    
    full_name : Mapped[str] = mapped_column(
        
        String(255),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    role: Mapped[UserRole] = mapped_column(
        String(20),
        default=UserRole.MEMBER.value,
        nullable=False,
    )

    status: Mapped[UserStatus] = mapped_column(
        String(20),
        default=UserStatus.ACTIVE.value,
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships will be added as the remaining models are created.
    tasks = relationship(
        "Task",
        back_populates="assignee",
        foreign_keys="Task.assignee_id",
        lazy="selectin",
    )

    created_tasks = relationship(
        "Task",
        back_populates="creator",
        foreign_keys="Task.created_by",
        lazy="selectin",
    )

    comments = relationship(
        "Comment",
        back_populates="user",
        lazy="selectin",
    )

    notifications = relationship(
        "Notification",
        back_populates="user",
        lazy="selectin",
    )

    audit_logs = relationship(
        "AuditLog",
        back_populates="user",
        lazy="selectin",
    )
