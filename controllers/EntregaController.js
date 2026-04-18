import Entrega from '../models/Entrega.js';

class EntregaController {
    async index(req, res) {
        try {
            const entregas = await Entrega.findAll({
                include: [
                    { association: 'pedido' }
                ]
            });
            res.status(200).json(entregas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const entrega = await Entrega.findByPk(id, {
                include: [
                    { association: 'pedido' }
                ]
            });
            if (!entrega) {
                return res.status(404).json({ error: 'Entrega não encontrada' });
            }
            res.status(200).json(entrega);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async store(req, res) {
        try {
            const entrega = await Entrega.create(req.body);
            res.status(201).json(entrega);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const entrega = await Entrega.findByPk(id);
            if (!entrega) {
                return res.status(404).json({ error: 'Entrega não encontrada' });
            }
            await entrega.update(req.body);
            res.status(200).json(entrega);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const entrega = await Entrega.findByPk(id);
            if (!entrega) {
                return res.status(404).json({ error: 'Entrega não encontrada' });
            }
            await entrega.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new EntregaController();