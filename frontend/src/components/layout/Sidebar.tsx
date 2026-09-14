import {
  Dashboard,
  Group,
  ListAlt,
  Notifications,
  Person,
  AddTask,
  Close,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import type { UserRole } from "../../types/auth.types";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

const DRAWER_WIDTH = 250;

const Sidebar = ({ mobileOpen, onMobileClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  let userRole: UserRole | null = null;

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      userRole = parsedUser.role ?? null;
    } catch {
      userRole = null;
    }
  }

  const navigationItems: NavigationItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard />,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: <ListAlt />,
    },
    {
      label: "Create Task",
      path: "/tasks/create",
      icon: <AddTask />,
      roles: ["admin", "manager"],
    },
    {
      label: "Users",
      path: "/users",
      icon: <Group />,
      roles: ["admin"],
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: <Notifications />,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <Person />,
    },
  ];

  const visibleItems = navigationItems.filter((item) => {
    if (!item.roles) return true;

    return userRole ? item.roles.includes(userRole) : false;
  });

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onMobileClose();
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Mobile drawer header */}
      <Box
        sx={{
          height: 68,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            Task Manager
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Navigation
          </Typography>
        </Box>

        <IconButton
          onClick={onMobileClose}
          sx={{ display: { md: "none" } }}
          aria-label="close navigation"
        >
          <Close />
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{
            px: 2.5,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Main Menu
        </Typography>

        <List sx={{ px: 1.25, mt: 1 }}>
          {visibleItems.map((item) => {
            const active = isActive(item.path);

            return (
              <ListItemButton
                key={item.path}
                selected={active}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 46,
                  mb: 0.5,
                  borderRadius: 2,
                  color: active ? "primary.main" : "text.secondary",
                  "& .MuiListItemIcon-root": {
                    color: active ? "primary.main" : "text.secondary",
                    minWidth: 42,
                  },
                  "&.Mui-selected": {
                    backgroundColor: "primary.50",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "primary.100",
                  },
                }}
              >
                <ListItemIcon>
                  <Tooltip title={item.label} placement="right">
                    <Box sx={{ display: "flex" }}>{item.icon}</Box>
                  </Tooltip>
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: active ? 700 : 500,
                        fontSize: "0.94rem",
                      },
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          flexShrink: 0,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center" }}
        >
          Task Management System
        </Typography>

        <Typography
          variant="caption"
          color="text.disabled"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 0.25,
          }}
        >
          v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            pt: "68px",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: { xs: "82vw", sm: DRAWER_WIDTH },
            maxWidth: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
