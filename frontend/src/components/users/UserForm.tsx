
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

import type {
  User,
  UserCreate,
  UserRole,
  UserStatus,
  UserUpdate,
} from "../../types/user.types";

interface UserFormProps {
  initialValues?: Partial<User>;
  editMode?: boolean;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (
    values: UserCreate | UserUpdate,
  ) => void | Promise<void>;
}

const UserForm = ({
  initialValues,
  editMode = false,
  loading = false,
  submitLabel = "Save User",
  onSubmit,
}: UserFormProps) => {
  const [fullName, setFullName] =
    useState(
      initialValues?.full_name ?? "",
    );

  const [email, setEmail] = useState(
    initialValues?.email ?? "",
  );

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState<UserRole>(
      initialValues?.role ?? "member",
    );

  const [status, setStatus] =
    useState<UserStatus>(
      initialValues?.status ?? "active",
    );

  const [isActive, setIsActive] =
    useState(
      initialValues?.is_active ?? true,
    );

  useEffect(() => {
    setFullName(
      initialValues?.full_name ?? "",
    );

    setEmail(
      initialValues?.email ?? "",
    );

    setRole(
      initialValues?.role ?? "member",
    );

    setStatus(
      initialValues?.status ?? "active",
    );

    setIsActive(
      initialValues?.is_active ?? true,
    );
  }, [initialValues]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (editMode) {
      const payload: UserUpdate = {
        full_name: fullName.trim(),
        email: email.trim(),
        role,
        status,
        is_active: isActive,
      };

      await onSubmit(payload);
      return;
    }

    const payload: UserCreate = {
      full_name: fullName.trim(),
      email: email.trim(),
      password,
      role,
    };

    await onSubmit(payload);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2.5}
    >
      <TextField
        id="user-full-name"
        label="Full Name"
        value={fullName}
        onChange={(event) =>
          setFullName(event.target.value)
        }
        required
        fullWidth
        slotProps={{
          htmlInput: {
            minLength: 2,
            maxLength: 100,
          },
        }}
      />

      <TextField
        id="user-email"
        label="Email"
        type="email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
        required
        fullWidth
      />

      {!editMode && (
        <TextField
          id="user-password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value,
            )
          }
          required
          fullWidth
          slotProps={{
            htmlInput: {
              minLength: 8,
              maxLength: 128,
            },
          }}
        />
      )}

      <FormControl fullWidth>
        <InputLabel id="user-role-label">
          Role
        </InputLabel>

        <Select
          id="user-role"
          labelId="user-role-label"
          value={role}
          label="Role"
          onChange={(event) =>
            setRole(
              event.target.value as UserRole,
            )
          }
        >
          <MenuItem value="admin">
            Admin
          </MenuItem>

          <MenuItem value="manager">
            Manager
          </MenuItem>

          <MenuItem value="member">
            Member
          </MenuItem>
        </Select>
      </FormControl>

      {editMode && (
        <>
          <FormControl fullWidth>
            <InputLabel id="user-status-label">
              Status
            </InputLabel>

            <Select
              id="user-status"
              labelId="user-status-label"
              value={status}
              label="Status"
              onChange={(event) =>
                setStatus(
                  event.target.value as UserStatus,
                )
              }
            >
              <MenuItem value="active">
                Active
              </MenuItem>

              <MenuItem value="inactive">
                Inactive
              </MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={(event) =>
                  setIsActive(
                    event.target.checked,
                  )
                }
              />
            }
            label="Account Active"
          />
        </>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={
          loading ||
          !fullName.trim() ||
          !email.trim() ||
          (!editMode && !password)
        }
        sx={{
          alignSelf: {
            xs: "stretch",
            sm: "flex-start",
          },
        }}
      >
        {loading
          ? "Saving..."
          : submitLabel}
      </Button>
    </Stack>
  );
};

export default UserForm;

