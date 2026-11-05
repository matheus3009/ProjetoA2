# API de Gerenciamento de Pedidos

Projeto desenvolvido para a atividade prática de Tópicos Avançados em Sistemas de Informação II. A API permite cadastrar, listar, consultar e atualizar pedidos de uma pequena loja.

## Tecnologias
- Node.js e Express
- JavaScript
- Jest e Supertest para testes automatizados
- Postman para testes manuais

## Como instalar e executar
1. Instale o Node.js (versão LTS) no computador.
2. Abra esta pasta no Visual Studio Code.
3. Abra o terminal do VS Code e execute `npm install`.
4. Inicie a API com `npm start`.
5. A API ficará disponível em `http://localhost:3000`.

Para desenvolvimento, também é possível usar `npm run dev`.

## Rotas
| Método | Rota | Descrição |
|---|---|---|
| POST | `/pedidos` | Cadastra um pedido |
| GET | `/pedidos` | Lista os pedidos |
| GET | `/pedidos/:id` | Consulta um pedido pelo ID |
| PATCH | `/pedidos/:id/status` | Atualiza o status |

### Exemplo de cadastro
Envie um POST para `http://localhost:3000/pedidos` com o corpo JSON:

```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

O retorno será HTTP 201 e incluirá o ID e o status inicial `recebido`.

### Atualização de status
Envie um PATCH para `http://localhost:3000/pedidos/1/status`:

```json
{ "status": "em_preparacao" }
```

## Valores aceitos e regras
- `tipo`: `entrega` ou `retirada`.
- `prioridade`: `baixa`, `normal` ou `alta`.
- `status`: `recebido`, `em_preparacao`, `enviado`, `entregue` ou `cancelado`.
- O cliente não pode ficar vazio e o valor precisa ser numérico e maior que zero.
- Transições: `recebido` pode ir para `em_preparacao` ou `cancelado`; `em_preparacao` pode ir para `enviado` ou `cancelado`; `enviado` pode ir para `entregue`. `entregue` e `cancelado` são estados finais.
- Dados inválidos retornam 400; pedido inexistente retorna 404; erros inesperados retornam 500.

## Organização do projeto
- `src/routes`: define os endereços da API e liga cada rota ao controller.
- `src/controllers`: recebe as requisições e devolve as respostas HTTP.
- `src/services`: contém as regras de negócio e o armazenamento em memória.
- `tests`: contém os testes automatizados.
- `evidencias`: local para salvar as capturas do Postman.

Os dados ficam armazenados em memória. Por isso, os pedidos são apagados quando o servidor é reiniciado. Não é utilizado banco de dados, conforme permitido no enunciado.

## Testes automatizados
Execute `npm test`. Os testes verificam criação, validação, listagem, consulta inexistente e atualização de status.

## Evidências do Postman
Salvar nesta pasta os prints legíveis dos cinco cenários pedidos:
1. `01-criacao.png` — POST válido com resposta 201.
2. `02-validacao.png` — POST inválido com resposta 400.
3. `03-listagem.png` — GET da lista com resposta 200.
4. `04-consulta-inexistente.png` — GET de ID inexistente com resposta 404.
5. `05-atualizacao.png` — PATCH de status válido com resposta 200.

## Git e GitHub
O histórico deve conter pelo menos cinco commits que representem etapas reais do desenvolvimento. Não faça todos os commits de uma só vez como se fossem etapas antigas; registre as alterações conforme forem realizadas. Depois, publique o repositório no GitHub e entregue o link junto com seu RA.

## Uso de IA
Foi utilizada uma ferramenta de inteligência artificial como apoio para organizar a estrutura inicial do projeto, revisar a lógica das rotas e validações e preparar exemplos de testes e documentação. Uma sugestão adotada foi separar as responsabilidades entre rotas, controllers e services, pois isso deixa o código mais organizado e facilita encontrar onde cada regra é executada. O código foi revisado e deve ser executado e testado pelo aluno antes da entrega.
