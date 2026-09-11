
from pydantic import BaseModel, ConfigDict, EmailStr , Field

class LoginRequest(BaseModel):
    email : EmailStr
    password : str = Field(min_length=1 , max_length=128)
    
class RegisterRequest(BaseModel):
    email : EmailStr
    password :str = Field(min_length=8 , max_length=128)
    full_name : str = Field(min_length=2 , max_length=100)

class TokenResponse(BaseModel):
    access_token : str
    token_type : str = "bearer"
    
class UserAuthResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    status: str
    is_active: bool
    
    model_config = ConfigDict(from_attributes = True)
    
class AuthResponse(BaseModel) :
    access_token : str
    token_type : str = "bearer"
    user : UserAuthResponse
    