import {
  EditOutlined,
  EmailOutlined,
  PersonOutlined,
  SaveOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateCurrentUser } from "../../api/auth.api";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { user, refreshUser } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [fullName, setFullName] = useState(user?.full_name ?? "");

  const [email, setEmail] = useState(user?.email ?? "");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFullName(user.full_name);
    setEmail(user.email);
  }, [user]);

  if (!user) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 3, md: 4 },
        }}
      >
        <Alert severity="error">Unable to load your profile.</Alert>
      </Box>
    );
  }

  const initials = user.full_name
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleEdit = () => {
    setSuccess("");
    setError("");

    setFullName(user.full_name);
    setEmail(user.email);

    setEditMode(true);
  };

  const handleCancel = () => {
    setFullName(user.full_name);
    setEmail(user.email);

    setError("");
    setEditMode(false);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Full name is required.");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Full name must contain at least 2 characters.");
      return;
    }

    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    try {
      setIsSaving(true);

      const updatedUser = await updateCurrentUser({
        full_name: trimmedName,
        email: trimmedEmail,
      });

      /*
       * Refresh the authenticated user.
       *
       * This updates:
       * - React AuthContext
       * - localStorage["user"]
       * - ProfilePage
       */
      await refreshUser();

      setFullName(updatedUser.full_name);
      setEmail(updatedUser.email);

      setEditMode(false);
      setSuccess("Profile updated successfully.");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update profile.";

      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "1.75rem",
                  sm: "2.125rem",
                },
              }}
            >
              My Profile
            </Typography>

            <Typography color="text.secondary">
              View and manage your account information.
            </Typography>
          </Box>

          {!editMode && (
            <Button
              variant="contained"
              startIcon={<EditOutlined />}
              onClick={handleEdit}
              sx={{
                alignSelf: {
                  xs: "stretch",
                  sm: "auto",
                },
              }}
            >
              Edit Profile
            </Button>
          )}
        </Stack>

        {success && <Alert severity="success">{success}</Alert>}

        {error && <Alert severity="error">{error}</Alert>}

        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                sm: 4,
              },
            }}
          >
            <Stack spacing={4}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={3}
                sx={{
                  alignItems: {
                    xs: "center",
                    sm: "flex-start",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 96,
                    height: 96,
                    fontSize: "2rem",
                    fontWeight: 700,
                  }}
                >
                  {initials}
                </Avatar>

                <Stack
                  spacing={1}
                  sx={{
                    alignItems: {
                      xs: "center",
                      sm: "flex-start",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      textAlign: {
                        xs: "center",
                        sm: "left",
                      },
                    }}
                  >
                    {user.full_name}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      wordBreak: "break-word",
                      textAlign: {
                        xs: "center",
                        sm: "left",
                      },
                    }}
                  >
                    {user.email}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      flexWrap: "wrap",
                      justifyContent: {
                        xs: "center",
                        sm: "flex-start",
                      },
                    }}
                  >
                    <Chip
                      label={user.role}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    />

                    <Chip
                      label={user.is_active ? "Active" : "Inactive"}
                      size="small"
                      color={user.is_active ? "success" : "default"}
                    />
                  </Stack>
                </Stack>
              </Stack>

              <Divider />

              <Stack component="form" onSubmit={handleSave} spacing={3}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Personal Information
                </Typography>

                <Stack
                  direction={{
                    xs: "column",
                    md: "row",
                  }}
                  spacing={2}
                >
                  <TextField
                    label="Full Name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    disabled={!editMode || isSaving}
                    fullWidth
                    required
                    slotProps={{
                      htmlInput: {
                        minLength: 2,
                        maxLength: 100,
                      },
                      input: {
                        startAdornment: (
                          <PersonOutlined
                            sx={{
                              mr: 1,
                              color: "text.secondary",
                            }}
                          />
                        ),
                      },
                    }}
                  />

                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={!editMode || isSaving}
                    fullWidth
                    required
                    slotProps={{
                      input: {
                        startAdornment: (
                          <EmailOutlined
                            sx={{
                              mr: 1,
                              color: "text.secondary",
                            }}
                          />
                        ),
                      },
                    }}
                  />
                </Stack>

                <TextField
                  label="Role"
                  value={user.role}
                  disabled
                  fullWidth
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      md: "50%",
                    },
                  }}
                />

                {editMode && (
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={2}
                    sx={{
                      pt: 1,
                      alignItems: {
                        xs: "stretch",
                        sm: "center",
                      },
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveOutlined />}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                sm: 4,
              },
            }}
          >
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                }}
              >
                <SecurityOutlined color="primary" />

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Security
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Manage your account password.
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant="outlined"
                onClick={() => navigate("/change-password")}
                sx={{
                  alignSelf: {
                    xs: "stretch",
                    sm: "flex-start",
                  },
                }}
              >
                Change Password
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
