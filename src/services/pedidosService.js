let pedidos = [];
let proximoId = 1;

const TIPOS_VALIDOS = ['entrega', 'retirada'];
const PRIORIDADES_VALIDAS = ['baixa', 'normal', 'alta'];
const STATUS_VALIDOS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

// Cada status só pode avançar para os próximos estados definidos aqui.
const TRANSICOES = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'cancelado'],
  enviado: ['entregue'],
  entregue: [],
  cancelado: []
};

function criar(dados) {
  const { cliente, tipo, valor, prioridade } = dados;

  if (typeof cliente !== 'string' || cliente.trim() === '') {
    const erro = new Error('O campo cliente é obrigatório.');
    erro.status = 400;
    throw erro;
  }
  if (!TIPOS_VALIDOS.includes(tipo)) {
    const erro = new Error('Tipo inválido. Use entrega ou retirada.');
    erro.status = 400;
    throw erro;
  }
  if (typeof valor !== 'number' || !Number.isFinite(valor) || valor <= 0) {
    const erro = new Error('O valor deve ser numérico e maior que zero.');
    erro.status = 400;
    throw erro;
  }
  if (!PRIORIDADES_VALIDAS.includes(prioridade)) {
    const erro = new Error('Prioridade inválida. Use baixa, normal ou alta.');
    erro.status = 400;
    throw erro;
  }

  const pedido = {
    id: proximoId++,
    cliente: cliente.trim(),
    tipo,
    valor,
    prioridade,
    status: 'recebido'
  };

  pedidos.push(pedido);
  return pedido;
}

function listar() {
  return pedidos;
}

function buscarPorId(id) {
  const pedido = pedidos.find((item) => item.id === Number(id));
  if (!pedido) {
    const erro = new Error('Pedido não encontrado.');
    erro.status = 404;
    throw erro;
  }
  return pedido;
}

function atualizarStatus(id, novoStatus) {
  const pedido = buscarPorId(id);

  if (!STATUS_VALIDOS.includes(novoStatus)) {
    const erro = new Error('Status inválido.');
    erro.status = 400;
    throw erro;
  }

  if (!TRANSICOES[pedido.status].includes(novoStatus)) {
    const erro = new Error(`Não é possível alterar de ${pedido.status} para ${novoStatus}.`);
    erro.status = 400;
    throw erro;
  }

  pedido.status = novoStatus;
  return pedido;
}

// Usado pelos testes para começar cada teste com a lista vazia.
function limparPedidos() {
  pedidos = [];
  proximoId = 1;
}

module.exports = { criar, listar, buscarPorId, atualizarStatus, limparPedidos };
