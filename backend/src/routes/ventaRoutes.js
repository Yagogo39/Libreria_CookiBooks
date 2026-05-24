const { Router } = require('express');
const { realizarVenta } = require('../controllers/ventaController');

const router = Router();

router.post('/compra', realizarVenta);

module.exports = router;
