import { useState, useEffect } from 'react';
import { X, Plus, Pencil, Trash2, Save, ChevronLeft } from 'lucide-react';

const EMPTY_FORM = {
    nombre: '', edicion: '', precio: '', stockminimo: 5,
    stockmaximo: 100, existencias: 0, imagen_url: '',
    id_autor: '', id_editorial: ''
};

export default function AdminPanel({ onClose }) {
    const [libros, setLibros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [editoriales, setEditoriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list'); // list | form
    const [editinglibro, setEditingLibro] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            fetch('/api/libros').then(r => r.json()),
            fetch('/api/autores').then(r => r.json()),
            fetch('/api/editoriales').then(r => r.json()),
        ]).then(([l, a, e]) => {
            setLibros(l);
            setAutores(a);
            setEditoriales(e);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchData(); }, []);

    const openNew = () => {
        setEditingLibro(null);
        setForm(EMPTY_FORM);
        setView('form');
    };

    const openEdit = (libro) => {
        setEditingLibro(libro);
        setForm({
            nombre: libro.nombre || '',
            edicion: libro.edicion || '',
            precio: libro.precio || '',
            stockminimo: libro.stockminimo || 5,
            stockmaximo: libro.stockmaximo || 100,
            existencias: libro.existencias || 0,
            imagen_url: libro.imagen_url || '',
            id_autor: libro.id_autor || '',
            id_editorial: libro.id_editorial || ''
        });
        setView('form');
    };

    const handleSave = async () => {
        if (!form.nombre || !form.precio) return;
        setSaving(true);
        try {
            const method = editinglibro ? 'PUT' : 'POST';
            const url = editinglibro ? `/api/libros/${editinglibro.id_libro}` : '/api/libros';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error();
            setSuccessMsg(editinglibro ? 'Libro actualizado ✓' : 'Libro creado ✓');
            setTimeout(() => setSuccessMsg(''), 2500);
            setView('list');
            fetchData();
        } catch {
            alert('Error al guardar');
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/libros/${id}`, { method: 'DELETE' });
            setConfirmDelete(null);
            fetchData();
            setSuccessMsg('Libro eliminado ✓');
            setTimeout(() => setSuccessMsg(''), 2500);
        } catch {
            alert('Error al eliminar');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-stone-900 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {view === 'form' && (
                            <button onClick={() => setView('list')} className="text-amber-100/60 hover:text-amber-100">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <h2 className="font-serif text-lg font-bold text-amber-100 italic">
                            {view === 'list' ? '⚙️ Panel Admin — Libros' : editinglibro ? 'Editar libro' : 'Nuevo libro'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-amber-100/60 hover:text-amber-100">
                        <X size={20} />
                    </button>
                </div>

                {/* Mensaje de éxito */}
                {successMsg && (
                    <div className="bg-green-50 border-b border-green-200 px-6 py-2 text-green-700 text-sm font-bold">
                        {successMsg}
                    </div>
                )}

                {/* Contenido */}
                <div className="flex-1 overflow-y-auto">

                    {/* LISTA */}
                    {view === 'list' && (
                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <p className="text-stone-500 text-sm">{libros.length} libros en catálogo</p>
                                <button
                                    onClick={openNew}
                                    className="flex items-center gap-2 bg-stone-900 text-amber-100 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
                                >
                                    <Plus size={16} /> Nuevo libro
                                </button>
                            </div>

                            {loading ? (
                                <p className="text-center text-stone-400 py-8 animate-pulse">Cargando...</p>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {libros.map(libro => (
                                        <div key={libro.id_libro}
                                            className="flex items-center gap-3 p-3 border border-stone-100 rounded-xl hover:border-stone-300 transition-colors">
                                            {libro.imagen_url ? (
                                                <img src={libro.imagen_url} alt={libro.nombre}
                                                    className="w-10 h-14 object-cover rounded shadow flex-shrink-0" />
                                            ) : (
                                                <div className="w-10 h-14 bg-stone-100 rounded flex items-center justify-center flex-shrink-0">
                                                    <span className="text-stone-300 text-lg">📚</span>
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-serif font-bold text-stone-900 text-sm truncate">{libro.nombre}</p>
                                                <p className="text-xs text-stone-400">
                                                    {libro.Autor?.nombre} {libro.Autor?.apellido} · ${parseFloat(libro.precio).toFixed(2)}
                                                </p>
                                                <div className="flex gap-2 mt-1">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                                                        ${libro.existencias <= 0 ? 'bg-red-100 text-red-700'
                                                        : libro.existencias <= 10 ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-green-100 text-green-700'}`}>
                                                        {libro.existencias} uds
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <button onClick={() => openEdit(libro)}
                                                    className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors">
                                                    <Pencil size={15} />
                                                </button>
                                                <button onClick={() => setConfirmDelete(libro)}
                                                    className="p-2 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* FORMULARIO */}
                    {view === 'form' && (
                        <div className="p-6 flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Nombre *</label>
                                    <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900"
                                        placeholder="Título del libro" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Edición</label>
                                    <input value={form.edicion} onChange={e => setForm({...form, edicion: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900"
                                        placeholder="Ej: Primera edición" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Precio *</label>
                                    <input type="number" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900"
                                        placeholder="0.00" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Existencias</label>
                                    <input type="number" value={form.existencias} onChange={e => setForm({...form, existencias: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Stock mínimo</label>
                                    <input type="number" value={form.stockminimo} onChange={e => setForm({...form, stockminimo: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Stock máximo</label>
                                    <input type="number" value={form.stockmaximo} onChange={e => setForm({...form, stockmaximo: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Autor</label>
                                    <select value={form.id_autor} onChange={e => setForm({...form, id_autor: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900 bg-white">
                                        <option value="">Sin autor</option>
                                        {autores.map(a => (
                                            <option key={a.id_autor} value={a.id_autor}>{a.nombre} {a.apellido}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Editorial</label>
                                    <select value={form.id_editorial} onChange={e => setForm({...form, id_editorial: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900 bg-white">
                                        <option value="">Sin editorial</option>
                                        {editoriales.map(e => (
                                            <option key={e.id_editorial} value={e.id_editorial}>{e.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">URL de imagen</label>
                                    <input value={form.imagen_url} onChange={e => setForm({...form, imagen_url: e.target.value})}
                                        className="w-full mt-1 border border-stone-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-stone-900"
                                        placeholder="https://..." />
                                    {form.imagen_url && (
                                        <img src={form.imagen_url} alt="preview"
                                            className="mt-2 h-24 object-cover rounded shadow"
                                            onError={e => e.target.style.display='none'} />
                                    )}
                                </div>

                            </div>
                        </div>
                    )}
                </div>

                {/* Footer del form */}
                {view === 'form' && (
                    <div className="border-t border-stone-200 px-6 py-4 flex gap-3 flex-shrink-0">
                        <button onClick={() => setView('list')}
                            className="flex-1 border border-stone-300 text-stone-700 font-bold py-2 rounded-lg hover:bg-stone-50 transition-colors text-sm">
                            Cancelar
                        </button>
                        <button onClick={handleSave} disabled={saving || !form.nombre || !form.precio}
                            className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-amber-100 font-bold py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 text-sm">
                            <Save size={15} />
                            {saving ? 'Guardando...' : editinglibro ? 'Guardar cambios' : 'Crear libro'}
                        </button>
                    </div>
                )}
            </div>

            {/* Modal confirmar eliminar */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 flex flex-col gap-4">
                        <h3 className="font-serif font-bold text-stone-900 text-lg">¿Eliminar libro?</h3>
                        <p className="text-sm text-stone-500">
                            Estás a punto de eliminar <strong>"{confirmDelete.nombre}"</strong>. Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDelete(null)}
                                className="flex-1 border border-stone-300 text-stone-700 font-bold py-2 rounded-lg hover:bg-stone-50 text-sm">
                                Cancelar
                            </button>
                            <button onClick={() => handleDelete(confirmDelete.id_libro)}
                                className="flex-1 bg-red-700 text-white font-bold py-2 rounded-lg hover:bg-red-800 text-sm">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}