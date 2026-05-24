const Libro = require('../models/Libro');
const Autor = require('../models/Autor');
const Editorial = require('../models/Editorial');
const Categoria = require('../models/Categoria');

const getLibros = async (req, res) => {
    try {
        const { categoria } = req.query;
        const include = [
            { model: Autor, attributes: ['nombre', 'apellido'] },
            { model: Editorial, attributes: ['nombre'] },
            { model: Categoria, attributes: ['id_categoria', 'nombre'], through: { attributes: [] } }
        ];
        if (categoria) include[2].where = { id_categoria: categoria };
        const libros = await Libro.findAll({ include });
        res.json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener libros', error: error.message });
    }
};

const getLibroById = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id, {
            include: [
                { model: Autor, attributes: ['nombre', 'apellido'] },
                { model: Editorial, attributes: ['nombre'] },
                { model: Categoria, attributes: ['id_categoria', 'nombre'], through: { attributes: [] } }
            ]
        });
        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
        res.json(libro);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el libro', error: error.message });
    }
};

const createLibro = async (req, res) => {
    try {
        const nuevo = await Libro.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear libro', error: error.message });
    }
};

const updateLibro = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id);
        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
        await libro.update(req.body);
        res.json(libro);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar libro', error: error.message });
    }
};

const deleteLibro = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id);
        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
        await libro.destroy();
        res.json({ message: 'Libro eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar libro', error: error.message });
    }
};

module.exports = { getLibros, getLibroById, createLibro, updateLibro, deleteLibro };