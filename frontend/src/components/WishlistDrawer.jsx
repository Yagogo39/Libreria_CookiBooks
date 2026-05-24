import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer() {
    const { wishlist, removeFromWishlist, clearWishlist, count, wishlistOpen, setWishlistOpen } = useWishlist();
    const { addToCart } = useCart();

    if (!wishlistOpen) return null;

    const handleAddAll = () => {
        wishlist.forEach(book => addToCart(book));
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setWishlistOpen(false)} />

            <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-red-700">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-xl">♥</span>
                        <h2 className="font-serif text-lg font-bold text-white italic">
                            Lista de deseos ({count})
                        </h2>
                    </div>
                    <button onClick={() => setWishlistOpen(false)}
                        className="text-white/60 hover:text-white text-2xl leading-none">×</button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
                    {wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-stone-400">
                            <span className="text-5xl">🤍</span>
                            <p className="text-sm">Tu lista de deseos está vacía</p>
                            <p className="text-xs text-center">Toca el ♡ en cualquier libro para agregarlo aquí</p>
                        </div>
                    ) : (
                        wishlist.map(book => (
                            <div key={book.id_libro} className="flex gap-3 border-b border-stone-100 pb-3">
                                {(book.imagen_url || book.imagen || book.cover) && (
                                    <img
                                        src={book.imagen_url || book.imagen || book.cover}
                                        alt={book.nombre}
                                        className="w-12 h-16 object-cover rounded shadow flex-shrink-0"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-serif text-sm font-bold text-stone-900 truncate">{book.nombre}</p>
                                    <p className="text-xs text-stone-400 mb-1">
                                        {book.Autor?.nombre} {book.Autor?.apellido}
                                    </p>
                                    <p className="font-serif font-bold text-stone-900 text-sm">
                                        ${parseFloat(book.precio).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => { addToCart(book); }}
                                        className="mt-1.5 text-[9px] font-bold uppercase tracking-wider bg-stone-900 text-amber-100 px-3 py-1 rounded hover:bg-red-700 transition-colors"
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromWishlist(book.id_libro)}
                                    className="text-stone-300 hover:text-red-700 text-lg self-start"
                                >×</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {wishlist.length > 0 && (
                    <div className="border-t border-stone-200 px-5 py-4 flex flex-col gap-2">
                        <button
                            onClick={handleAddAll}
                            className="w-full bg-stone-900 text-amber-100 font-bold py-3 rounded hover:bg-red-700 transition-colors text-sm"
                        >
                            Agregar todos al carrito 🛍️
                        </button>
                        <button
                            onClick={clearWishlist}
                            className="w-full text-stone-400 hover:text-red-700 text-xs font-bold py-1 transition-colors"
                        >
                            Vaciar lista
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}