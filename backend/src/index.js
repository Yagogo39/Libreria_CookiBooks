const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config();

const Autor = require('./models/Autor');
const Editorial = require('./models/Editorial');
const Categoria = require('./models/Categoria');
const Libro = require('./models/Libro');
const LibroCategoria = require('./models/libro_categoria');
const Cliente = require('./models/Cliente');
const Pedido = require('./models/pedido');
const DetallePedido = require('./models/DetallePedido');

// Relaciones
Autor.hasMany(Libro, { foreignKey: 'id_autor' });
Libro.belongsTo(Autor, { foreignKey: 'id_autor' });
Editorial.hasMany(Libro, { foreignKey: 'id_editorial' });
Libro.belongsTo(Editorial, { foreignKey: 'id_editorial' });
Cliente.hasMany(Pedido, { foreignKey: 'id_cliente' });
Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Pedido.hasMany(DetallePedido, { foreignKey: 'id_pedido' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido' });
Libro.hasMany(DetallePedido, { foreignKey: 'id_libro' });
DetallePedido.belongsTo(Libro, { foreignKey: 'id_libro' });
Libro.belongsToMany(Categoria, { through: LibroCategoria, foreignKey: 'id_libro', otherKey: 'id_categoria' });
Categoria.belongsToMany(Libro, { through: LibroCategoria, foreignKey: 'id_categoria', otherKey: 'id_libro' });

const libroRoutes = require('./routes/libroRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const autorRoutes = require('./routes/autorRoutes');
const editorialRoutes = require('./routes/editorialRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
sequelize.sync({ force: false, alter: false })
    .then(() => console.log('✅ Tablas sincronizadas'))
    .catch(err => console.log('❌ Error al sincronizar:', err.message));

app.get('/', (req, res) => res.send('Servidor CookiBooks funcionando 🍪'));
app.use('/api/libros', libroRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/autores', autorRoutes);
app.use('/api/editoriales', editorialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en: http://localhost:${PORT}`));