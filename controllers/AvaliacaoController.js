import Avaliacao from "../models/Avaliacao.js";

const AvaliacaoController = {
  create: async (req, res) => {
    try {
      const { pedido_id, nota, comentario } = req.body;
      
      if (!pedido_id || !nota) {
        return res.status(400).json({ error: 'pedido_id e nota sao obrigatorios' });
      }
      
      if (nota < 1 || nota > 5) {
        return res.status(400).json({ error: 'A nota deve estar entre 1 e 5' });
      }
      
      const avaliacao = await Avaliacao.create({
        pedido_id,
        nota,
        comentario
      });
      
      res.status(201).json(avaliacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const avaliacoes = await Avaliacao.findAll({
        include: ['pedido']
      });
      
      if (avaliacoes.length === 0) {
        return res.status(200).json([]);
      }
      
      res.status(200).json(avaliacoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const avaliacao = await Avaliacao.findByPk(req.params.id, {
        include: ['pedido']
      });
      
      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliacao nao encontrada' });
      }
      
      res.status(200).json(avaliacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findByPedidoId: async (req, res) => {
    try {
      const avaliacoes = await Avaliacao.findAll({
        where: { pedido_id: req.params.pedido_id },
        include: ['pedido']
      });
      
      if (avaliacoes.length === 0) {
        return res.status(200).json([]);
      }
      
      res.status(200).json(avaliacoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const avaliacao = await Avaliacao.findByPk(req.params.id);
      
      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliacao nao encontrada' });
      }
      
      const { nota, comentario } = req.body;
      
      if (nota && (nota < 1 || nota > 5)) {
        return res.status(400).json({ error: 'A nota deve estar entre 1 e 5' });
      }
      
      await avaliacao.update({
        nota: nota || avaliacao.nota,
        comentario: comentario !== undefined ? comentario : avaliacao.comentario
      });
      
      res.status(200).json(avaliacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const avaliacao = await Avaliacao.findByPk(req.params.id);
      
      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliacao nao encontrada' });
      }
      
      await avaliacao.destroy();
      res.status(200).json({ message: 'Avaliacao removida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default AvaliacaoController;