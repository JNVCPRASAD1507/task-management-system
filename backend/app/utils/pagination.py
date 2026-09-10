

from math import ceil


def calculate_pagination(
    page: int,
    page_size: int,
    total: int,
) -> dict[str, int]:
    """
    Calculate pagination values.

    Args:
        page: Current page number.
        page_size: Number of records per page.
        total: Total number of records.

    Returns:
        Dictionary containing pagination information.
    """

    total_pages = ceil(total / page_size) if total else 0

    return {
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
    }


def calculate_offset(
    page: int,
    page_size: int,
) -> int:
    """
    Calculate database offset for a given page.
    """

    return (page - 1) * page_size

