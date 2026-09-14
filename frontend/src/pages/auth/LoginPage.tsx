import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";

import { useAuth } from "../../hooks/useAuth";

import { getErrorMessage } from "../../utils/errorHandler";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isAuthenticated, isLoading } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);

      await login(data);

      const from = location.state?.from?.pathname || "/dashboard";

      navigate(from, {
        replace: true,
      });
    } catch (err) {
      setError(
        getErrorMessage(err, "Login failed. Please check your credentials."),
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4,
        background: "linear-gradient(135deg, #f5f7fb 0%, #e8eef7 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 460,
            mx: "auto",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack spacing={3} sx={{alignItems:"center"}}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <LockOutlined />
              </Box>

              <Box sx={{textAlign:"center"}}>
                <Typography variant="h4" sx={{fontWeight:700}}>
                  Welcome Back
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Sign in to your Task Management account
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ width: "100%" }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: "100%" }}
              >
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password")}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting || isLoading}
                    sx={{
                      minHeight: 48,
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ width: "100%" }}>OR</Divider>

              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>

              <Button
                component={Link}
                to="/register"
                variant="outlined"
                fullWidth
                size="large"
              >
                Create Account
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
