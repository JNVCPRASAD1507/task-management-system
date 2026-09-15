

from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest, UserAuthResponse
from app.core.exceptions import ConflictException, UnauthorizedException
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.core.constants import UserStatus
from app.schemas.user import UserResponse


class AuthService:
    
    def __init__(self,db:Session):
        self.db = db
        self.user_repository = UserRepository(db)
        
    def register(self , data : RegisterRequest ) -> AuthResponse:
        existing_user = self.user_repository.get_by_email(data.email)
        
        if existing_user:
            raise ConflictException("A user with this email already exists")
        
        user = User(
            full_name = data.full_name,
            email = data.email,
            hashed_password = hash_password(data.password),
            role = data.role.value,
            status = UserStatus.ACTIVE.value,
            is_active = True            
        )
        
        self.user_repository.create(user)
        
        self.db.commit()
        self.db.refresh(user)
        
        access_token = create_access_token(
            data = {"sub": str(user.id)}
        )
        
        return AuthResponse(
            access_token = access_token,
            token_type = "bearer",
            user = UserResponse.model_validate(user),
        )
        
    def login(self , data : LoginRequest) -> AuthResponse:
        user = self.user_repository.get_by_email(data.email)
        
        if not user:
            raise UnauthorizedException("Invalid email or password")
        
        if not verify_password(
            data.password, user.hashed_password,
        ):
            raise UnauthorizedException(
                "Invalid email or password"
            )
            
        if not user.is_active:
            raise UnauthorizedException(
                "User account is inactive"
            )
        access_token = create_access_token(
            data={"sub": str(user.id)}
        )
        
        return AuthResponse(
            access_token = access_token,
            token_type="bearer",
            user = UserAuthResponse.model_validate(user),
        )
    
        

