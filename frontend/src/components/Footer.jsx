import { useState, useRef } from 'react';

const PIN_CORRECTO = '2846'; // cambia esto por tu PIN

export default function Footer({ onAdminAccess }) {
    const [showPin, setShowPin] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleDoubleClick = () => {
        setShowPin(true);
        setPin('');
        setError(false);
    };

    const handleDigit = (d) => {
        if (pin.length >= 4) return;
        const newPin = pin + d;
        setPin(newPin);
        setError(false);

        if (newPin.length === 4) {
            setTimeout(() => {
                if (newPin === PIN_CORRECTO) {
                    setShowPin(false);
                    setPin('');
                    if (onAdminAccess) onAdminAccess();
                } else {
                    setError(true);
                    setShake(true);
                    setTimeout(() => { setPin(''); setShake(false); }, 600);
                }
            }, 200);
        }
    };

    const handleDelete = () => setPin(prev => prev.slice(0, -1));

    return (
        <>
            <footer className="bg-stone-900 py-6 flex items-center justify-center">
                <span
                    onDoubleClick={handleDoubleClick}
                    className="font-serif italic text-amber-100/40 text-sm tracking-widest cursor-default select-none"
                >
                    CookiBooks
                </span>
            </footer>

            {/* Modal PIN */}
            {showPin && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                        onClick={() => setShowPin(false)}>
                        <div
                            className={`bg-white rounded-2xl shadow-2xl p-8 w-72 flex flex-col items-center gap-5 ${shake ? 'animate-shake' : ''}`}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Icono */}
                            <div className="w-14 h-14 bg-stone-900 rounded-full flex items-center justify-center">
                                <span className="text-amber-100 text-2xl">🔐</span>
                            </div>

                            <h3 className="font-serif font-bold text-stone-900 text-lg">Acceso Admin</h3>

                            {/* Puntos del PIN */}
                            <div className="flex gap-3">
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all duration-150
                                        ${i < pin.length
                                            ? error ? 'bg-red-700 border-red-700' : 'bg-stone-900 border-stone-900'
                                            : 'border-stone-300'}`}
                                    />
                                ))}
                            </div>

                            {error && <p className="text-red-700 text-xs font-bold">PIN incorrecto</p>}

                            {/* Teclado numérico */}
                            <div className="grid grid-cols-3 gap-3 w-full">
                                {[1,2,3,4,5,6,7,8,9].map(n => (
                                    <button
                                        key={n}
                                        onClick={() => handleDigit(String(n))}
                                        className="h-12 rounded-xl bg-stone-100 hover:bg-stone-200 font-bold text-stone-900 text-lg transition-colors active:scale-95"
                                    >
                                        {n}
                                    </button>
                                ))}
                                <button
                                    onClick={() => { setShowPin(false); setPin(''); }}
                                    className="h-12 rounded-xl bg-stone-100 hover:bg-red-100 text-red-700 font-bold text-sm transition-colors"
                                >
                                    ✕
                                </button>
                                <button
                                    onClick={() => handleDigit('0')}
                                    className="h-12 rounded-xl bg-stone-100 hover:bg-stone-200 font-bold text-stone-900 text-lg transition-colors active:scale-95"
                                >
                                    0
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="h-12 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-sm transition-colors"
                                >
                                    ⌫
                                </button>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes shake {
                            0%, 100% { transform: translateX(0); }
                            20% { transform: translateX(-8px); }
                            40% { transform: translateX(8px); }
                            60% { transform: translateX(-8px); }
                            80% { transform: translateX(8px); }
                        }
                        .animate-shake { animation: shake 0.5s ease-in-out; }
                    `}</style>
                </>
            )}
        </>
    );
}