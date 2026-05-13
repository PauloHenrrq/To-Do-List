import { describe, it, expect, mock } from "bun:test";

// Mocks locais para garantir isolamento total
mock.module("@prisma/client", () => ({
  PrismaClient: class {
    constructor() {
      return {
        task: { findMany: mock(), create: mock(), findUnique: mock(), update: mock(), delete: mock() },
        $connect: async () => {},
        $disconnect: async () => {},
      };
    }
  }
}));

mock.module("next-auth", () => ({
  getServerSession: mock(() => Promise.resolve(null)),
}));

const mockPrisma = {
  task: { 
    findMany: mock(() => Promise.resolve([])), 
    create: mock(), 
    findUnique: mock(() => Promise.resolve(null)), 
    update: mock(), 
    delete: mock() 
  },
};

mock.module("@/lib/prisma", () => ({
  prisma: mockPrisma,
}));

describe("Integration Tests: Tasks [ID] API", () => {
  it("deve atualizar uma tarefa existente (PATCH)", async () => {
    const { getServerSession } = await import("next-auth");
    const { PATCH } = await import("@/app/api/tasks/[id]/route");
    const { prisma } = await import("@/lib/prisma");

    const mockUserId = "user_123";
    const mockTaskId = "task_456";

    (getServerSession as any).mockResolvedValue({ user: { id: mockUserId } });
    
    // Simular que a tarefa pertence ao usuário
    (prisma.task.findUnique as any).mockResolvedValue({
      id: mockTaskId,
      userId: mockUserId,
      title: "Tarefa Antiga"
    });

    (prisma.task.update as any).mockResolvedValue({
      id: mockTaskId,
      title: "Tarefa Atualizada",
      status: "Concluído"
    });

    const req = new Request(`http://localhost/api/tasks/${mockTaskId}`, {
      method: "PATCH",
      body: JSON.stringify({ title: "Tarefa Atualizada", status: "Concluído" }),
    });

    const response = await PATCH(req, { params: Promise.resolve({ id: mockTaskId }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.title).toBe("Tarefa Atualizada");
    expect(data.status).toBe("Concluído");
  });

  it("deve retornar 404 ao tentar atualizar tarefa de outro usuário", async () => {
    const { getServerSession } = await import("next-auth");
    const { PATCH } = await import("@/app/api/tasks/[id]/route");
    const { prisma } = await import("@/lib/prisma");

    (getServerSession as any).mockResolvedValue({ user: { id: "user_A" } });
    
    // Simula que a busca filtrada por ID e UserID não encontrou nada
    (prisma.task.findUnique as any).mockResolvedValue(null);

    const req = new Request("http://localhost/api/tasks/task_456", {
      method: "PATCH",
      body: JSON.stringify({ title: "Hack" }),
    });

    const response = await PATCH(req, { params: Promise.resolve({ id: "task_456" }) });
    expect(response.status).toBe(404);
  });

  it("deve deletar uma tarefa existente (DELETE)", async () => {
    const { getServerSession } = await import("next-auth");
    const { DELETE } = await import("@/app/api/tasks/[id]/route");
    const { prisma } = await import("@/lib/prisma");

    const mockUserId = "user_123";
    const mockTaskId = "task_789";

    (getServerSession as any).mockResolvedValue({ user: { id: mockUserId } });
    
    (prisma.task.findUnique as any).mockResolvedValue({
      id: mockTaskId,
      userId: mockUserId
    });

    (prisma.task.delete as any).mockResolvedValue({ id: mockTaskId });

    const req = new Request(`http://localhost/api/tasks/${mockTaskId}`, {
      method: "DELETE",
    });

    const response = await DELETE(req, { params: Promise.resolve({ id: mockTaskId }) });
    
    expect(response.status).toBe(204);
  });
});
