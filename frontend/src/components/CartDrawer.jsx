import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onCompraExitosa }) {
    const { cart, removeFromCart, updateQty, clearCart, total, count, checkoutOpen, setCheckoutOpen } = useCart();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [status, setStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    if (!checkoutOpen) return null;

    const handleCompra = async () => {
        if (!nombre.trim()) return setErrorMsg('Por favor ingresa tu nombre.');
        if (!correo.trim()) return setErrorMsg('El correo es requerido para recibir la cotización.');
        if (cart.length === 0) return setErrorMsg('Tu carrito está vacío.');

        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/ventas/compra', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    correo,
                    totalConIva: parseFloat((total * 1.16).toFixed(2)),
                    carrito: cart.map(item => ({ id_libro: item.id_libro, cantidad: item.cantidad }))
                })
            });

            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.msg || 'Error al procesar la cotización');

            setStatus('success');
            clearCart();
            if (onCompraExitosa) onCompraExitosa();
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setCheckoutOpen(false)} />

            <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-900">
                    <h2 className="font-serif text-lg font-bold text-amber-100 italic">Tu carrito ({count})</h2>
                    <button onClick={() => setCheckoutOpen(false)} className="text-amber-100/60 hover:text-amber-100 text-2xl leading-none">×</button>
                </div>

                {status === 'success' ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                        <span className="text-5xl">🍪</span>
                        <h3 className="font-serif text-xl font-bold text-stone-900 text-center">¡Cotización enviada!</h3>
                        <p className="text-sm text-stone-500 text-center">
                            Revisa tu correo, te enviamos el detalle de tu cotización. Responde ese correo para confirmar tu pedido.
                        </p>
                        <button
                            onClick={() => { setStatus(null); setCheckoutOpen(false); }}
                            className="mt-4 bg-stone-900 text-amber-100 px-6 py-2 rounded font-bold text-sm hover:bg-red-700 transition-colors"
                        >
                            Seguir explorando
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
                            {cart.length === 0 ? (
                                <p className="text-center text-stone-400 mt-10 text-sm">Tu carrito está vacío 😢</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id_libro} className="flex gap-3 border-b border-stone-100 pb-3">
                                        {(item.imagen_url) && (
                                            <img
                                                src={item.imagen_url}
                                                alt={item.nombre}
                                                className="w-12 h-16 object-cover rounded shadow"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-serif text-sm font-bold text-stone-900 truncate">{item.nombre}</p>
                                            <p className="text-xs text-stone-400">${parseFloat(item.precio).toFixed(2)} c/u</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button onClick={() => updateQty(item.id_libro, item.cantidad - 1)}
                                                    className="w-6 h-6 rounded bg-stone-100 text-stone-700 hover:bg-red-100 font-bold text-sm">−</button>
                                                <span className="text-sm font-bold w-4 text-center">{item.cantidad}</span>
                                                <button onClick={() => updateQty(item.id_libro, item.cantidad + 1)}
                                                    className="w-6 h-6 rounded bg-stone-100 text-stone-700 hover:bg-red-100 font-bold text-sm">+</button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <button onClick={() => removeFromCart(item.id_libro)}
                                                className="text-stone-300 hover:text-red-700 text-lg">×</button>
                                            <span className="font-serif font-bold text-stone-900 text-sm">
                                                ${(parseFloat(item.precio) * item.cantidad).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="border-t border-stone-200 px-5 py-4 flex flex-col gap-3">
                                <div className="flex justify-between items-center text-sm text-stone-500">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-stone-500">
                                    <span>IVA (16%)</span>
                                    <span>${(total * 0.16).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-stone-200 pt-2">
                                    <span className="font-bold text-stone-700">Total</span>
                                    <span className="font-serif text-xl font-bold text-stone-900">${(total * 1.16).toFixed(2)}</span>
                                </div>
                                <input type="text" placeholder="Tu nombre *" value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    className="border border-stone-300 rounded px-3 py-2 text-sm outline-none focus:border-stone-900" />
                                <input type="email" placeholder="Correo electrónico *" value={correo}
                                    onChange={e => setCorreo(e.target.value)}
                                    className="border border-stone-300 rounded px-3 py-2 text-sm outline-none focus:border-stone-900" />
                                {errorMsg && <p className="text-red-700 text-xs">{errorMsg}</p>}
                                <button onClick={handleCompra} disabled={status === 'loading'}
                                    className="w-full bg-stone-900 text-amber-100 font-bold py-3 rounded hover:bg-red-700 transition-colors disabled:opacity-50">
                                    {status === 'loading' ? 'Enviando cotización...' : 'Solicitar cotización 🍪'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
