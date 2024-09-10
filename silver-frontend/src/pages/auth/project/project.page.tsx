import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Route } from "../../../routes/_layout/_auth/project/$projectId";
import { TaskForm } from "../../../components/task.form.tsx";
import { useMutationCreateTask } from "../../../hooks/graphql/mutations/use-mutation-create-task.tsx";
import { useController, useForm } from "react-hook-form";
import {
  createTaskFormSchema,
  CreateTaskFormValues,
} from "../../../schema/form/create-task.form.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "@tanstack/react-router";

export function ProjectPage() {
  const data = Route.useLoaderData<{
    data: {
      project: {
        title: string;
        tasks: Array<{
          id: number;
          title: string;
          description: string;
          done: boolean;
          dueDate: string;
        }>;
      };
    };
  }>();

  const router = useRouter();

  const params = Route.useParams();

  const createTask = useMutationCreateTask();

  const form = useForm<CreateTaskFormValues>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(createTaskFormSchema),
  });

  const dueDate = useController({
    name: "dueDate",
    control: form.control,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createTask(Number(params.projectId), data);
    router?.invalidate();
    form.reset();
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        alignItems="center"
      >
        <Box display="flex" gap={2} flexDirection="row">
          <Typography
            variant="h4"
            variantMapping={{
              h4: "h2",
            }}
          >
            {data.data.project.title}
          </Typography>
          <Link
            to="/project/$projectId/share"
            params={{
              projectId: params.projectId,
            }}
          >
            <Button component="span">Compartilhar</Button>
          </Link>
        </Box>
        {data.data.project.tasks.map((task) => (
          <TaskForm task={task} key={task.id} />
        ))}
        <Grid
          component="form"
          onSubmit={onSubmit}
          container
          spacing={2}
          justifyContent="start"
        >
          <Grid item xs={12} md={3}>
            <TextField
              variant="standard"
              label="Título"
              {...form.register("title")}
              error={!!form.formState.errors.title}
              helperText={form.formState.errors.title?.message}
              multiline
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="standard"
              label="Descrição"
              {...form.register("description")}
              multiline
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              disableHighlightToday
              slotProps={{
                textField: {
                  label: "Data final",
                  variant: "standard",
                },
              }}
              value={dueDate.field.value}
              onChange={dueDate.field.onChange}
            />
          </Grid>
          <Grid item alignSelf="center" justifySelf="center" xs={12} md={3}>
            <Button type="submit" color="success">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Button onClick={() => router!.history.back()}>Voltar</Button>
    </Box>
  );
}
