import { AddOutlined, RefreshOutlined } from "@mui/icons-material";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import SearchInput from "../../components/common/SearchInput";
import UserTable from "../../components/users/UserTable";
import { useUser } from "../../hooks/useUsers";
import type { User } from "../../types/user.types";

export default function UserListPage() {
  const navigate = useNavigate();
  const { users, page, totalPages, isLoading, error, fetchUsers, removeUser } = useUser();
  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  useEffect(() => {
    void fetchUsers(1, 20);
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter((item) => `${item.full_name} ${item.email} ${item.role} ${item.status}`.toLowerCase().includes(term));
  }, [users, search]);

  const handleDelete = async () => {
    if (!deleteUser) return;
    const success = await removeUser(deleteUser.id);
    if (success) setDeleteUser(null);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Users</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>Manage team members and account access.</Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button variant="outlined" startIcon={<RefreshOutlined />} onClick={() => void fetchUsers(page, 20)} disabled={isLoading}>Refresh</Button>
          <Button variant="contained" startIcon={<AddOutlined />} onClick={() => navigate("/users/create")}>Create User</Button>
        </Stack>
      </Stack>

      {error && !users.length ? <ErrorState message={error} onRetry={() => void fetchUsers(page, 20)} /> : null}
      {error && users.length ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      <Box sx={{ mb: 2 }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search users..." disabled={isLoading} />
      </Box>

      {isLoading && !users.length ? <Loader /> : null}
      {!isLoading && filteredUsers.length === 0 && !error ? (
        <Box sx={{ p: 6, textAlign: "center", border: "1px dashed", borderColor: "divider", borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>No users found</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>Try a different search term or create a new user.</Typography>
        </Box>
      ) : null}
      {filteredUsers.length > 0 && <UserTable users={filteredUsers} onDelete={setDeleteUser} />}

      <Pagination page={page} totalPages={totalPages} onChange={(nextPage) => void fetchUsers(nextPage, 20)} disabled={isLoading} />

      <ConfirmDialog
        open={Boolean(deleteUser)}
        title="Delete user?"
        message={deleteUser ? `Delete ${deleteUser.full_name}? This action cannot be undone.` : ""}
        confirmText="Delete"
        loading={isLoading}
        onCancel={() => setDeleteUser(null)}
        onConfirm={() => void handleDelete()}
      />
    </Box>
  );
}
