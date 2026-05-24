import { Search, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header({ query, setQuery }) {
    const { count, setCheckoutOpen } = useCart();
    const { count: wishCount, setWishlistOpen } = useWishlist();

    return (
        <header className="bg-white border-b-2 border-stone-900 sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-3">
                <div className="flex items-center justify-between gap-4 md:gap-8">

                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <a className="leading-none group" onClick={() => setQuery('')}>
                            <span className="block text-[9px] text-stone-400 tracking-[0.14em] uppercase font-sans group-hover:text-red-700 transition-colors">Cooki</span>
                            <span className="block font-serif text-[22px] md:text-[26px] font-extrabold text-stone-900 italic">Books</span>
                        </a>
                    </div>

                    {/* Búsqueda desktop */}
                    <div className="hidden md:flex flex-1 items-center bg-stone-100 border border-stone-300 rounded-md overflow-hidden focus-within:border-stone-900 transition-all">
                        <input
                            type="text"
                            placeholder="Busca por título o autor..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="flex-1 bg-transparent px-4 py-2 text-sm text-stone-700 outline-none placeholder-stone-400 font-sans"
                        />
                        {query && (
                            <button onClick={() => setQuery('')} className="px-3 text-stone-400 hover:text-stone-700 text-lg">×</button>
                        )}
                        <button className="bg-stone-900 text-white hover:bg-red-700 cursor-pointer transition-colors px-5 py-2 flex items-center text-sm font-bold">
                            Buscar
                        </button>
                    </div>

                    {/* Iconos */}
                    <div className="flex items-center gap-1">
                        {/* Wishlist */}
                        <button
                            onClick={() => setWishlistOpen(true)}
                            className="relative p-2 text-stone-900 hover:text-red-700 transition-colors"
                            aria-label="Lista de deseos"
                        >
                            <Heart size={22} />
                            {wishCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-700 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {wishCount > 9 ? '9+' : wishCount}
                                </span>
                            )}
                        </button>

                        {/* Carrito */}
                        <button
                            onClick={() => setCheckoutOpen(true)}
                            className="relative p-2 text-stone-900 hover:text-red-700 transition-colors"
                            aria-label="Abrir carrito"
                        >
                            <ShoppingBag size={22} />
                            {count > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-700 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {count > 9 ? '9+' : count}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Búsqueda móvil */}
                <div className="mt-3 flex md:hidden items-center bg-stone-100 border border-stone-300 rounded-md overflow-hidden focus-within:border-stone-900">
                    <input
                        type="text"
                        placeholder="Busca por título o autor..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="flex-1 bg-transparent px-4 py-2 text-sm text-stone-700 outline-none placeholder-stone-400 font-sans"
                    />
                    {query && (
                        <button onClick={() => setQuery('')} className="px-3 text-stone-400 hover:text-stone-700 text-lg">×</button>
                    )}
                    <button className="bg-stone-900 text-white px-4 py-2 flex items-center">
                        <Search size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}