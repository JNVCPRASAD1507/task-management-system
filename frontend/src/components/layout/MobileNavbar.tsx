
import {
  Menu,
  NotificationsNone,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MobileNavbarProps {
  onMenuClick: () => void;
}

const MobileNavbar = ({
  onMenuClick,
}: MobileNavbarProps) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        display: { xs: "flex", md: "none" },
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: 1.5,
        }}
      >
        <IconButton
          color="inherit"
          onClick={onMenuClick}
          edge="start"
          aria-label="open navigation"
        >
          <Menu />
        </IconButton>

        <Box
          onClick={() => navigate("/dashboard")}
          sx={{
            flexGrow: 1,
            ml: 1,
            cursor: "pointer",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: "1.05rem",
            }}
          >
            Task Manager
          </Typography>
        </Box>

        <IconButton
          color="inherit"
          onClick={() => navigate("/notifications")}
          aria-label="notifications"
        >
          <Badge color="error" variant="dot">
            <NotificationsNone />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MobileNavbar;