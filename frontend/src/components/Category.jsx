import { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

const ICONS = {
    'Realismo Mágico': '✨', 'Terror': '👻', 'Fantasía': '🐉',
    'Historia': '📜', 'Autoayuda': '💡', 'Biografías': '🧑',
    'Ciencia Ficción': '🚀', 'Romance': '❤️', 'Novelas': '📖',
    'Cuentos': '🌙', 'Poesía': '🖊️', 'Teatro': '🎭',
    'Misterio': '🔍', 'Clásicos': '📰', 'Aventura': '🗺️',
};

export default function CategoryNav({ activeCategory, setActiveCategory }) {
    const [categories, setCategories] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        fetch('/api/categorias')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => {
                setCategories([
                    { id_categoria: 1, nombre: 'Realismo Mágico' },
                    { id_categoria: 2, nombre: 'Terror' },
                    { id_categoria: 3, nombre: 'Fantasía' },
                ]);
            });
    }, []);

    const handleClick = (id) => {
        setActiveCategory(prev => prev === id ? null : id);
        setShowMore(false);
    };

    const visibleLimit = 4;
    const visibleCats = categories.slice(0, visibleLimit);
    const hiddenCats = categories.slice(visibleLimit);

    return (
        <nav className="bg-white border-b border-stone-200 relative w-full">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
                <div className="flex flex-1 justify-around md:justify-center">
                    {visibleCats.map(cat => (
                        <button
                            key={cat.id_categoria}
                            onClick={() => handleClick(cat.id_categoria)}
                            className={`flex flex-col items-center gap-1.5 px-3 py-3 border-b-2 transition-all duration-200
                                ${activeCategory === cat.id_categoria
                                    ? 'border-red-700 text-red-700'
                                    : 'border-transparent text-stone-500 hover:text-red-700'}`}
                        >
                            <span className={`text-xl w-10 h-10 flex items-center justify-center rounded-full transition-colors
                                ${activeCategory === cat.id_categoria ? 'bg-red-50' : 'bg-stone-50'}`}>
                                {ICONS[cat.nombre] || '📚'}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-tight">{cat.nombre}</span>
                        </button>
                    ))}

                    {hiddenCats.length > 0 && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className={`flex flex-col items-center gap-1.5 px-3 py-3 border-b-2 transition-all duration-200
                                    ${showMore ? 'border-red-700 text-red-700' : 'border-transparent text-stone-500'}`}
                            >
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${showMore ? 'bg-red-50' : 'bg-stone-50'}`}>
                                    <MoreHorizontal size={20} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-tight">Más</span>
                            </button>

                            {showMore && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowMore(false)} />
                                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-stone-200 rounded-xl shadow-xl z-20 overflow-hidden">
                                        <div className="py-2">
                                            {hiddenCats.map(cat => (
                                                <button
                                                    key={cat.id_categoria}
                                                    onClick={() => handleClick(cat.id_categoria)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-stone-50 transition-colors
                                                        ${activeCategory === cat.id_categoria ? 'text-red-700 bg-red-50/50' : 'text-stone-600'}`}
                                                >
                                                    <span className="text-lg">{ICONS[cat.nombre] || '📚'}</span>
                                                    <span className="text-sm font-medium">{cat.nombre}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}