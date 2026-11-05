const request = require('supertest');
const app = require('../src/app');
const pedidosService = require('../src/services/pedidosService');

beforeEach(() => pedidosService.limparPedidos());

describe('API de pedidos', () => {
  test('cria um pedido válido com status 201', async () => {
    const resposta = await request(app).post('/pedidos').send({
      cliente: 'Carlos Silva', tipo: 'entrega', valor: 350, prioridade: 'normal'
    });
    expect(resposta.status).toBe(201);
    expect(resposta.body.status).toBe('recebido');
    expect(resposta.body.id).toBe(1);
  });

  test('retorna 400 quando os dados são inválidos', async () => {
    const resposta = await request(app).post('/pedidos').send({
      cliente: '   ', tipo: 'entrega', valor: -10, prioridade: 'normal'
    });
    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBeTruthy();
  });

  test('lista os pedidos cadastrados', async () => {
    await request(app).post('/pedidos').send({
      cliente: 'Ana', tipo: 'retirada', valor: 80, prioridade: 'baixa'
    });
    const resposta = await request(app).get('/pedidos');
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(1);
  });

  test('retorna 404 ao consultar um ID inexistente', async () => {
    const resposta = await request(app).get('/pedidos/999');
    expect(resposta.status).toBe(404);
  });

  test('atualiza o status de um pedido', async () => {
    await request(app).post('/pedidos').send({
      cliente: 'João', tipo: 'entrega', valor: 120, prioridade: 'alta'
    });
    const resposta = await request(app).patch('/pedidos/1/status').send({ status: 'em_preparacao' });
    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('em_preparacao');
  });
});
