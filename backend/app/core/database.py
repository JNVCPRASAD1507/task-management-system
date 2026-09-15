
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""

    pass


engine_kwargs = {
    "pool_pre_ping": True,
}

if settings.database_url.startswith(
    "postgresql+psycopg2://"
):
    engine_kwargs.update(
        {
            "connect_args": {
                "connect_timeout": 5,
            },
            "pool_size": 5,
            "max_overflow": 5,
            "pool_timeout": 10,
        }
    )


engine = create_engine(
    settings.database_url,
    **engine_kwargs,
)


SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)


def get_db() -> Generator[Session, None, None]:
    """
    Provide a database session for each API request.
    The session is automatically closed after the request.
    """
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
        
        