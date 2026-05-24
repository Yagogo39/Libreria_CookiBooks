import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const addToCart = (book) => {
        setCart(prev => {
            const exists = prev.find(item => item.id_libro === book.id_libro);
            if (exists) {
                return prev.map(item =>
                    item.id_libro === book.id_libro
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prev, { ...book, cantidad: 1 }];
        });
    };

    const removeFromCart = (id_libro) => {
        setCart(prev => prev.filter(item => item.id_libro !== id_libro));
    };

    const updateQty = (id_libro, cantidad) => {
        if (cantidad <= 0) return removeFromCart(id_libro);
        setCart(prev => prev.map(item =>
            item.id_libro === id_libro ? { ...item, cantidad } : item
        ));
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((acc, item) => acc + parseFloat(item.precio) * item.cantidad, 0);
    const count = cart.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQty, clearCart,
            total, count, checkoutOpen, setCheckoutOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
    return ctx;
}
