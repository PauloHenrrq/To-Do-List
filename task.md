# 🏗️ ToDoList - Fullstack Remodel (Next.js + Prisma + Neon)

## 🎯 Objetivo

Criar um ToDoList de alta performance, pronto para produção, utilizando a stack moderna de Next.js com foco em segurança, testes e escalabilidade.

## 🛠️ Stack Técnica Definida

- **Core:** Next.js (App Router)
- **Estilização:** TailwindCSS
- **Banco de Dados:** PostgreSQL (via Neon.tech)
- **ORM:** Prisma
- **Autenticação:** NextAuth.js (Auth.js)
- **Validação:** Zod
- **Testes:** Bun Test Runner
- **Gerenciamento de Pacotes:** Bun

---

## 📋 Backlog de Execução (Tasks)

### 1. 🏗️ Fundação e Infraestrutura

- [x] Inicializar novo projeto Next.js unificado na raiz (`bun create next-app .`)
- [x] Configurar `.env` com a URL de conexão do Neon
- [x] Instalar dependências base (Next.js, Tailwind, Prisma, Bun)
- [x] Inicializar Prisma (`bunx prisma init`)
- [x] Definir Modelagem no `schema.prisma` (User, Task, NextAuth models)
- [x] Executar primeira migração (`bunx prisma migrate dev`)

### 2. 🔐 Backend & Segurança (API REST First)

- [x] Configuração inicial do Prisma e Neon.
- [/] Definição de Schemas de validação com Zod.
- [ ] Implementação do NextAuth (AuthOptions e Route Handler).
- [ ] Criação de Middleware de proteção de rotas.
- [ ] Implementação dos Handlers de API (CRUD Tasks).
- [ ] Criar API Route Handlers (`app/api/tasks/route.ts`):
  - [ ] `POST`: Criar tarefa (Validação Zod + Auth)
  - [ ] `GET`: Listar todas as tarefas do usuário (com Filtros)
- [ ] Criar API Route Handlers Específicos (`app/api/tasks/[id]/route.ts`):
  - [ ] `GET`: Buscar tarefa por ID
  - [ ] `PATCH`: Atualizar tarefa (título/descrição/status)
  - [ ] `DELETE`: Remover tarefa
- [ ] Configurar `middleware.ts` para proteger as rotas `/api/tasks/*`

### 3. 🎨 Frontend & Interface

- [ ] Configurar Layout base (Navbar com Perfil do Usuário e Logout)
- [ ] Implementar Dashboard de Tasks:
  - [ ] Listagem principal com estados de "Vazio"
  - [ ] Sidebar ou Header com Filtros (Todos, Pendentes, Concluídos)
- [ ] Criar Componentes de Formulário:
  - [ ] Modal ou Input rápido para criação
  - [ ] Feedback visual de erro/sucesso (Toasts)
- [ ] Implementar Otimismo na UI (Optimistic Updates) para melhor UX

### 4. 🧪 Qualidade e Documentação

- [ ] Configurar ambiente de testes no Bun
- [ ] Escrever testes unitários para as Server Actions (Business Logic)
- [ ] Escrever testes de integração para o fluxo de CRUD
- [ ] Documentar arquitetura do projeto no `README.md`
- [ ] Criar guia de endpoints/actions no `ARCH.md`

---

## 🚦 Critérios de Aceite

- [ ] CRUD 100% funcional com persistência no Neon.
- [ ] Autenticação robusta (usuário só vê suas próprias tasks).
- [ ] Validação de dados tanto no cliente quanto no servidor.
- [ ] Filtros de listagem funcionando sem recarregar a página (Client-side state ou Search Params).
- [ ] Cobertura de testes básica para as funções críticas.
