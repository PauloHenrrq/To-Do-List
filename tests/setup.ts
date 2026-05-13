import { mock } from "bun:test";

// --- Mock Global do Prisma ---
const mockPrisma = {
  user: { findUnique: mock(), create: mock() },
  task: { 
    findMany: mock(() => Promise.resolve([])), 
    create: mock(), 
    findUnique: mock(() => Promise.resolve(null)), 
    update: mock(), 
    delete: mock() 
  },
  $connect: async () => {},
  $disconnect: async () => {},
};

// Injeta no globalThis para que o singleton @/lib/prisma o capture
(globalThis as any).prisma = mockPrisma;

// Mock do módulo @prisma/client (caso algo importe diretamente)
mock.module("@prisma/client", () => ({
  PrismaClient: class {
    constructor() { return mockPrisma; }
  }
}));

// Mock do NextAuth
mock.module("next-auth", () => ({
  getServerSession: mock(() => Promise.resolve(null)),
}));

// Mock do caminho interno para garantir que o import @/lib/prisma retorne o mock
mock.module("@/lib/prisma", () => ({
  prisma: mockPrisma,
}));
