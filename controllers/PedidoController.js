import Pedido from "../models/Pedido.js";

const PedidoController = {
    create : async (req, res) =>{
        try{
            const pedido = await Pedido.create(req.body);
            res.status(201).json(pedido);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    },

    findAll : async (req,res) =>{
        try{
            const pedidos = await Pedido.findAll({
                include: [
                    { association: 'entrega' },
                    { association: 'avaliacoes' }
                ]
            });
            if (pedidos.length === 0){
                return res.status(200).json([]);
            }
            res.status(200).json(pedidos);  
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    },

    findById : async (req, res) =>{
        try{
            const pedido = await Pedido.findByPk(req.params.id, {
                include: [
                    { association: 'entrega' },
                    { association: 'avaliacoes' }
                ]
            });
            if (!pedido){
                return res.status(404).json({ error: 'Pedido nao encontrado' });
            }
            res.status(200).json(pedido);  
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    },

    update : async (req, res) =>{
        try{
            const pedido = await Pedido.findByPk(req.params.id);
            if (!pedido){
                return res.status(404).json({ error: 'Pedido nao encontrado' });
            }
            await pedido.update(req.body);
            res.status(200).json(pedido);
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    },

    delete : async (req, res) =>{
        try{
            const pedido = await Pedido.findByPk(req.params.id);
            if (!pedido){
                return res.status(404).json({ error: 'Pedido nao encontrado' });
            }
            await pedido.destroy();
            res.status(200).json({ message: 'Pedido removido com sucesso' });
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }

};

export default PedidoController;