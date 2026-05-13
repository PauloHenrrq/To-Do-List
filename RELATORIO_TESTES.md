# 📋 Relatório Técnico-Funcional: Testes Automatizados

Este relatório detalha a implementação da camada de testes do projeto **ToDoList**, explicando cada componente de forma didática para compreensão de todos os níveis de conhecimento.

---

## 1. O que são Testes Automatizados?
Em termos simples, testes automatizados são "robôs de verificação". Eles executam o código e verificam se o resultado é o esperado. Isso evita que erros humanos passem despercebidos e garante que o sistema continue funcionando após atualizações.

### Divisão da nossa Suíte:
1.  **Testes Unitários:** Verificam as "peças" individuais do sistema. No nosso caso, as regras de validação (ex: "o título da tarefa não pode estar vazio").
2.  **Testes de Integração:** Verificam se o sistema como um todo funciona. Ele simula uma requisição de um usuário real e vê se o banco de dados (mesmo que simulado) responde corretamente.

---

## 2. Glossário para Não-Técnicos
Para entender este relatório, considere estes conceitos:
-   **Mock (Simulação):** É um objeto de "mentira". Nos testes, não usamos o banco de dados real (para não apagar dados reais). Usamos um Mock que finge ser o banco de dados e responde exatamente o que o teste precisa.
-   **Schema (Regras):** São os moldes. Eles definem que um email deve ter `@`, uma senha deve ter no mínimo 6 caracteres, etc.
-   **Payload:** É o "pacote" de dados que enviamos para o servidor.
-   **Status Code (Códigos de Resposta):**
    -   `200/201`: Sucesso.
    -   `401`: Você não está logado.
    -   `404`: Não encontrei o que você pediu (ou você não tem permissão para ver).

---

## 3. Mapeamento de Arquivos e Alterações

### 📂 `tests/setup.ts` (O Maestro)
**O que é:** O arquivo de configuração global.
**O que faz:** Ele avisa ao sistema de testes para substituir peças reais (Banco de Dados e Autenticação) por peças simuladas (Mocks). É aqui que definimos que o sistema deve "fingir" que o banco de dados está sempre disponível.

### 📂 `tests/unit/schemas.test.ts` (O Inspetor de Regras)
**O que é:** Testes de validação de dados.
**O que faz:**
- Testamos o **Login**: Se o email estiver errado, o sistema avisa? Sim.
- Testamos o **Cadastro**: Se o nome estiver vazio, ele barra? Sim.
- Testamos as **Tarefas**: Se o título for muito curto, ele aceita? Não.
**Importância:** Garante que dados inválidos nunca entrem no nosso banco de dados.

### 📂 `tests/integration/tasks.test.ts` (O Simulador de Uso - Fluxo Geral)
**O que é:** Testes das rotas principais de tarefas.
**O que faz:**
- Simula um usuário logado pedindo suas tarefas e verifica se elas chegam.
- Simula a criação de uma nova tarefa e verifica se o sistema retorna o "ID" da nova tarefa.
- Verifica se o sistema expulsa quem tenta acessar sem estar logado (Erro 401).

### 📂 `tests/integration/task_id.test.ts` (O Simulador de Uso - Ações Específicas)
**O que é:** Testes de edição (`PATCH`) e exclusão (`DELETE`).
**O que faz:**
- Testa se o usuário consegue mudar o título de uma tarefa.
- **Segurança Crítica:** Testa se um usuário consegue apagar a tarefa de outro. O teste garante que o sistema negue essa ação, protegendo a privacidade dos dados.

---

## 4. Alterações no Código de Produção
Para que os testes pudessem rodar de forma limpa, fizemos ajustes pontuais:
-   **`src/lib/prisma.ts`**: Removemos códigos de "teste" que estavam poluindo o arquivo de produção. Agora, o arquivo está focado apenas na conexão real, deixando as simulações para o ambiente de testes dedicado.
-   **`package.json`**: Adicionamos o comando `test`. Agora, com um único clique (ou comando), todos os 14 robôs revisam todo o projeto em menos de 1 segundo.

---

## 5. Conclusão: O Valor do Trabalho Realizado
Atualmente, o projeto possui **14 testes passando com sucesso**. 

Isso significa que o "coração" do seu ToDoList (o Backend) está extremamente confiável. Podemos construir a parte visual (Frontend) com a tranquilidade de que a fundação é sólida e segura.

---
*Relatório gerado automaticamente para documentação de progresso do projeto ToDoList.*
