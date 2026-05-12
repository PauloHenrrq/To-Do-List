# 📝 LOGS - ToDoList

### [2026-05-12] - Fase 2: Início da Validação e Ajustes de Segurança
- **Segurança:** Substituição do `bcrypt` por `bcryptjs` para garantir compatibilidade máxima com o runtime do Next.js e ambientes serverless.
- **Estrutura:** Criado `src/lib/prisma.ts` para gerenciar a instância única do Prisma Client.
- **Validação:** Iniciada a centralização de regras de negócio no `src/lib/zod.ts`.
- **Status:** Infraestrutura pronta, iniciando lógica de autenticação.
- **Entregas:**
    - Definição da stack (Next.js, Prisma, Neon, NextAuth, Zod, Bun).
    - Criação do [task.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/task.md) e [WORKSPACE.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/WORKSPACE.md).

## [2026-05-12] - Inicialização e Remodelação
- **Status:** Planejamento Concluído / Início da Execução.
- **Ação:** Decisão técnica de remodelar o projeto do zero para uma estrutura unificada (Monólito Next.js).
- **Entregas:**
    - Definição da stack (Next.js, Prisma, Neon, NextAuth, Zod, Bun).
    - Criação do [task.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/task.md) e [WORKSPACE.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/WORKSPACE.md).

## [2026-05-12] - Unificação e Setup de Infra
- **Status:** Concluído.
- **Ação:** Configuração da raiz do projeto, instalação de dependências e banco de dados.
- **Entregas:**
    - `.gitignore` atualizado para estrutura unificada.
    - Instalação do Prisma 7 e dependências via Bun.
    - Modelagem completa do `schema.prisma` (NextAuth + Tasks).
    - Migration inicial aplicada com sucesso no Neon.
- **Próximo Passo:** Iniciar a Fase 2: Configuração do NextAuth.js e Schemas de Validação Zod.

## [2026-05-12] - Pivot Arquitetural: JWT Strategy
- **Status:** Em Andamento.
- **Ação:** Simplificação do Schema do Prisma e decisão pelo uso de sessões JWT no NextAuth.
- **Entregas:**
    - Schema do Prisma reduzido para apenas `User` e `Task`.
    - Migração para remoção das tabelas de suporte do NextAuth.
    - Decisão de utilizar `CredentialsProvider` com hashing de senha manual.
- **Próximo Passo:** Configurar `auth.ts` e implementar o hash de senha com `bcryptjs`.
- **Próximo Passo:** O usuário irá realizar o setup inicial do Next.js na raiz do projeto.
