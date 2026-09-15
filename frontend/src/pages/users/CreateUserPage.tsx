import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import UserForm from "../../components/users/UserForm";
import { useUser } from "../../hooks/useUsers";
import type { UserCreate } from "../../types/user.types";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const { addUser, isLoading, error } = useUser();

  const handleSubmit = async (values: UserCreate) => {
    const user = await addUser(values);
    if (user) navigate("/users");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 900, mx: "auto", width: "100%" }}>
      <Button startIcon={<ArrowBackOutlined />} onClick={() => navigate("/users")} sx={{ mb: 2 }}>Back to users</Button>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Create User</Typography>
          <Typography color="text.secondary">Create a team account and assign its role.</Typography>
        </Stack>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <UserForm submitLabel="Create User" loading={isLoading} onSubmit={(values) => void handleSubmit(values as UserCreate)} />
      </Paper>
    </Box>
  );
}
