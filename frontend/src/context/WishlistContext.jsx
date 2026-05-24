import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const [wishlistOpen, setWishlistOpen] = useState(false);

    const toggleWish = (book) => {
        setWishlist(prev => {
            const exists = prev.find(b => b.id_libro === book.id_libro);
            if (exists) return prev.filter(b => b.id_libro !== book.id_libro);
            return [...prev, book];
        });
    };

    const isWished = (id_libro) => wishlist.some(b => b.id_libro === id_libro);
    const removeFromWishlist = (id_libro) => setWishlist(prev => prev.filter(b => b.id_libro !== id_libro));
    const clearWishlist = () => setWishlist([]);
    const count = wishlist.length;

    return (
        <WishlistContext.Provider value={{
            wishlist, toggleWish, isWished, removeFromWishlist,
            clearWishlist, count, wishlistOpen, setWishlistOpen
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error('useWishlist debe usarse dentro de WishlistProvider');
    return ctx;
}