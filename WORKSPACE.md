# 🌐 WORKSPACE - ToDoList Fullstack

## 📖 Visão Geral

Este projeto é um desafio técnico de um ToDoList de alta performance, focado em demonstrar o domínio da stack Next.js moderna com App Router e Server Actions.

## 🛠️ Stack Tecnológica (Mirrored Stack)

- **Framework:** Next.js 16.2.6 (Experimental/Canary)
- **Runtime & Tests:** Bun 1.x / Vitest
- **Banco de Dados:** PostgreSQL (Neon.tech)
- **ORM:** Prisma 7.8.0 (TCP Direct Connection + ESM)
- **Autenticação:** NextAuth.js 4.24.14
- **Estilização:** TailwindCSS 4.0 (Beta)
- **Validação:** Zod 4.4.3

## 🏗️ Arquitetura e Padrões

- **Monólito Funcional:** Frontend e Backend unificados no Next.js.
- **Server Actions:** Estratégia principal para mutações de dados (CRUD).
- **JWT Strategy:** Sessões sem estado (stateless) para máxima performance e escalabilidade.
- **Module Augmentation:** Sessão do NextAuth estendida para incluir `id` do usuário nativamente.
- **Strict TS:** Nível 3 de rigor no TypeScript.
- **ESM Native:** Uso de `"type": "module"` no package.json.

## 📍 True North (Onde começar)

1. O fluxo de desenvolvimento detalhado está em [task.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/task.md).
2. Para entender as validações e schemas modulares, veja [src/schemas/](file:///c:/Users/paulo/workspace/projetos/ToDoList/src/schemas/index.ts).
3. A lógica do CRUD de tarefas isolada por usuário está em [src/app/api/tasks/route.ts](file:///c:/Users/paulo/workspace/projetos/ToDoList/src/app/api/tasks/route.ts).
4. A configuração de autenticação central está em [src/lib/auth.ts](file:///c:/Users/paulo/workspace/projetos/ToDoList/src/lib/auth.ts).

## 📜 Histórico de Decisões Técnicas

- **2024-05-12 - Schemas Modulares (SRP):** Migração do `zod.ts` único para a pasta `src/schemas/` para seguir o Princípio de Responsabilidade Única (SOLID), facilitando a expansão de validações.
- **2024-05-12 - Unificação:** Decisão de manter backend e frontend em um único repo para facilitar o deploy e o compartilhamento de tipos Zod.
- **2024-05-12 - Bcryptjs:** Escolha do `bcryptjs` em vez do `bcrypt` nativo para evitar problemas de compilação em ambientes serverless (Vercel/Neon).
- **2024-05-12 - JWT Strategy:** Optamos por JWT para evitar consultas constantes ao banco de dados apenas para validar sessões, melhorando a latência.
- **2024-05-12 - Prisma Singleton:** Implementação de padrão Singleton para o Prisma Client para evitar o erro "Too many clients" durante o Hot Reload em desenvolvimento.
- **2024-05-13 - Estabilização de Infra:** Downgrade crítico de Next.js 16/Prisma 7 para versões estáveis (N15/P6) devido a instabilidades de motor no Windows.
- **2024-05-13 - TCP Direct Connection:** Migração do Neon Driver Adapter para conexão TCP direta para garantir persistência sem crashes de WebSocket.
- **2024-05-13 - Mirrored Stack (Vanguard):** Decisão de retornar ao Next.js 16 e Prisma 7, espelhando a configuração funcional do projeto `/projetos/todo-list` e habilitando `"type": "module"`.

## Progress Log

<!-- LOG_START -->

- **2026-05-12:** Conclusão da Issue #3 (CRUD). Endpoints de tarefas implementados com isolamento de usuário e schemas modulares.
- **2026-05-12:** Conclusão da Issue #1 (Auth). NextAuth + JWT + Prisma integrados.
- **2026-05-12:** Conclusão da Issue #2 (Security). Middleware configurado para proteção global de rotas e redirecionamento para login.
- **2026-05-13:** Refatoração da `LoginPage` (SOLID/KISS). Implementação de Kit UI (`Input`, `Button`) e padronização de nomenclatura explícita.
<!-- LOG_END -->
