import { z } from "zod";
import { createTaskFormSchema } from "./create-task.form.schema.ts";

export const updateTaskFormSchema = createTaskFormSchema.extend({
  done: z.boolean().optional(),
});

export type UpdateTaskFormValues = z.infer<typeof updateTaskFormSchema>;
