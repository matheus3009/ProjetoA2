const pedidosService = require('../services/pedidosService');

function responderErro(res, erro) {
  const status = erro.status || 500;
  return res.status(status).json({ erro: erro.message || 'Erro interno do servidor.' });
}

exports.criar = (req, res) => {
  try {
    const pedido = pedidosService.criar(req.body);
    return res.status(201).json(pedido);
  } catch (erro) {
    return responderErro(res, erro);
  }
};

exports.listar = (req, res) => {
  return res.status(200).json(pedidosService.listar());
};

exports.buscarPorId = (req, res) => {
  try {
    const pedido = pedidosService.buscarPorId(req.params.id);
    return res.status(200).json(pedido);
  } catch (erro) {
    return responderErro(res, erro);
  }
};

exports.atualizarStatus = (req, res) => {
  try {
    const pedido = pedidosService.atualizarStatus(req.params.id, req.body.status);
    return res.status(200).json(pedido);
  } catch (erro) {
    return responderErro(res, erro);
  }
};
