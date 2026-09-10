from fastapi import FastAPI
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, users

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Task Management System",
)

# ---------------------------------------------------------
# CORS Configuration
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(users.router)

# ---------------------------------------------------------
# Root Endpoint
# ---------------------------------------------------------


@app.get("/", tags=["Health Check"])
def root():
    return {
        "message": "Welcome to the Task Management System",
        "version": settings.app_version,
        "environment": settings.environment,
    }
    
# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
    }
