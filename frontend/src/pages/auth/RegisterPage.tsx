// import { useEffect, useState } from "react";

// import { Link, useNavigate } from "react-router-dom";

// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CircularProgress,
//   Container,
//   Divider,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { PersonAddOutlined } from "@mui/icons-material";

// import { Controller, useForm } from "react-hook-form";

// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   registerSchema,
//   type RegisterFormData,
// } from "../../schemas/auth.schema";

// import { useAuth } from "../../hooks/useAuth";

// import { getErrorMessage } from "../../utils/errorHandler";

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     isAuthenticated,
//     isLoading,
//   } = useAuth();

//   const [error, setError] = useState<string | null>(null);

//   const {
//     register: registerField,
//     handleSubmit,
//     control,
//     formState: {
//       errors,
//       isSubmitting,
//     },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       full_name: "",
//       email: "",
//       password: "",
//       role: "member",
//     },
//   });

//   useEffect(() => {
//     if (!isLoading && isAuthenticated) {
//       navigate("/dashboard", {
//         replace: true,
//       });
//     }
//   }, [
//     isAuthenticated,
//     isLoading,
//     navigate,
//   ]);

//   const onSubmit = async (
//     data: RegisterFormData,
//   ) => {
//     try {
//       setError(null);

//       await register(data);

//       navigate("/dashboard", {
//         replace: true,
//       });
//     } catch (err) {
//       setError(
//         getErrorMessage(
//           err,
//           "Registration failed. Please try again.",
//         ),
//       );
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         py: 4,
//         background:
//           "linear-gradient(135deg, #f5f7fb 0%, #e8eef7 100%)",
//       }}
//     >
//       <Container maxWidth="sm">
//         <Card
//           elevation={4}
//           sx={{
//             maxWidth: 500,
//             mx: "auto",
//             borderRadius: 3,
//           }}
//         >
//           <CardContent
//             sx={{
//               p: {
//                 xs: 3,
//                 sm: 5,
//               },
//             }}
//           >
//             <Stack
//               spacing={3}
//               sx={{
//                 alignItems: "center",
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   bgcolor: "primary.main",
//                   color: "white",
//                 }}
//               >
//                 <PersonAddOutlined />
//               </Box>

//               <Box sx={{ textAlign: "center" }}>
//                 <Typography
//                   variant="h4"
//                   sx={{ fontWeight: 700 }}
//                 >
//                   Create Account
//                 </Typography>

//                 <Typography
//                   color="text.secondary"
//                   sx={{ mt: 1 }}
//                 >
//                   Create your Task Management account
//                 </Typography>
//               </Box>

//               {error && (
//                 <Alert
//                   severity="error"
//                   sx={{ width: "100%" }}
//                 >
//                   {error}
//                 </Alert>
//               )}

//               <Box
//                 component="form"
//                 onSubmit={handleSubmit(onSubmit)}
//                 sx={{ width: "100%" }}
//                 noValidate
//               >
//                 <Stack spacing={2.5}>
//                   <TextField
//                     id="register-full-name"
//                     fullWidth
//                     label="Full Name"
//                     autoComplete="name"
//                     {...registerField("full_name")}
//                     error={Boolean(errors.full_name)}
//                     helperText={
//                       errors.full_name?.message
//                     }
//                   />

//                   <TextField
//                     id="register-email"
//                     fullWidth
//                     label="Email"
//                     type="email"
//                     autoComplete="email"
//                     {...registerField("email")}
//                     error={Boolean(errors.email)}
//                     helperText={
//                       errors.email?.message
//                     }
//                   />

//                   <TextField
//                     id="register-password"
//                     fullWidth
//                     label="Password"
//                     type="password"
//                     autoComplete="new-password"
//                     {...registerField("password")}
//                     error={Boolean(errors.password)}
//                     helperText={
//                       errors.password?.message ??
//                       "Minimum 8 characters"
//                     }
//                   />

//                   <Controller
//                     name="role"
//                     control={control}
//                     render={({ field }) => (
//                       <FormControl
//                         fullWidth
//                         error={Boolean(errors.role)}
//                       >
//                         <InputLabel id="register-role-label">
//                           Role
//                         </InputLabel>

//                         <Select
//                           {...field}
//                           id="register-role"
//                           labelId="register-role-label"
//                           label="Role"
//                         >
//                           <MenuItem value="member">
//                             Member
//                           </MenuItem>

//                           <MenuItem value="manager">
//                             Manager
//                           </MenuItem>

//                           <MenuItem value="admin">
//                             Admin
//                           </MenuItem>
//                         </Select>

//                         {errors.role && (
//                           <FormHelperText>
//                             {errors.role.message}
//                           </FormHelperText>
//                         )}
//                       </FormControl>
//                     )}
//                   />

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     size="large"
//                     fullWidth
//                     disabled={
//                       isSubmitting ||
//                       isLoading
//                     }
//                     sx={{
//                       minHeight: 48,
//                     }}
//                   >
//                     {isSubmitting ? (
//                       <CircularProgress
//                         size={24}
//                         color="inherit"
//                       />
//                     ) : (
//                       "Create Account"
//                     )}
//                   </Button>
//                 </Stack>
//               </Box>

//               <Divider sx={{ width: "100%" }}>
//                 OR
//               </Divider>

//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//               >
//                 Already have an account?
//               </Typography>

//               <Button
//                 component={Link}
//                 to="/login"
//                 variant="outlined"
//                 fullWidth
//                 size="large"
//               >
//                 Sign In
//               </Button>
//             </Stack>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default RegisterPage;

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { PersonAddOutlined } from "@mui/icons-material";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/auth.schema";

import { useAuth } from "../../hooks/useAuth";

import { getErrorMessage } from "../../utils/errorHandler";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { register, isAuthenticated, isLoading } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const {
    register: registerField,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      role: "member",
    },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      setError(null);

      await register(data);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed. Please try again."));
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
            maxWidth: 500,
            mx: "auto",
            borderRadius: 3,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },
            }}
          >
            <Stack
              spacing={3}
              sx={{
                alignItems: "center",
              }}
            >
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
                <PersonAddOutlined />
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Create Account
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Create your Task Management account
                </Typography>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    width: "100%",
                  }}
                >
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  width: "100%",
                }}
                noValidate
              >
                <Stack spacing={2.5}>
                  <TextField
                    id="register-full-name"
                    fullWidth
                    label="Full Name"
                    autoComplete="name"
                    {...registerField("full_name")}
                    error={Boolean(errors.full_name)}
                    helperText={errors.full_name?.message}
                  />

                  <TextField
                    id="register-email"
                    fullWidth
                    label="Email"
                    type="email"
                    autoComplete="email"
                    {...registerField("email")}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />

                  <TextField
                    id="register-password"
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    {...registerField("password")}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password?.message ?? "Minimum 8 characters"
                    }
                  />

                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={Boolean(errors.role)}>
                        <InputLabel id="register-role-label">Role</InputLabel>

                        <Select
                          {...field}
                          id="register-role"
                          labelId="register-role-label"
                          label="Role"
                        >
                          <MenuItem value="member">Member</MenuItem>

                          <MenuItem value="manager">Manager</MenuItem>

                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>

                        {errors.role && (
                          <FormHelperText>{errors.role.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
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
                      "Create Account"
                    )}
                  </Button>
                </Stack>
              </Box>

              <Divider
                sx={{
                  width: "100%",
                }}
              >
                OR
              </Divider>

              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                fullWidth
                size="large"
              >
                Sign In
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;
