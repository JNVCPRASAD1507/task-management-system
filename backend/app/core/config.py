
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Application coniguration Loaded from environment variables and the .env file.
    """
    app_name:str = "Task Management System"
    app_version:str ="1.0.0"
    environment:str = "development"
    
    database_url:str 
    secret_key:str
    
    algorithm:str = "HS256"
    access_token_expire_minutes:int = 30
    
    cors_origins:str = "http://localhost:5173"
    
    model_config = SettingsConfigDict(
        env_file = ".env",
        env_file_encoding = "utf-8",
        case_sensitive = False,
        extra = "ignore"
    )
    
    @property
    def cors_origins_list(self) -> list[str]:
        """
        Convert comma-seperated CORS origins string to a list of strings.
        """
        return[
            origin.strip()
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]
        
@lru_cache
def get_settings() -> Settings:
    """
    Create and cache application settings instance. This function is used to retrieve the settings instance throughout the application."""
    return Settings()

settings = get_settings()
