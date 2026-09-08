from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.constants import TaskPriority, TaskStatus
from app.core.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    status: Mapped[TaskStatus] = mapped_column(
        String(30),
        default=TaskStatus.TODO.value,
        nullable=False,
        index=True,
    )

    priority: Mapped[TaskPriority] = mapped_column(
        String(20),
        default=TaskPriority.MEDIUM.value,
        nullable=False,
        index=True,
    )

    due_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
        index=True,
    )

    assignee_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    created_by: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
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

    # User assigned to this task
    assignee = relationship(
        "User",
        back_populates="tasks",
        foreign_keys=[assignee_id],
    )

    # User who created this task
    creator = relationship(
        "User",
        back_populates="created_tasks",
        foreign_keys=[created_by],
    )

    comments = relationship(
        "Comment",
        back_populates="task",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    attachments = relationship(
        "Attachment",
        back_populates="task",
        cascade="all, delete-orphan",
        lazy="selectin",
    )