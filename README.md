# 🚀 ToDoList Premium - Fullstack Solution

Uma aplicação de gerenciamento de tarefas de alta performance, construída para demonstrar o domínio de arquitetura moderna, segurança e UX refinada.

---

## ✅ O que entregamos (Features Checklist)

- [x] **Autenticação de Ferro** — Login e Registro protegidos via NextAuth + JWT.
- [x] **Persistência Serverless** — Banco de Dados PostgreSQL (Neon) com Prisma ORM.
- [x] **CRUD Inteligente** — Título, descrição e status com salvamento automático.
- [x] **UX de Alta Performance** — Edição inline, atalhos de teclado (`Shift + Enter`) e estados otimistas.
- [x] **Filtros Dinâmicos** — Organize suas tarefas por status em tempo real.
- [x] **Design Mobile-First** — Interface premium e 100% responsiva com Tailwind CSS.
- [x] **Qualidade Garantida** — 100% de cobertura nos testes de integração e unitários via Bun.

---

## 🛠️ Stack Tecnológica

- **Core:** Next.js (App Router) + TypeScript
- **Database:** PostgreSQL (Neon) + Prisma
- **Auth:** NextAuth.js (Credentials & JWT)
- **UI:** Tailwind CSS + Lucide React
- **Validation:** Zod (Single Source of Truth)
- **Runtime/Tests:** Bun

---

## 📖 Documentação Adicional

Para detalhes técnicos profundos, consulte nossos guias especializados:

- [🔌 **Documentação da API**](API.md) — Endpoints, payloads e códigos de erro.
- [🏗️ **Arquitetura & Decisões**](WORKSPACE.md) — O "porquê" de cada escolha técnica.
- [📊 **Relatório de Testes**](RELATORIO_TESTES.md) — Resultados da última suíte de testes.
- [🛤️ **Roadmap de Execução**](task.md) — Histórico de tarefas concluídas.

---

## 🚀 Como Rodar o Projeto

1. **Clonar e Instalar:**
   ```bash
   git clone https://github.com/PauloHenrrq/To-Do-List.git
   cd To-Do-List
   bun install
   ```

2. **Variáveis de Ambiente:**
   Crie um `.env` com:
   ```env
   DATABASE_URL="sua_url_do_neon"
   NEXTAUTH_SECRET="seu_segredo_aleatorio"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Banco de Dados:**
   ```bash
   bunx prisma generate
   bunx prisma db push
   ```

4. **Decolar:**
   ```bash
   bun dev
   ```

---

Desenvolvido por **Paulo Henrique** — Foco em **SOLID**, **Clean Code** e **Performance**.