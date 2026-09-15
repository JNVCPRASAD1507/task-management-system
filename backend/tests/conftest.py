
import os
import uuid

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

# ------------------------------------------------------------------
# Force the application itself to use SQLite during tests.
# This must happen BEFORE importing app modules.
# ------------------------------------------------------------------

TEST_DATABASE_URL = "sqlite:///:memory:"

os.environ["DATABASE_URL"] = TEST_DATABASE_URL
os.environ["SECRET_KEY"] = "test-secret-key"
os.environ["CORS_ORIGINS"] = "http://localhost:5173"

from app import models  # noqa: E402,F401
from app.api.deps import get_db  # noqa: E402
from app.core.constants import UserRole, UserStatus  # noqa: E402
from app.core.database import Base  # noqa: E402
from app.core.security import (  # noqa: E402
    create_access_token,
    hash_password,
)
from app.main import app  # noqa: E402
from app.models.user import User  # noqa: E402


test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={
        "check_same_thread": False,
    },
    poolclass=StaticPool,
)


@pytest.fixture(scope="session")
def test_database():
    Base.metadata.create_all(
        bind=test_engine
    )

    yield test_engine

    Base.metadata.drop_all(
        bind=test_engine
    )


@pytest.fixture()
def db(test_database):
    connection = test_database.connect()
    transaction = connection.begin()

    session = Session(
        bind=connection,
        expire_on_commit=False,
    )

    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture()
def client(db):
    def override_get_db():
        yield db

    app.dependency_overrides[
        get_db
    ] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()


@pytest.fixture()
def create_user(db):
    def _create_user(
        role: str = UserRole.MEMBER.value,
        full_name: str = "Test User",
        email: str | None = None,
        password: str = "TestPassword123",
        is_active: bool = True,
    ):
        user = User(
            full_name=full_name,
            email=(
                email
                or f"{uuid.uuid4().hex}@example.com"
            ),
            hashed_password=hash_password(
                password
            ),
            role=role,
            status=(
                UserStatus.ACTIVE.value
                if is_active
                else UserStatus.INACTIVE.value
            ),
            is_active=is_active,
        )

        db.add(user)
        db.flush()
        db.refresh(user)

        return user

    return _create_user


@pytest.fixture()
def admin_user(create_user):
    return create_user(
        role=UserRole.ADMIN.value,
        full_name="Admin User",
        email=(
            f"admin-{uuid.uuid4().hex}@example.com"
        ),
    )


@pytest.fixture()
def manager_user(create_user):
    return create_user(
        role=UserRole.MANAGER.value,
        full_name="Manager User",
        email=(
            f"manager-{uuid.uuid4().hex}@example.com"
        ),
    )


@pytest.fixture()
def member_user(create_user):
    return create_user(
        role=UserRole.MEMBER.value,
        full_name="Member User",
        email=(
            f"member-{uuid.uuid4().hex}@example.com"
        ),
    )


@pytest.fixture()
def auth_headers():
    def _auth_headers(user: User):
        token = create_access_token(
            data={
                "sub": str(user.id)
            }
        )

        return {
            "Authorization": (
                f"Bearer {token}"
            )
        }

    return _auth_headers
