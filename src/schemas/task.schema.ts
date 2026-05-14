import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(2, "O título não pode ser vazio.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres.")
    .optional()
    .nullable(),
  status: z.string().default("Pendente"),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "O título não pode ser vazio.")
    .max(100, "O título deve ter no máximo 100 caracteres.")
    .optional(),
  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres.")
    .optional()
    .nullable(),
  status: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
