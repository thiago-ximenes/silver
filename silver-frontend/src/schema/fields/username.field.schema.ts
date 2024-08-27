import { z } from "zod";

export const usernameFieldSchema = z
  .string({
    required_error: "Username é obrigatório",
    invalid_type_error: "Username precisa ser preenchido",
  })
  .min(3, "Username precisa ter no mínimo 3 caracteres")
  .max(30, "Username precisa ter no máximo 30 caracteres");
