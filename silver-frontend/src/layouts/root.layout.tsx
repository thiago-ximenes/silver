import { Box, Button, Typography } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { useAuth } from "../hooks/use-auth.tsx";

export function RootLayout() {
  const auth = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      minHeight="100vh"
      maxWidth="lg"
      mx="auto"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        py={2}
        position="sticky"
        top="24px"
        zIndex={1100}
      >
        <Box position="absolute">
          <Typography
            variant="h3"
            variantMapping={{
              h3: "h1",
            }}
            textAlign="center"
          >
            SILVER
          </Typography>
        </Box>
        {auth.isAuthenticated && (
          <Box
            position="absolute"
            right={16}
            display="flex"
            gap={1}
            flexDirection="column"
          >
            <Button onClick={auth.logout}>Logout</Button>
          </Box>
        )}
      </Box>
      <Box display="flex" width="100%" flexGrow={1} pt={8} pb={4} px={2}>
        <Outlet />
      </Box>
    </Box>
  );
}
