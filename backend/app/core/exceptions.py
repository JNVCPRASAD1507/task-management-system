

from fastapi import HTTPException , status


class AppException(HTTPException):
    """
    Base Application Exception
    """
    
    def __init__(
        self,
        status_code: int,
        detail: str,
    ):
        super().__init__(
            status_code=status_code,
            detail=detail,
        )
        
        
class BadRequestException(AppException):
    """
    400 - Bad Request
    """

    def __init__(self, detail: str = "Bad request"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
        )


class UnauthorizedException(AppException):
    """
    401 - Unauthorized
    """

    def __init__(self, detail: str = "Authentication required"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
        )


class ForbiddenException(AppException):
    """
    403 - Forbidden
    """

    def __init__(self, detail: str = "You do not have permission to perform this action"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
        )


class NotFoundException(AppException):
    """
    404 - Resource not found
    """

    def __init__(self, detail: str = "Resource not found"):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
        )


class ConflictException(AppException):
    """
    409 - Resource conflict
    """

    def __init__(self, detail: str = "Resource already exists"):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=detail,
        )


class ValidationException(AppException):
    """
    422 - Validation error
    """

    def __init__(self, detail: str = "Validation error"):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail,
        )
    

