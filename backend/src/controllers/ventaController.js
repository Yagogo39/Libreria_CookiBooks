const { sequelize } = require('../config/db');
const Libro = require('../models/Libro');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/pedido');
const DetallePedido = require('../models/DetallePedido');
const { enviarCotizacion } = require('../utils/mailer');

const realizarVenta = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { nombre, correo, carrito } = req.body;

        if (!correo) throw new Error('El correo es requerido para enviar la cotización');
        if (!carrito || carrito.length === 0) throw new Error('El carrito está vacío');

        let totalVenta = 0;
        const productosParaCorreo = [];

        // Validar stock
        for (const item of carrito) {
            const libro = await Libro.findByPk(item.id_libro, { transaction: t });
            if (!libro) throw new Error(`El libro con ID ${item.id_libro} no existe`);
            if (libro.existencias < item.cantidad) throw new Error(`Stock insuficiente para: ${libro.nombre}`);

            libro.existencias -= item.cantidad;
            await libro.save({ transaction: t });

            totalVenta += parseFloat(libro.precio) * item.cantidad;
            productosParaCorreo.push({
                nombre: libro.nombre,
                cantidad: item.cantidad,
                precio: libro.precio
            });
        }

        // Crear cliente
        const [cliente] = await Cliente.findOrCreate({
            where: { nombre_apellido: nombre },
            defaults: { correo, calle: 'Venta Mostrador' },
            transaction: t
        });

        // Calcular fecha expiración (7 días)
        const hoy = new Date();
        const expiracion = new Date(hoy);
        expiracion.setDate(expiracion.getDate() + 7);

        // Crear pedido
        const totalConIva = req.body.totalConIva || parseFloat((totalVenta * 1.16).toFixed(2));
        const pedido = await Pedido.create({
            id_cliente: cliente.id_cliente,
            total: totalConIva,
            fechainicio: hoy,
            fechaexpiracion: expiracion
        }, { transaction: t });

        // Crear detalles del pedido
        for (const item of carrito) {
            const libro = await Libro.findByPk(item.id_libro, { transaction: t });
            await DetallePedido.create({
                id_pedido: pedido.id_pedido,
                id_libro: item.id_libro,
                cantidad: item.cantidad,
                precio_unitario: libro.precio
            }, { transaction: t });
        }

        await t.commit();

        // Enviar cotización
        enviarCotizacion(correo, nombre, totalVenta, productosParaCorreo)
            .then(() => console.log(`✅ Cotización enviada a ${correo}`))
            .catch(err => console.error('❌ Error enviando cotización:', err.message));

        res.status(201).json({
            ok: true,
            msg: `¡Cotización enviada a ${correo}!`,
            total: totalVenta
        });

    } catch (error) {
        await t.rollback();
        res.status(400).json({ ok: false, msg: error.message });
    }
};

module.exports = { realizarVenta };