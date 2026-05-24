
import { useState, useRef, useEffect } from "react";

const slides = [
  {
    id: 1,
    tag: "DE LO MÁS EXCLUSIVO",
    tagClass: "bg-purple-500 text-white shadow-lg shadow-purple-500/20",
    title: "Nosotros en\nla luna",
    subtitle: "en CookiBooks Del 1 al 20 de mayo",
    cta: "Firmado por el autor (1,000 disponibles)",
    bgClass: "from-[#463957] via-[#6C5091] to-[#AA79ED]",
    accentColor: "#f5d0fe",
    textLight: true,
    covers: [
      "https://m.media-amazon.com/images/I/81Cx7pQxUEL.jpg",
      "https://www.planetadelibros.com.mx/usuaris/libros/thumbs/75e8db2b-2b57-4d80-b2b3-c24ec56e9a38/d_360_620/444303_nosotros-en-la-luna-edicion-especial-con-cantos-decorados_9788408310525_contra_202509191217.webp",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjE6vZX5N734rXnrwL1UfrQlAhLTTcIyGAHD2NQVwS1w6foXSq2sQj7SRnocsk44Rm1erHOJtUr6ENnwQLi95xJrTxkBcHyo8e-ElQkHX_Sy6DQ_BoaFgt_H7q2L3cAYggD8WGap9i6xzZ767I8PEGYQulHSnxeCPuZbxsqcXTQy5RB4Sq_Up2yi0D8Mg/s3870/nosotrosenlaluna-HQ.jpg",
    ],
  },
  {
    id: 2,
    tag: "QUE NOVEDAD",
    tagClass: "bg-red-700 text-white",
    title: "El chico que\ndibujaba constelaciones",
    subtitle: "Las mejores lecturas de la temporada",
    cta: "Encuentra tu próxima lectura favorita",
    bgClass: "from-[#78B870] via-[#68AD5E] to-[#BCF5B3]",
    accentColor: "#e6e225",
    textLight: true,
    covers: [
      "https://m.media-amazon.com/images/I/61+eBLOKN6L.jpg",
      "https://cdn.agapea.com/Editorial-Planeta/El-chico-que-dibujaba-constelaciones-i7n19823053c.jpg",
      "https://lalocomotoraazul.cl/wp-content/uploads/2022/11/IMG_20221121_175409.jpg"
    ],
  },
  {
    id: 3,
    tag: "LO MÁS ESPECIAL",
    tagClass: "bg-white/15 text-amber-100 border border-white/30",
    title: "Al final\nmueren los dos",
    subtitle: "Un libro para mentes abiertas",
    cta: "No te quedes sin el tuyo",
    bgClass: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accentColor: "#ffffff",
    textLight: true,
    covers: [
      "https://m.media-amazon.com/images/I/818SMlbGApL.jpg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaK90-pK-_QMrXigt9rDLxYnngwTxVnE54Ti5jB9edfb1SeCgcAkE9DPos6ESlWWoSnnVI7AZbdeLiU7EpZLDkqBqdte4uFszMtuFmWtt1Zg4M_APtcXL4BFdJT_4NY3xAx3wQeMao3p7h/s1600/tumblr_p9o1rcDWae1tyz2d0o1_500.jpg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnWwHLgzjZ33OD6dH3RaMdF28l6ZEUOQKrmVuDOprsdBeZCIpQ390ML360cgsBizBqL8sG7o3Xx9aHvMgdJVszPVi_r_m4rZRAf_3bWtYb73dfz2Y8Ye1-CsawgHJRVqRfMqdUClcXvFdW/s1600/AL+FINAL+MUEREN+LOS+DOS+CONTRA.jpg"
    ],
  },
  {
    id: 4,
    tag: "UN CLÁSICO IMPERDIBLE",
    tagClass: "bg-white/15 text-amber-100 border border-white/30",
    title: "No me llames\nloca",
    subtitle: "La historia de una mujer que desafió su época",
    cta: "Una novela que te hará reflexionar",
    bgClass: "from-[#736D6B] via-[#A1847A] to-[#D9AA9A]",
    accentColor: "#ffffff",
    textLight: true,
    covers: [
      "https://mascultura.mx/wp-content/uploads/2025/09/Headers-fbtw-302-8.jpg",
      "https://m.media-amazon.com/images/I/7190Mnal2uL._AC_UF1000,1000_QL80_.jpg",
      "https://www.virtualgdl.com/wp-content/uploads/2025/09/Gilraen-Earfalas.webp"
    ],
  },
  {
    id: 5,
    tag: "LA NOVELA QUE TODOS LEEN",
    tagClass: "bg-white/15 text-amber-100 border border-white/30",
    title: "Petalos de\npapel",
    subtitle: "Una historia de amor y resiliencia",
    cta: "Un libro que te llegará al corazón",
    bgClass: "from-[#A57DAB] via-[#DFA7E8] to-[#DB8EE8]",
    accentColor: "#ffffff",
    textLight: true,
    covers: [
      "https://m.media-amazon.com/images/I/71+TU+OyMkL._AC_UF1000,1000_QL80_.jpg",
      "https://m.media-amazon.com/images/I/81dY9hEYtnL._AC_UF1000,1000_QL80_.jpg",
      "https://i.etsystatic.com/14652458/r/il/cbf05a/3309660418/il_fullxfull.3309660418_hmka.jpg"
    ],
  },
  {
    id: 6,
    tag: "SENTIMIENTAL Y PROFUNDA",
    tagClass: "bg-white/15 text-amber-100 border border-white/30",
    title: "Fabricante de\nlagrimas",
    subtitle: "Historias y leyendas a la luz de las velas",
    cta: "Un libro que te hará sentir cada emoción",
    bgClass: "from-[#344245] via-[#6496A1] to-[#9AE1F5]",
    accentColor: "#ffffff",
    textLight: true,
    covers: [
      "https://m.media-amazon.com/images/I/818dQkV5mrL.jpg",
      "https://http2.mlstatic.com/D_NQ_NP_992332-MLA87437895791_072025-O.webp",
      "https://occ-0-8407-114.1.nflxso.net/dnm/api/v6/MgXQGyNr1xbI8tJSYiMWv5kXg5g/AAAABbcE2Ic1TQ5u3k4MlLFai5g_DLKetBtIv4Oa84CWw7N8vB5MNCzKHrW75PwwPoWIZ4Sp7ae7lJwlXJjTMm29PTSxvjLl_V0k-aoqAy4Grg3Kjv-9_Ie05Gi0nA.jpg?r=dce"
    ],
  },
];
export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % slides.length;
        scrollRef.current?.scrollTo({
          left: scrollRef.current.clientWidth * next,
          behavior: "smooth",
        });
        return next;
      });
    }, 3000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex !== active) setActive(newIndex);
    }
  };

  const scrollToSlide = (index) => {
    stopAutoplay();
    scrollRef.current?.scrollTo({
      left: scrollRef.current.clientWidth * index,
      behavior: "smooth",
    });
    setActive(index);
    setTimeout(() => startAutoplay(), 5000);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full snap-start bg-gradient-to-br ${slide.bgClass} transition-all duration-700`}
          >
            <div className="max-w-6xl mx-auto px-6 py-10 pb-20 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className={`flex-1 max-w-lg text-center md:text-left ${slide.textLight ? "text-amber-100" : "text-stone-900"}`}>
                <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase mb-4 ${slide.tagClass}`}>
                  {slide.tag}
                </span>
                <h1
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold italic leading-tight mb-4"
                  style={{ color: slide.accentColor }}
                >
                  {slide.title.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
                </h1>
                <p className="text-sm opacity-80 mb-6">{slide.cta}</p>
              </div>

              <div className="flex items-end gap-3 flex-shrink-0 scale-90 sm:scale-100 md:scale-110">
                <div className="w-32 h-48 md:w-44 md:h-60 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                  <img src={slide.covers[0]} className="w-full h-full object-cover" alt="Cover" />
                </div>
                <div className="flex flex-col gap-2 pb-2">
                  {slide.covers.slice(1, 3).map((c, i) => (
                    <div key={i} className="w-14 h-20 md:w-20 md:h-28 rounded shadow-lg overflow-hidden border border-white/10">
                      <img src={c} className="w-full h-full object-cover" alt="Thumb" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          className="h-full bg-white/40 transition-all duration-300"
          style={{ width: `${((active + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === active ? "scale-125 shadow-lg" : "bg-white/30"}`}
            style={i === active ? { background: slides[active].accentColor } : {}}
          />
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}