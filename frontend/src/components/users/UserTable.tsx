import {
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import type { User } from "../../types/user.types";

import UserStatusBadge from "./UserStatusBadge";

interface UserTableProps {
  users: User[];
  onDelete?: (user: User) => void;
}

const UserTable = ({
  users,
  onDelete,
}: UserTableProps) => {
  const navigate = useNavigate();

  if (users.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography color="text.secondary">
          No users found.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflowX: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>

            <TableCell>
              <strong>Email</strong>
            </TableCell>

            <TableCell>
              <strong>Role</strong>
            </TableCell>

            <TableCell>
              <strong>Status</strong>
            </TableCell>

            <TableCell>
              <strong>Active</strong>
            </TableCell>

            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              hover
            >
              <TableCell>
                <Typography fontWeight={600}>
                  {user.full_name}
                </Typography>
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>
                <Typography
                  textTransform="capitalize"
                  fontWeight={600}
                >
                  {user.role}
                </Typography>
              </TableCell>

              <TableCell>
                <UserStatusBadge
                  status={user.status}
                />
              </TableCell>

              <TableCell>
                <UserStatusBadge
                  status={
                    user.is_active
                      ? "active"
                      : "inactive"
                  }
                />
              </TableCell>

              <TableCell align="right">
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                >
                  <Tooltip title="View">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate(
                          `/users/${user.id}/edit`
                        )
                      }
                    >
                      <VisibilityOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate(
                          `/users/${user.id}/edit`
                        )
                      }
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {onDelete && (
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          onDelete(user)
                        }
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
