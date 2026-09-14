
import { Box, Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination = ({
  page,
  totalPages,
  onChange,
  disabled = false,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 3,
        px: 1,
        overflowX: "auto",
      }}
    >
      <MuiPagination
        page={page}
        count={totalPages}
        onChange={(_, value) => onChange(value)}
        disabled={disabled}
        color="primary"
        shape="rounded"
        size="medium"
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
};

export default Pagination;
