import { z } from "zod";
// Schema para Validação de Login
export const loginSchema = z.object({
  email: z
    .string()
    .email("Insira um e-mail válido.")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .max(50, "Senha muito longa."),
});

export type LoginInput = z.infer<typeof loginSchema>;