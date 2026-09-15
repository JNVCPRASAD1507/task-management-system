
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    attachments,
    audit_logs,
    auth,
    comments,
    dashboard,
    notifications,
    tasks,
    users,
)
from app.core.config import settings
from app.core.database import engine
from app.middleware.request_logging import RequestLoggingMiddleware

# Import all models so SQLAlchemy knows about every table.
from app import models  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifecycle.

    Database schema management is handled by Alembic.
    FastAPI should not run create_all() on every startup.
    """
    yield

    engine.dispose()


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Task Management System API",
    lifespan=lifespan,
)


app.add_middleware(RequestLoggingMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)
app.include_router(comments.router)
app.include_router(attachments.router)
app.include_router(notifications.router)
app.include_router(dashboard.router)
app.include_router(audit_logs.router)


@app.get(
    "/",
    tags=["Health"],
)
def root():
    return {
        "message": "Task Management System API",
        "version": settings.app_version,
        "status": "running",
    }


@app.get(
    "/health",
    tags=["Health"],
)
def health_check():
    return {
        "status": "healthy",
    }
