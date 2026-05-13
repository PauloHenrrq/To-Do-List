# 📝 LOGS - ToDoList

## [2026-05-13] - Conclusão do Backend e Readiness para Frontend
- **Status:** 100% Concluído.
- **Ações:** Implementação de endpoints finais, filtros e validação estrita.
- **Entregas:**
    - GET `/api/tasks/[id]` para busca específica por ID.
    - Filtros por `status` implementados no GET de listagem.
    - Validação estrita de `status` obrigatório no POST.
    - Suíte de testes expandida e validada (17/17 tests pass).
- **Próximos Passos:** Inicialização do Frontend (Issue #5).


## [2026-05-12] - Sincronização de Schema e Refinamento de Status
- **Status:** Concluído.
- **Ação:** Atualização de 'completed' (boolean) para 'status' (string) e sincronização total.
- **Entregas:**
    - `prisma/schema.prisma` atualizado para `status String @default("Pendente")`.
    - `src/schemas/task.schema.ts` e rotas de API sincronizadas.
    - Suíte de testes atualizada para validar `status` (14/14 tests pass).

## [2026-05-12] - Conclusão da Issue #4 (Testes Automatizados)
- **Status:** Concluído.
- **Ações:**
    - Estabilização do ambiente de testes com Bun.
    - Implementação de mocks locais para `next-auth` e `prisma` para evitar erros de injeção em imports dinâmicos.
    - Criação de suíte de testes unitários para schemas Zod (100% pass).
    - Criação de suíte de testes de integração para API de tarefas (CRUD completo e autorização).
- **Resultado:** 14/14 testes passando. Backend validado e resiliente.
- **Aprendizado:** No Bun, mocks de módulos funcionam de forma mais confiável quando definidos diretamente no arquivo de teste antes dos imports dinâmicos da lógica de API.

## [2026-05-12] - Implementação de CRUD e Refatoração SOLID (Issue #3)
- **Status:** Concluído.
- **Ação:** Finalização da lógica de backend para tarefas e modularização de Schemas.
- **Entregas:**
    - Estrutura modular em `src/schemas/` (SRP aplicada a validações).
    - Endpoints `GET`, `POST`, `PATCH` e `DELETE` em `/api/tasks` e `/api/tasks/[id]`.
    - Isolamento de dados garantido via `session.user.id` e `getServerSession`.
    - Validação robusta de payloads com Zod em todas as rotas.
    - Limpeza de arquivos legados (`src/lib/zod.ts`).

## [2026-05-12] - Autenticação e Segurança (Issues #1 e #2)
- **Status:** Concluído.
- **Ação:** Implementação do fluxo completo de autenticação e o "Gatekeeper" de rotas.
- **Entregas:**
    - Configuração do `authOptions` em `src/lib/auth.ts` (JWT Strategy + Credentials Provider).
    - Implementação do Route Handler em `app/api/auth/[...nextauth]/route.ts`.
    - Middleware configurado para proteção global e redirecionamento para `/login`.
    - Extensão dos tipos da sessão (Module Augmentation) para incluir `userId`.

## [2026-05-12] - Refinamento de Infraestrutura (Fase 2)
- **Status:** Concluído.
- **Ação:** Ajustes técnicos para garantir estabilidade e performance.
- **Entregas:**
    - Substituição do `bcrypt` por `bcryptjs` (melhor suporte em ambientes serverless/Vercel).
    - Criação do Singleton do Prisma em `src/lib/prisma.ts` para evitar excesso de conexões.
    - Centralização dos Schemas de validação no `src/lib/zod.ts`.

## [2026-05-12] - Unificação e Setup de Banco de Dados
- **Status:** Concluído.
- **Ação:** Configuração da estrutura unificada do projeto e persistência.
- **Entregas:**
    - Inicialização do Next.js unificado na raiz.
    - Modelagem do `schema.prisma` simplificada para `User` e `Task`.
    - Execução da migração inicial no Neon (PostgreSQL).

## [2026-05-12] - Planejamento e Pivot Arquitetural
- **Status:** Concluído.
- **Ação:** Decisão de migrar para Monólito Next.js e uso de JWT para sessões.
- **Entregas:**
    - Criação do [task.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/task.md) e [WORKSPACE.md](file:///c:/Users/paulo/workspace/projetos/ToDoList/WORKSPACE.md).
    - Escolha estratégica do Bun como runtime e gerenciador de pacotes.
