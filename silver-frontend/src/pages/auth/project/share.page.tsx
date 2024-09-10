import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useController, useForm } from "react-hook-form";
import {
  shareProjectFormSchema,
  ShareProjectFormSchema,
} from "../../../schema/form/share-project.form.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationShareProject } from "../../../hooks/graphql/mutations/use-mutation-share-project.tsx";
import { Route } from "../../../routes/_layout/_auth/project/$projectId/share.tsx";
import { useRouter } from "@tanstack/react-router";

export function SharePage() {
  const data = Route.useLoaderData<{
    roles: Array<{ id: number; name: string }>;
    users: Array<{ id: number; username: string }>;
    project: { title: string };
  }>();

  const router = useRouter();

  const form = useForm<ShareProjectFormSchema>({
    resolver: zodResolver(shareProjectFormSchema),
  });

  const roleId = useController({
    name: "roleId",
    control: form.control,
  });

  const userId = useController({
    name: "userId",
    control: form.control,
  });

  const shareProject = useMutationShareProject();

  const onSubmit = form.handleSubmit(async (data) => {
    await shareProject(data.roleId, data.userId);
  });

  return (
    <Box display="flex" gap={2} width="100%" flexDirection="column">
      <Typography variant="h4" component="h1" textAlign="center">
        Compartilhar projeto {data.project.title}
      </Typography>
      <Grid container spacing={2} component="form" onSubmit={onSubmit}>
        <Grid item xs={12} md={5}>
          <TextField
            select
            label="Roles"
            fullWidth
            {...roleId.field}
            error={!!roleId.fieldState.error}
            helperText={roleId.fieldState.error?.message}
          >
            {data.roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            select
            label="Users"
            fullWidth
            {...userId.field}
            error={!!userId.fieldState.error}
            helperText={userId.fieldState.error?.message}
          >
            {data.users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button type="submit" color="success">
            Compartilhar
          </Button>
        </Grid>
      </Grid>
      <Button
        onClick={() => router!.history.back()}
        sx={{
          mt: "auto",
          mx: "auto",
          width: "fit-content",
        }}
      >
        Voltar
      </Button>
    </Box>
  );
}
