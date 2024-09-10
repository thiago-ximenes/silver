import { z } from "zod";

export const shareProjectFormSchema = z.object({
  roleId: z.number({
    invalid_type_error: "Role é obrigatório",
    required_error: "Role é obrigatório",
  }),
  userId: z.number({
    invalid_type_error: "User é obrigaório",
    required_error: "User é obrigatório",
  }),
});

export type ShareProjectFormSchema = z.infer<typeof shareProjectFormSchema>;
