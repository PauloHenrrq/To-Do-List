import { mock } from "bun:test";

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

(globalThis as any).prisma = mockPrisma;

mock.module("@prisma/client", () => ({
  PrismaClient: class {
    constructor() { return mockPrisma; }
  }
}));

mock.module("next-auth", () => ({
  getServerSession: mock(() => Promise.resolve(null)),
}));

mock.module("@/lib/prisma", () => ({
  prisma: mockPrisma,
}));
