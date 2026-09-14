import {
  Box,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";

const DRAWER_WIDTH = 250;

const AppLayout = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md"),
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenuOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "background.default",
      }}
    >
      {/* Desktop / tablet navbar */}
      {!isMobile && <Navbar />}

      {/* Mobile navbar */}
      {isMobile && (
        <MobileNavbar
          onMenuClick={handleMobileMenuOpen}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileMenuClose}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "100%",
            md: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: 64,
              sm: 68,
            },
          }}
        />

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            px: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
              lg: 4,
            },
            py: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;