
import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  fullScreen?: boolean;
  size?: number;
}

const Loader = ({
  fullScreen = false,
  size = 40,
}: LoaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: fullScreen ? "100vh" : 200,
        p: 3,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loader;
