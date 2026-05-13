import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Insira um e-mail válido.")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório.").max(50, "O nome deve ter no máximo 50 caracteres."),
  email: z
    .string()
    .email("Insira um e-mail válido.")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
