import { z } from "zod";

export const createTaskFormSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(30, "Título deve ter no máximo 30 caracteres"),
  description: z
    .union([
      z
        .string()
        .min(3, "Descrição deve ter no mínimo 3 caracteres")
        .max(255, "Descrição deve ter no máximo 255 caracteres")
        .nullable(),
      z.literal(""),
    ])
    .transform((value) => (value === "" ? undefined : value)),
  dueDate: z
    .date({
      invalid_type_error: "Data inválida",
    })
    .optional(),
});

export type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;
