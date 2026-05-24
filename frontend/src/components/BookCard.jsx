import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function StarRating({ rating }) {
    if (!rating) return null;
    return (
        <div className="flex gap-px mb-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={`text-[10px] md:text-xs ${i <= rating ? 'text-amber-400' : 'text-stone-300'}`}>★</span>
            ))}
        </div>
    );
}

export default function BookCard({ book }) {
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const { toggleWish, isWished } = useWishlist();

    const wished = isWished(book.id_libro);
    const agotado = book.existencias <= 0;

    const badgeColors = {
        Preventa: 'bg-red-700 text-white',
        Bestseller: 'bg-stone-900 text-amber-100',
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        if (agotado) return;
        addToCart(book);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    const handleWish = (e) => {
        e.stopPropagation();
        toggleWish(book);
    };

    return (
        <div className="group bg-white rounded-lg overflow-hidden border border-stone-100 md:hover:-translate-y-1 md:hover:shadow-xl transition-all duration-200 cursor-pointer w-[150px] sm:w-[175px] md:w-[185px] flex-shrink-0 snap-start flex flex-col h-full">

            <div className="relative bg-stone-100 aspect-[3/4] overflow-hidden">
                {book.badge && (
                    <span className={`absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-bold tracking-widest uppercase shadow-sm ${badgeColors[book.badge]}`}>
                        {book.badge}
                    </span>
                )}
                {agotado && (
                    <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                        <span className="bg-red-700 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Agotado</span>
                    </div>
                )}
                <button
                    onClick={handleWish}
                    className={`absolute top-2 right-2 z-20 w-8 h-8 md:w-7 md:h-7 flex items-center justify-center rounded-full text-base md:text-sm shadow-md transition-all
                        ${wished ? 'text-red-700 bg-white scale-110' : 'text-stone-400 bg-white/80 hover:text-red-700'}`}
                >
                    {wished ? '♥' : '♡'}
                </button>
                <img
                    src={book.imagen_url || book.imagen || book.cover}
                    alt={book.nombre || book.title}
                    className={`w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105 ${agotado ? 'opacity-60' : ''}`}
                    onError={e => { e.target.style.display = 'none'; }}
                />
            </div>

            <div className="p-2 md:p-3 flex flex-col flex-1">
                <p className="text-[9px] md:text-[10px] text-stone-400 truncate mb-0.5">
                    {book.Autor?.nombre} {book.Autor?.apellido || book.author}
                </p>
                <h3 className="font-serif text-[12px] md:text-[13px] font-bold text-stone-900 leading-snug mb-1.5 line-clamp-2 h-8 md:h-9">
                    {book.nombre || book.title}
                </h3>

                <StarRating rating={book.rating} />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mt-auto">
                    <span className="text-[8px] md:text-[9px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded self-start">
                        {book.edicion || book.format || 'Tapa Blanda'}
                    </span>
                    <span className="font-serif text-base md:text-lg font-bold text-stone-900">
                        ${parseFloat(book.precio || book.price).toFixed(2)}
                    </span>
                </div>

                <div className="my-1.5">
                    {book.existencias > 10 ? (
                        <span className="text-[9px] text-green-700 font-bold">● {book.existencias} disponibles</span>
                    ) : book.existencias > 0 ? (
                        <span className="text-[9px] text-amber-600 font-bold">● Últimas {book.existencias} unidades</span>
                    ) : (
                        <span className="text-[9px] text-red-700 font-bold">● Agotado</span>
                    )}
                </div>

                <button
                    onClick={handleAdd}
                    disabled={agotado}
                    className={`w-full text-amber-100 text-[9px] md:text-[10px] font-bold uppercase tracking-wider py-2 rounded transition-all duration-200
                        ${agotado
                            ? 'bg-stone-300 cursor-not-allowed opacity-100 md:opacity-100'
                            : `opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-2 md:group-hover:translate-y-0
                               ${added ? 'bg-green-700' : 'bg-stone-900 active:bg-red-800 md:hover:bg-red-700'}`
                        }`}
                >
                    {agotado ? 'Agotado' : added ? '✓ Agregado' : 'Agregar'}
                </button>
            </div>
        </div>
    );
}