# 🌐 WORKSPACE - ToDoList Fullstack

## 📖 Visão Geral
Este projeto é um desafio técnico de um ToDoList de alta performance, focado em demonstrar o domínio da stack Next.js moderna com App Router e Server Actions.

## 🛠️ Stack Tecnológica
- **Framework:** Next.js 15+ (App Router)
- **Runtime & Tests:** Bun
- **Banco de Dados:** PostgreSQL (Neon.tech)
- **ORM:** Prisma
- **Autenticação:** NextAuth.js
- **Estilização:** TailwindCSS
- **Validação:** Zod

## 🏗️ Arquitetura e Padrões
- **Monólito Funcional:** Frontend e Backend unificados no Next.js.
- **Server Actions:** Preferência para manipulação de dados sobre API Routes.
- **Validation Layer:** Uso extensivo de Zod para segurança de tipos e dados.
- **Progressive Typing:** Nível 3 - Strict TS (conforme perfil avançado).
- **Clean Code:** Aplicação de princípios SOLID na camada de Server Actions e Serviços.

## 📍 True North (Onde começar)
1. O fluxo de desenvolvimento está mapeado em [task.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/task.md).
2. A configuração inicial deve focar na unificação do projeto na raiz.
3. O arquivo central de configuração de dados será `prisma/schema.prisma`.

## 📜 Histórico de Decisões
- **2024-05-12:** Decisão de unificar `backend` e `frontend` em um único projeto Next.js para reduzir complexidade e melhorar DX.
- **2024-05-12:** Escolha do Neon como provedor de banco de dados para compatibilidade total com Prisma + Serverless.
