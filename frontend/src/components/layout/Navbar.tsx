import {
  AccountCircle,
  Logout,
  Menu,
  NotificationsNone,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login", { replace: true });
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, sm: 68 },
          px: { xs: 1.5, sm: 3 },
        }}
      >
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{
            display: { xs: "inline-flex", md: "none" },
            mr: 1,
          }}
          aria-label="open navigation menu"
        >
          <Menu />
        </IconButton>

        {/* Logo / Application name */}
        <Box
          onClick={() => navigate("/dashboard")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              fontWeight: 800,
              fontSize: "1rem",
            }}
          >
            TM
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Task Manager
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              Task Management System
            </Typography>
          </Box>
        </Box>

        {/* Right side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={() => navigate("/notifications")}
              aria-label="notifications"
            >
              <Badge color="error" variant="dot">
                <NotificationsNone />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={user?.full_name || "Account"}>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ ml: { xs: 0, sm: 0.5 } }}
              aria-label="account menu"
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  backgroundColor: "primary.main",
                }}
              >
                {getInitials(user?.full_name)}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Profile menu */}
      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {user?.full_name || "User"}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {user?.email || ""}
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem onClick={handleProfile}>
          <AccountCircle sx={{ mr: 1.5 }} />
          Profile
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1.5 }} />
          Logout
        </MenuItem>
      </MuiMenu>
    </AppBar>
  );
};

export default Navbar;