# 📝 To-Do List

Uma solução completa de gerenciamento de tarefas, focada em **SOLID**, **Clean Code** e **Performance**. Este repositório serve como um mapa de execução para um desafio técnico.

---

## 📋 Project Roadmap (Todo List)

Abaixo estão as especificações do projeto organizadas como uma lista de tarefas pendentes e concluídas.

### 🌐 Backend & Persistência
- [x] **Persistence Layer** — Implementação de persistência real utilizando **Neon (PostgreSQL)** e **Prisma ORM**.
- [x] **Endpoint POST** — Criação de tarefas (título, descrição opcional, status).
- [x] **Endpoint GET (List)** — Listagem de todas as tarefas cadastradas.
- [x] **Endpoint GET (Detail)** — Busca de uma tarefa específica por ID único.
- [x] **Endpoint PUT/PATCH** — Atualização flexível de dados e status da tarefa.
- [x] **Endpoint DELETE** — Remoção permanente de registros.

### 💻 Frontend & UX
- [x] **Task Board** — Tela principal para listagem dinâmica das tarefas vindas da API.
- [x] **Creation Suite** — Formulário intuitivo para adição de novas tarefas.
- [x] **Status Toggle** — Funcionalidade de marcar/desmarcar tarefas com **Optimistic UI**.
- [x] **Management Actions** — Opções integradas de edição e exclusão de tarefas.

### 🏆 Diferenciais (Quality Assurance)
- [x] **Data Validation** — Esquemas de validação robustos com **Zod**.
- [x] **Automated Testing** — Suíte de testes de integração e unitários via **Bun**.
- [x] **API Documentation** — Guia detalhado de consumo disponível no [API.md](API.md).
- [x] **Smart Filters** — Filtros avançados para organização por status e data.
- [x] **Authentication** — Fluxo de segurança completo com **NextAuth.js**.

---

## 🛠️ Stack Tecnológica

- **Core:** Next.js (App Router) + TypeScript
- **Database:** PostgreSQL (Neon) + Prisma
- **Auth:** NextAuth.js (Credentials & JWT)
- **UI:** Tailwind CSS + Lucide React
- **Validation:** Zod (Single Source of Truth)
- **Runtime/Tests:** Bun

---

## 📖 Documentação Técnica

Para detalhes de implementação, payloads de API e arquitetura, acesse:

> 🚀 **[Guia da API & Referência Técnica (API.md)](API.md)**
>
> 💡 **Dica:** Importe o arquivo [todo-list.postman_collection.json](todo-list.postman_collection.json) no seu Postman para testar os endpoints imediatamente.

---

## 📖 Documentação Adicional

Para detalhes técnicos profundos, consulte:
- [🏗️ **Arquitetura & Decisões**](WORKSPACE.md) — O "porquê" de cada escolha técnica.

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
