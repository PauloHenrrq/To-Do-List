# 📝 ToDoList Premium - Fullstack

Uma aplicação de gerenciamento de tarefas moderna, segura e de alta performance, construída com o ecossistema Next.js.

## 🚀 Tecnologias
- **Next.js 15+** (App Router)
- **Prisma & Neon** (PostgreSQL Serverless)
- **NextAuth.js** (Segurança e JWT)
- **Tailwind CSS** (UI Moderna)
- **Bun** (Runtime e Testes)

## 🏗️ Arquitetura
A aplicação segue o padrão de **Monólito Moderno**, onde o backend (API Routes e Server Actions) e o frontend coexistem, compartilhando validações via **Zod**. A autenticação é protegida por um **Middleware Gatekeeper**, garantindo que dados sensíveis nunca sejam expostos a usuários não autenticados.

## 🛠️ Como Iniciar
1. Instale as dependências:
   ```bash
   bun install
   ```
2. Configure o arquivo `.env` com sua `DATABASE_URL` do Neon.
3. Gere o cliente do Prisma:
   ```bash
   bunx prisma generate
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   bun dev
   ```

## 📍 Guia de Navegação (True North)
- **Tarefas Pendentes:** [task.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/task.md)
- **Diagramas e Fluxos:** [ARCH.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/ARCH.md)
- **Configurações Globais:** [WORKSPACE.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/WORKSPACE.md)

---
Desenvolvido com foco em **SOLID** e **Clean Code**.