const { Router } = require('express');
const Editorial = require('../models/Editorial');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const editoriales = await Editorial.findAll({ attributes: ['id_editorial', 'nombre'] });
        res.json(editoriales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener editoriales', error: error.message });
    }
});

module.exports = router;