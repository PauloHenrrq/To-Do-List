import { describe, it, expect } from "bun:test";
import { loginSchema, registerSchema, createTaskSchema, updateTaskSchema } from "@/schemas";

describe("Unit Tests: Zod Schemas", () => {
  describe("Login Schema", () => {
    it("deve validar um login correto", () => {
      const data = { email: "test@example.com", password: "password123" };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("deve falhar com email inválido", () => {
      const data = { email: "not-an-email", password: "password123" };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("deve falhar com senha curta", () => {
      const data = { email: "test@example.com", password: "123" };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("Register Schema", () => {
    it("deve validar um registro correto", () => {
      const data = { name: "Test User", email: "test@example.com", password: "password123" };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("deve falhar se o nome for vazio", () => {
      const data = { name: "", email: "test@example.com", password: "password123" };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("Task Schemas", () => {
    it("deve validar criação de tarefa correta", () => {
      const data = { title: "Minha Tarefa", description: "Descrição opcional" };
      const result = createTaskSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("deve falhar se o título da tarefa for vazio", () => {
      const data = { title: "", description: "" };
      const result = createTaskSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("deve validar atualização parcial de tarefa", () => {
      const data = { status: "Concluído" };
      const result = updateTaskSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
