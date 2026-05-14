# 🏗️ Arquitetura & Estrutura de Diretórios — To-Do List

Bem-vindo ao mapa técnico do projeto. Este documento detalha a organização do código, a responsabilidade de cada camada e a filosofia por trás da nossa arquitetura.

---

## 🗺️ Mapa Visual do Projeto

```text
📂 To-Do-List
├── 📂 prisma/                # Configurações de Banco de Dados
│   └── schema.prisma         # Definição do modelo de dados
├── 📂 src/                   # Núcleo da Aplicação (Core)
│   ├── 📂 app/               # Next.js App Router (Páginas e Rotas de API)
│   ├── 📂 components/        # Componentes React (UI e Lógica Visual)
│   ├── 📂 lib/               # Clientes de terceiros e utilitários globais
│   ├── 📂 schemas/           # Validações Zod e Tipagem de Contratos
│   ├── 📂 services/          # Camada de Regras de Negócio (Business Logic)
│   └── proxy.ts              # Proteção de rotas e segurança NextAuth
├── 📂 tests/                 # Suíte de Testes (Unitários e Integração)
├── 📝 .env                   # Variáveis de ambiente (Segredos)
├── 📝 bun.lock               # Lockfile do Bun (Performance)
├── 📝 package.json           # Manifesto de dependências e scripts
```

---

## 🔍 Detalhamento das Camadas

### 🚀 `src/app/` — O Esqueleto do Next.js
Aqui reside a estrutura de roteamento baseada em arquivos do App Router.
- **`layout.tsx`**: Define o template global (Navbar, Providers, etc.).
- **`page.tsx`**: A Home da aplicação, onde o dashboard de tarefas é montado.
- **`api/`**: Contém as **Route Handlers**. Elas atuam como nossa API REST interna.
- **`login/`**: Fluxo de autenticação.

### 🧩 `src/components/` — A Interface Humana
Dividido entre componentes de negócio e componentes de interface pura.
- **`TaskContainer.tsx`**: O cérebro da UI de tarefas. Gerencia o **Optimistic UI**.
- **`ui/`**: Componentes reutilizáveis e atômicos (Botões, Inputs) com design premium.
- **`TaskForm.tsx`** & **`TaskItem.tsx`**: Componentes específicos para manipulação de tarefas.

### ⚙️ `src/services/` — O Motor de Negócios
Esta é a camada mais importante para a escalabilidade.
- **Intuito**: Isolar a lógica de banco de dados (Prisma) da camada de visualização (Next.js).
- **Vantagem**: Se mudarmos a forma como salvamos os dados, mudamos apenas aqui, sem quebrar o front-end.

### 🛡️ `src/schemas/` — A Garantia de Dados
Utilizamos **Zod** para garantir que nenhum dado inválido entre no nosso sistema.
- **Tipagem Estrita**: Os schemas definem o que é um usuário válido e o que é uma tarefa válida em tempo de execução.

### 🔐 `src/lib/` & `proxy.ts` — Infraestrutura & Segurança
- **`prisma.ts`**: Cliente único para conexão com o NeonDB.
- **`proxy.ts`**: Atua como o antigo `middleware.ts`, garantindo que apenas usuários logados acessem o dashboard.

---

## 🎯 True North (Ponto de Partida)

Se você é novo no projeto ou quer começar a codar agora:

1. **Quer mudar o visual?** Vá em `src/components/`.
2. **Quer mudar como os dados são salvos?** Vá em `src/services/`.
3. **Quer adicionar uma nova página?** Vá em `src/app/`.
4. **Quer alterar a segurança?** Vá em `src/proxy.ts`.

---

## 🛠️ Tecnologias de Elite
| Tecnologia | Função | Por que? |
|---|---|---|
| **Next.js 16 (Canary)** | Framework | Performance e React Server Components. |
| **Bun** | Runtime/Package Manager | Velocidade de execução e instalação. |
| **Prisma** | ORM | Tipagem segura para banco de dados SQL. |
| **Zod** | Validação | Contratos de dados robustos. |
| **NeonDB** | Database | Serverless Postgres de alto desempenho. |

---

> "Simplicidade é o último grau de sofisticação." — Leonardo da Vinci
