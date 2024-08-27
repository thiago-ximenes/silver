import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserFormSchema,
  createUserFormSchema,
} from "../schema/form/create-user.form.schema.ts";
import { Link } from "@tanstack/react-router";
import MLink from "@mui/material/Link";
import { toast } from "react-toastify";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(createUserInput: { password: $password, username: $username }) {
      id
      username
    }
  }
`;

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      toast.success("Usuário criado com sucesso");
    },
    onError: (error) => {
      if (error.message === "User already exists") {
        return toast.error("Usuário já existe");
      }

      toast.error("Erro ao criar usuário");
    },
  });

  const form = useForm<CreateUserFormSchema>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createUser({
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
          Faça seu cadastro
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
          <TextField
            label="Confirme sua senha"
            fullWidth
            {...form.register("confirmPassword")}
            error={!!form.formState.errors.confirmPassword}
            helperText={form.formState.errors.confirmPassword?.message}
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
            {loading ? "Carregando..." : "Cadastrar"}
          </Button>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
            }}
          >
            <MLink underline="hover">Já tem uma conta? Faça login</MLink>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
