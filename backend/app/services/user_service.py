

from math import ceil

from sqlalchemy.orm import Session

from app.core.constants import UserRole
from app.core.exceptions import ConflictException, NotFoundException
from app.core.security import hash_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import (
    UserCreate,
    UserListResponse,
    UserResponse,
    UserUpdate,
)


class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repository = UserRepository(db)

    def get_by_id(self, user_id: int) -> UserResponse:
        user = self.user_repository.get_by_id(user_id)

        if not user:
            raise NotFoundException("User not found")

        return UserResponse.model_validate(user)

    def get_all(
        self,
        page: int = 1,
        page_size: int = 20,
    ) -> UserListResponse:
        skip = (page - 1) * page_size

        users = self.user_repository.get_all(
            skip=skip,
            limit=page_size,
        )

        total = self.user_repository.count()

        total_pages = ceil(total / page_size) if total else 0

        return UserListResponse(
            items=[
                UserResponse.model_validate(user)
                for user in users
            ],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    def create(
        self,
        data: UserCreate,
    ) -> UserResponse:
        existing_user = self.user_repository.get_by_email(
            data.email
        )

        if existing_user:
            raise ConflictException(
                "A user with this email already exists"
            )

        user = User(
            full_name=data.full_name,
            email=data.email,
            hashed_password=hash_password(data.password),
            role=data.role.value,
            status="active",
            is_active=True,
        )

        self.user_repository.create(user)

        self.db.commit()
        self.db.refresh(user)

        return UserResponse.model_validate(user)

    def update(
        self,
        user_id: int,
        data: UserUpdate,
    ) -> UserResponse:
        user = self.user_repository.get_by_id(user_id)

        if not user:
            raise NotFoundException("User not found")

        if data.email and data.email != user.email:
            existing_user = self.user_repository.get_by_email(
                data.email
            )

            if existing_user:
                raise ConflictException(
                    "A user with this email already exists"
                )

            user.email = data.email

        if data.full_name is not None:
            user.full_name = data.full_name

        if data.role is not None:
            user.role = data.role.value

        if data.status is not None:
            user.status = data.status.value

        if data.is_active is not None:
            user.is_active = data.is_active

        self.user_repository.update(user)

        self.db.commit()
        self.db.refresh(user)

        return UserResponse.model_validate(user)
    
    def update_profile(
    self,
    user: User,
    data: UserUpdate,
) -> UserResponse:
        if data.email and data.email != user.email:
            existing_user = self.user_repository.get_by_email(
            data.email
        )

        if existing_user and existing_user.id != user.id:
            raise ConflictException(
                "A user with this email already exists"
            )

        user.email = data.email

        if data.full_name is not None:
            user.full_name = data.full_name

        self.user_repository.update(user)

        self.db.commit()
        self.db.refresh(user)

        return UserResponse.model_validate(user)

    def delete(self, user_id: int) -> None:
        user = self.user_repository.get_by_id(user_id)

        if not user:
            raise NotFoundException("User not found")

        self.user_repository.delete(user)

        self.db.commit()

