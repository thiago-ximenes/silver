import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "@tanstack/react-router";
import MLink from "@mui/material/Link";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginFormSchema,
  loginFormSchema,
} from "../../schema/form/login.form.schema.ts";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../hooks/use-auth.tsx";
import { Route } from "../../routes/_layout/_guest/login.lazy.tsx";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(password: $password, username: $username) {
      token
    }
  }
`;

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();

  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = Route.useNavigate();

  const search = Route.useSearch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate({ to: search.redirect || "/dashboard" });
    }
  }, [auth.isAuthenticated, navigate, search.redirect]);

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      auth.login(data.login.token);
      await router.invalidate();
    },
    onError: () => {
      form.setError("username", {
        type: "manual",
        message: "Usuário ou senha inválidos",
      });
      form.setError("password", {
        type: "manual",
        message: "Usuário ou senha inválidos",
      });
    },
    context: {
      headers: {
        "x-apollo-tracing": "1",
      },
    },
    fetchPolicy: "no-cache",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await login({
      variables: {
        username: data.username,
        password: data.password,
      },
    });
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      my="auto"
      p={3}
    >
      <Box
        width="100%"
        maxWidth="400px"
        p={3}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={2}
      >
        <Typography
          variant="h4"
          variantMapping={{
            h4: "h2",
          }}
        >
          Entre com sua conta
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          display="flex"
          gap={1}
          flexDirection="column"
          onSubmit={onSubmit}
        >
          <TextField
            label="Username"
            fullWidth
            {...form.register("username")}
            error={!!form.formState.errors.username}
            helperText={form.formState.errors.username?.message}
          />
          <TextField
            label="Senha"
            fullWidth
            {...form.register("password")}
            error={!!form.formState.errors.password}
            helperText={form.formState.errors.password?.message}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" disabled={loading} variant="contained">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
            }}
          >
            <MLink component="span" underline="hover">
              Registre-se
            </MLink>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
