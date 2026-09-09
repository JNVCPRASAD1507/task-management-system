
from collections.abc import Generator

from fastapi import Depends, Header
from sqlalchemy.orm import Session

from app.core.constants import UserRole
from app.core.database import SessionLocal
from app.core.exceptions import ForbiddenException, UnauthorizedException
from app.core.security import decode_access_token
from app.models.user import User


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_current_user(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> User:
    if not authorization:
        raise UnauthorizedException("Authorization header is required")

    if not authorization.startswith("Bearer "):
        raise UnauthorizedException("Invalid authorization header")

    token = authorization.replace("Bearer ", "", 1).strip()

    if not token:
        raise UnauthorizedException("Access token is required")

    payload = decode_access_token(token)

    if not payload:
        raise UnauthorizedException("Invalid or expired access token")

    user_id = payload.get("sub")

    if not user_id:
        raise UnauthorizedException("Invalid access token payload")

    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        raise UnauthorizedException("Invalid user ID in access token")

    user = db.get(User, user_id)

    if not user:
        raise UnauthorizedException("User not found")

    if not user.is_active:
        raise ForbiddenException("User account is inactive")

    return user


def require_roles(*roles: UserRole):
    def role_checker(
        current_user: User = Depends(get_current_user),
    ) -> User:
        if current_user.role not in [role.value for role in roles]:
            raise ForbiddenException(
                "You do not have permission to access this resource"
            )

        return current_user

    return role_checker

