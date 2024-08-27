import { Box, Typography } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

export function RootLayout() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="100vh"
      flexDirection="column"
    >
      <Typography
        variant="h3"
        variantMapping={{
          h3: "h1",
        }}
        textAlign="center"
        mt={5}
      >
        SILVER
      </Typography>
      <Outlet />
    </Box>
  );
}
