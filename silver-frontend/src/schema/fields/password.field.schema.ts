import { z } from "zod";

export const passwordFieldSchema = z
  .string({
    required_error: "Password é obrigatório",
    invalid_type_error: "Password precisa ser preenchido",
  })
  .min(8, "Password precisa ter no mínimo 8 caracteres")
  .max(30, "Password precisa ter no máximo 30 caracteres");
