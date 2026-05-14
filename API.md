# 📖 API Documentation - ToDoList

Este documento descreve os endpoints da API do ToDoList. Todas as rotas de tarefas exigem autenticação via sessão (NextAuth).

## 🔐 Autenticação
A autenticação é gerenciada pelo **NextAuth.js**.
- **Login:** `/api/auth/callback/credentials` (POST via NextAuth)
- **Registro:** Realizado via Server Action `registerAction`.

---

## 📋 Tarefas (`/api/tasks`)

### 1. Listar Tarefas
Retorna todas as tarefas do usuário autenticado.

- **URL:** `/api/tasks`
- **Método:** `GET`
- **Parâmetros de Consulta (Opcional):**
    - `status`: Filtra tarefas por status (ex: `Pendente`, `Concluída`).
- **Resposta de Sucesso:**
    - **Código:** 200 OK
    - **Corpo:** `Task[]` (Array de objetos Task)

### 2. Criar Tarefa
Cria uma nova tarefa vinculada ao usuário autenticado.

- **URL:** `/api/tasks`
- **Método:** `POST`
- **Corpo da Requisição:**
    ```json
    {
      "title": "Título da tarefa",
      "description": "Descrição opcional",
      "status": "Pendente"
    }
    ```
- **Resposta de Sucesso:**
    - **Código:** 201 Created
    - **Corpo:** Objeto `Task` criado.

---

## 📍 Tarefa Específica (`/api/tasks/[id]`)

### 3. Buscar Tarefa por ID
Retorna os detalhes de uma tarefa específica.

- **URL:** `/api/tasks/:id`
- **Método:** `GET`
- **Resposta de Sucesso:**
    - **Código:** 200 OK
    - **Corpo:** Objeto `Task`.

### 4. Atualizar Tarefa (Parcial)
Atualiza campos de uma tarefa existente.

- **URL:** `/api/tasks/:id`
- **Método:** `PATCH`
- **Corpo da Requisição (Qualquer campo opcional):**
    ```json
    {
      "title": "Novo título",
      "description": "Nova descrição",
      "status": "Concluída"
    }
    ```
- **Resposta de Sucesso:**
    - **Código:** 200 OK
    - **Corpo:** Objeto `Task` atualizado.

### 5. Deletar Tarefa
Remove uma tarefa permanentemente.

- **URL:** `/api/tasks/:id`
- **Método:** `DELETE`
- **Resposta de Sucesso:**
    - **Código:** 204 No Content

---

## ⚠️ Respostas de Erro Comuns

| Código | Descrição | Motivo |
|---|---|---|
| 401 | Unauthorized | Usuário não está logado ou sessão expirou. |
| 400 | Bad Request | Dados inválidos no corpo da requisição (falha na validação Zod). |
| 404 | Not Found | Tarefa não encontrada ou não pertence ao usuário. |
| 500 | Internal Server Error | Erro inesperado no servidor ou banco de dados. |
