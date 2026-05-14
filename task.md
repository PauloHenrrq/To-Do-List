# 🏗️ ToDoList - Fullstack Remodel (Next.js + Prisma + Neon)

## 🎯 Objetivo
Criar um ToDoList de alta performance, pronto para produção, utilizando a stack moderna de Next.js com foco em segurança, testes e escalabilidade.

## 📋 Backlog de Execução (Tasks)

### 1. 🏗️ Fundação e Infraestrutura
- [x] Inicializar novo projeto Next.js unificado na raiz.
- [x] Configurar `.env` com a URL de conexão do Neon e `NEXTAUTH_SECRET`.
- [x] Instalar dependências base (bcryptjs, zod, prisma, next-auth).
- [x] Configurar Prisma Singleton em `src/lib/prisma.ts`.
- [x] Definir Modelagem no `schema.prisma` (User e Task).
- [x] Executar primeira migração no Neon.

### 2. 🔐 Backend & Segurança (API REST First)
- [x] Implementar `authOptions` em `src/lib/auth.ts` (Credentials + JWT).
- [x] Configurar Route Handler em `app/api/auth/[...nextauth]/route.ts`.
- [x] Implementar Module Augmentation para tipar `session.user.id`.
- [x] Criar Middleware Gatekeeper em `src/middleware.ts`.
- [x] Criar API Route Handlers para CRUD de Tasks (`/api/tasks`):
  - [x] Modularização dos Schemas Zod (`src/schemas`).
  - [x] `POST`: Criar tarefa (com validação Zod e vínculo ao `userId`).
  - [x] `GET`: Listar tarefas apenas do usuário logado.
  - [x] `PATCH`: Atualizar status/conteúdo.
  - [x] `DELETE`: Remover tarefa.

### 3. 🎨 Frontend & Interface (UI Premium)
- [x] Criar Página de Login (`/login`) com suporte a Registro.
- [x] Implementar Server Actions para registro de novos usuários.
- [x] Configurar Layout base (Navbar responsiva com Perfil e Logout).
- [x] Implementar Dashboard de Tasks com Filtros e UX de Edição (Shift+Enter).

### 🧪 Qualidade e Documentação
- [x] Estruturar Workspace e Logs de decisão.
- [x] Configurar ambiente de testes no Bun.
- [x] Escrever testes de integração para as rotas de API (Tasks).
- [x] Criar Documentação da API (`API.md`).

---
**Status Atual:** Projeto finalizado e estabilizado. Pronto para o deploy final na Vercel.
