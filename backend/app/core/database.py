from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker 
from app.core.config import settings
from collections.abc import Generator

class Base(DeclarativeBase):
    """ Base class for all SQLAlchemy models. """
    pass  

engine = create_engine(
    settings.database_url,
    pool_pre_ping = True
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)

def get_db() -> Generator[Session, None , None]:
    """
    Provide a database session for each API request.

    The session is automatically closed after the request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
