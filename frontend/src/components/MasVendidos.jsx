import { useState, useEffect } from 'react';
import BookCard from './BookCard';

export default function MasVendidos() {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        fetch('/api/libros')
            .then(res => res.json())
            .then(data => {
                const masVendidos = data
                    .filter(l => l.existencias >= 0 && l.existencias <= 15)
                    .sort((a, b) => a.existencias - b.existencias)
                    .slice(0, 10);
                setLibros(masVendidos);
            })
            .catch(() => {});
    }, []);

    if (libros.length === 0) return null;

    return (
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl"></span>
                <div>
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-stone-900 italic">
                        Los más vendidos
                    </h2>
                    <p className="text-xs text-stone-400 mt-0.5">
                        Últimas unidades disponibles — ¡no te quedes sin el tuyo!
                    </p>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                {libros.map(libro => (
                    <BookCard key={libro.id_libro} book={libro} />
                ))}
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}