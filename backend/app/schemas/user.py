
from pydantic import BaseModel, EmailStr , Field , ConfigDict

from app.core.constants import UserRole, UserStatus

class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=2 , max_length=100)
    
class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    password: str = Field(min_length=8, max_length=128)
    email: EmailStr
    role: UserRole = UserRole.MEMBER


class UserUpdate(BaseModel):
    full_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    email: EmailStr | None = None

    role: UserRole | None = None

    status: UserStatus | None = None

    is_active: bool | None = None


class UserResponse(UserBase):
    id: int
    role: UserRole
    status: UserStatus
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class UserListResponse(BaseModel):
    items: list[UserResponse]
    total: int
    page: int
    page_size: int
    total_pages: int