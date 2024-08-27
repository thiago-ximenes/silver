import { z } from "zod";
import { usernameFieldSchema } from "../fields/username.field.schema.ts";
import { passwordFieldSchema } from "../fields/password.field.schema.ts";

export const createUserFormSchema = z
  .object({
    username: usernameFieldSchema,
    password: passwordFieldSchema,
    confirmPassword: z.string({
      required_error: "Confirmar senha é obrigatório",
      invalid_type_error: "Confirmar senha precisa ser preenchido",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não são iguais",
  });

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;
