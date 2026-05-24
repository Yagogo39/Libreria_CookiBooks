import { useState, useEffect } from 'react';

export function useLibros(categoriaId = null) {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLibros = () => {
        setLoading(true);
        const url = categoriaId ? `/api/libros?categoria=${categoriaId}` : '/api/libros';
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('Error al cargar los libros');
                return res.json();
            })
            .then(data => { setLibros(data); setLoading(false); })
            .catch(err => {
                console.warn('Backend no disponible:', err.message);
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => { fetchLibros(); }, [categoriaId]);

    return { libros, loading, error, refetch: fetchLibros };
}