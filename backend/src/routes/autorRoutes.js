const { Router } = require('express');
const Autor = require('../models/Autor');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const autores = await Autor.findAll({ attributes: ['id_autor', 'nombre', 'apellido'] });
        res.json(autores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener autores', error: error.message });
    }
});

module.exports = router;