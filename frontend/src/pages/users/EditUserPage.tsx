import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import UserForm from "../../components/users/UserForm";
import { useUser } from "../../hooks/useUsers";
import type { UserUpdate } from "../../types/user.types";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { selectedUser, isLoading, error, fetchUser, editUser } = useUser();
  const id = Number(userId);

  useEffect(() => {
    if (Number.isFinite(id)) void fetchUser(id);
  }, [fetchUser, id]);

  if (!Number.isFinite(id)) return <ErrorState message="Invalid user ID." onRetry={() => navigate("/users")} />;
  if (isLoading && !selectedUser) return <Loader />;
  if (error && !selectedUser) return <ErrorState message={error} onRetry={() => void fetchUser(id)} />;
  if (!selectedUser) return <ErrorState message="User not found." onRetry={() => navigate("/users")} />;

  const handleSubmit = async (values: UserUpdate) => {
    const user = await editUser(id, values);
    if (user) navigate("/users");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 900, mx: "auto", width: "100%" }}>
      <Button startIcon={<ArrowBackOutlined />} onClick={() => navigate("/users")} sx={{ mb: 2 }}>Back to users</Button>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Edit User</Typography>
          <Typography color="text.secondary">Update profile, role and account status.</Typography>
        </Stack>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <UserForm initialValues={selectedUser} editMode submitLabel="Update User" loading={isLoading} onSubmit={(values) => void handleSubmit(values as UserUpdate)} />
      </Paper>
    </Box>
  );
}
