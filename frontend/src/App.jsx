import { useState } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroBanner from './components/Banner';
import CategoryNav from './components/Category';
import BookSection from './components/BookSection';
import MasVendidos from './components/MasVendidos';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AdminPanel from './components/AdminPanel';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { useLibros } from './hooks/useLibros';
import { trendingBooks, mostReadBooks } from './data/mockData';

function AppContent() {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [adminOpen, setAdminOpen] = useState(false);
    const { libros, loading, refetch } = useLibros(activeCategory);

    const hasBEBooks = libros.length > 0;
    const allBooks = hasBEBooks ? libros : [...trendingBooks, ...mostReadBooks];

    const filteredBooks = query.trim()
        ? allBooks.filter(b =>
            (b.nombre || b.title || '').toLowerCase().includes(query.toLowerCase()) ||
            (b.Autor?.nombre || b.author || '').toLowerCase().includes(query.toLowerCase())
          )
        : allBooks;

    const isSearching = query.trim().length > 0;

    const sectionTitle = activeCategory
        ? 'Categoría seleccionada'
        : hasBEBooks ? 'Nuestro catálogo' : 'De lo que todos están hablando';

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <TopBar />
            <Header query={query} setQuery={setQuery} />
            <CartDrawer onCompraExitosa={refetch} />
            <WishlistDrawer />
            {adminOpen && (
                <AdminPanel onClose={() => { setAdminOpen(false); refetch(); }} />
            )}
            <main className="flex-1">
                {!isSearching && <HeroBanner />}
                <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <div className="flex flex-col pb-10">
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <p className="text-stone-400 font-serif italic animate-pulse">Cargando libros...</p>
                        </div>
                    ) : isSearching ? (
                        filteredBooks.length > 0 ? (
                            <BookSection title={`Resultados para "${query}" (${filteredBooks.length})`} books={filteredBooks} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 gap-3">
                                <span className="text-5xl">📚</span>
                                <p className="font-serif text-lg text-stone-500 italic">No encontramos libros para "{query}"</p>
                            </div>
                        )
                    ) : (
                        <>
                            {/* Sección más vendidos — solo cuando no hay categoría activa */}
                            {!activeCategory && <MasVendidos />}

                            {/* Separador */}
                            {!activeCategory && (
                                <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
                                    <hr className="border-stone-200" />
                                </div>
                            )}

                            <BookSection title={sectionTitle} books={filteredBooks} />

                            {!hasBEBooks && !activeCategory && (
                                <BookSection title="Los más leídos" books={mostReadBooks} />
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer onAdminAccess={() => setAdminOpen(true)} />
        </div>
    );
}

export default function App() {
    return (
        <CartProvider>
            <WishlistProvider>
                <AppContent />
            </WishlistProvider>
        </CartProvider>
    );
}