import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string({
    required_error: "Username é obrigatório",
    invalid_type_error: "Username deve ser preenchido",
  }),
  password: z.string({
    required_error: "Senha é obrigatória",
    invalid_type_error: "Senha deve ser preenchida",
  }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
