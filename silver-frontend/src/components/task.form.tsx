import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useController, useForm } from "react-hook-form";
import { useMutationDeleteTask } from "../hooks/graphql/mutations/use-mutation-delete-task.tsx";
import { useMutationUpdateTask } from "../hooks/graphql/mutations/use-mutation-update-task.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateTaskFormSchema,
  UpdateTaskFormValues,
} from "../schema/form/update-task.form.schema.ts";

type TaskFormProps = {
  task: {
    id: number;
    title: string;
    description: string;
    dueDate?: string;
    done?: boolean;
  };
};

export function TaskForm(props: TaskFormProps) {
  const form = useForm<UpdateTaskFormValues>({
    defaultValues: {
      ...props.task,
      dueDate: props.task.dueDate ? new Date(props.task.dueDate) : undefined,
    },
    resolver: zodResolver(updateTaskFormSchema),
  });

  const dueDate = useController({
    name: "dueDate",
    control: form.control,
  });

  const deleteTask = useMutationDeleteTask();

  const updateTask = useMutationUpdateTask();

  const onSubmit = form.handleSubmit(async (data) => {
    await updateTask(props.task.id, data);
  });

  const done = useController({
    name: "done",
    control: form.control,
  });

  return (
    <Grid
      component="form"
      container
      spacing={2}
      justifyContent="start"
      onSubmit={onSubmit}
    >
      <Grid item xs={12} md={3}>
        <TextField
          variant="standard"
          label="Título"
          {...form.register("title")}
          multiline
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          variant="standard"
          label="Descrição"
          {...form.register("description")}
          multiline
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <DatePicker
          disableHighlightToday
          slotProps={{
            textField: {
              label: "Data final",
              variant: "standard",
              fullWidth: true,
            },
            field: {
              clearable: true,
              onClear: () => dueDate.field.onChange(""),
            },
          }}
          value={dueDate.field.value}
          onChange={dueDate.field.onChange}
        />
      </Grid>
      <Grid item xs={12} md={2} alignSelf="end" justifySelf="end">
        <FormControlLabel
          control={<Checkbox color="success" />}
          label="Concluído"
          labelPlacement="start"
          checked={done.field.value}
          {...done.field}
        />
      </Grid>
      <Grid item xs={6} md={1}>
        <Button type="submit">Salvar</Button>
      </Grid>
      <Grid item xs={6} md={1}>
        <Button color="error" onClick={() => deleteTask(props.task.id)}>
          Excluir
        </Button>
      </Grid>
    </Grid>
  );
}
