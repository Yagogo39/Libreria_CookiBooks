const { Router } = require('express');
const Categoria = require('../models/Categoria');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            attributes: ['id_categoria', 'nombre']
        });
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
    }
});

module.exports = router;