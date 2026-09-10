

import logging
import time

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


logger = logging.getLogger("task_management")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self,
        request: Request,
        call_next,
    ):
        start_time = time.perf_counter()

        try:
            response = await call_next(request)

            process_time = time.perf_counter() - start_time

            logger.info(
                "%s %s - %s - %.4fs",
                request.method,
                request.url.path,
                response.status_code,
                process_time,
            )

            response.headers["X-Process-Time"] = (
                f"{process_time:.4f}"
            )

            return response

        except Exception:
            process_time = time.perf_counter() - start_time

            logger.exception(
                "%s %s - ERROR - %.4fs",
                request.method,
                request.url.path,
                process_time,
            )

            raise
        
        