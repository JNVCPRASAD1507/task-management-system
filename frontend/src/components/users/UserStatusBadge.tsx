
import { Chip } from "@mui/material";

import type { UserStatus } from "../../types/user.types";

interface UserStatusBadgeProps {
  status: UserStatus;
}

const UserStatusBadge = ({
  status,
}: UserStatusBadgeProps) => {
  return (
    <Chip
      label={
        status === "active"
          ? "Active"
          : "Inactive"
      }
      color={
        status === "active"
          ? "success"
          : "default"
      }
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default UserStatusBadge;
