# 🌐 WORKSPACE - ToDoList Fullstack

## 📖 Visão Geral
Este projeto é um desafio técnico de um ToDoList de alta performance, focado em demonstrar o domínio da stack Next.js moderna com App Router e Server Actions.

## 🛠️ Stack Tecnológica
- **Framework:** Next.js 15+ (App Router)
- **Runtime & Tests:** Bun
- **Banco de Dados:** PostgreSQL (Neon.tech)
- **ORM:** Prisma
- **Autenticação:** NextAuth.js (Auth.js)
- **Estilização:** TailwindCSS
- **Validação:** Zod

## 🏗️ Arquitetura e Padrões
- **Monólito Funcional:** Frontend e Backend unificados no Next.js.
- **Server Actions:** Estratégia principal para mutações de dados (CRUD).
- **JWT Strategy:** Sessões sem estado (stateless) para máxima performance e escalabilidade.
- **Module Augmentation:** Sessão do NextAuth estendida para incluir `id` do usuário nativamente.
- **Strict TS:** Nível 3 de rigor no TypeScript.

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
- **2024-05-12 - Status String:** Alteração do campo `completed` (boolean) para `status` (string) para permitir maior flexibilidade nos estados da tarefa (ex: Pendente, Concluído) conforme requisitos do desafio.

## Progress Log
<!-- LOG_START -->
- **2026-05-12:** Conclusão da Issue #3 (CRUD). Endpoints de tarefas implementados com isolamento de usuário e schemas modulares.
- **2026-05-12:** Conclusão da Issue #1 (Auth). NextAuth + JWT + Prisma integrados.
- **2026-05-12:** Conclusão da Issue #2 (Security). Middleware configurado para proteção global de rotas e redirecionamento para login.
<!-- LOG_END -->
