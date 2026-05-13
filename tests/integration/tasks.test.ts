import { describe, it, expect, mock } from "bun:test";

// Mocks devem vir antes de qualquer importação de módulos que os utilizem
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

describe("Integration Tests: Tasks API", () => {
  it("deve retornar lista de tarefas quando autenticado", async () => {
    const { getServerSession } = await import("next-auth");
    const { GET } = await import("@/app/api/tasks/route");
    const { prisma } = await import("@/lib/prisma");

    (getServerSession as any).mockResolvedValue({ user: { id: "user_123" } });
    (prisma.task.findMany as any).mockResolvedValue([{ id: "1", title: "Task Teste" }]);

    const req = new Request("http://localhost/api/tasks");
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data[0].title).toBe("Task Teste");
  });

  it("deve criar uma nova tarefa com dados válidos", async () => {
    const { getServerSession } = await import("next-auth");
    const { POST } = await import("@/app/api/tasks/route");
    const { prisma } = await import("@/lib/prisma");

    (getServerSession as any).mockResolvedValue({ user: { id: "user_123" } });
    (prisma.task.create as any).mockImplementation((args: any) => 
      Promise.resolve({ id: "new_task", ...args.data })
    );

    const req = new Request("http://localhost/api/tasks", {
      method: "POST",
      body: JSON.stringify({ 
        title: "Nova Tarefa", 
        description: "Teste",
        status: "Pendente" 
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.title).toBe("Nova Tarefa");
  });

  it("deve retornar 401 se não houver sessão", async () => {
    const { getServerSession } = await import("next-auth");
    const { GET } = await import("@/app/api/tasks/route");

    (getServerSession as any).mockResolvedValue(null);

    const req = new Request("http://localhost/api/tasks");
    const response = await GET(req);
    expect(response.status).toBe(401);
  });

  it("deve retornar 200 se o usuário não possuir tarefas (lista vazia)", async () => {
    const { getServerSession } = await import("next-auth");
    const { GET } = await import("@/app/api/tasks/route");
    const { prisma } = await import("@/lib/prisma");

    (getServerSession as any).mockResolvedValue({ user: { id: "user_empty" } });
    (prisma.task.findMany as any).mockResolvedValue([]); // Simula lista vazia

    const req = new Request("http://localhost/api/tasks");
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  it("deve filtrar tarefas por status via query params", async () => {
    const { getServerSession } = await import("next-auth");
    const { GET } = await import("@/app/api/tasks/route");
    const { prisma } = await import("@/lib/prisma");

    (getServerSession as any).mockResolvedValue({ user: { id: "user_123" } });
    
    // Mock do findMany para ser chamado com o filtro correto
    (prisma.task.findMany as any).mockResolvedValue([{ id: "1", title: "Task Concluída", status: "Concluído" }]);

    const req = new Request("http://localhost/api/tasks?status=Concluído");
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data[0].status).toBe("Concluído");
    expect(prisma.task.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ status: "Concluído" })
    }));
  });
});
