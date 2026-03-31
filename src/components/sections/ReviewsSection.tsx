import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

const REVIEWS = [
    { name: "Elena Mergiu", text: "Echipa de profesioniști din domeniu și amenajarea conform celor mai înalte standarde sunt motivele pentru care aleg acest studio de pilates. Îl recomand cu căldură!" },
    { name: "Bianca E. V.", text: "O echipă foarte atentă, antrenamentele private și semi-private fac o diferență semnificativă în ceea ce privește execuția corectă a exercițiilor. Bonus, spațiul este curat și frumos decorat, recomand cu căldură!" },
    { name: "Oana Popescu", text: "Un spațiu modern, curat și bine organizat. Instructorii sunt profesioniști, răbdători și corectează postura în timpul exercițiilor, ceea ce face o mare diferență, mai ales pentru începători. Ședințele pot fi adaptate nivelului fiecărei persoane. Cu siguranță mă voi întoarce!" },
    { name: "Andreea M", text: "Recomand din toată inima Aluna Reformer Studio. Atmosfera este caldă și prietenoasă, iar profesionalismul se simte din prima ședință. Modul de lucru este foarte atent și personalizat, iar rezultatele se simt rapid – atât fizic, cât și ca stare de bine." },
    { name: "Nicoleta Ciurea", text: "Un loc care îți rămâne cu adevărat în suflet! Totul este superlativ: atmosfera, profesionalismul și energia oamenilor. M-am simțit minunat și m-aș întoarce oricând cu mare plăcere. Îl recomand din toată inima!" },
    { name: "Oana-Alexandra Petre", text: "Recomand cu căldură! Atmosferă foarte plăcută, instructori profesioniști și echipamente de calitate. M-am simțit excelent după fiecare ședință, iar faptul că antrenamentele sunt individualizate face o diferență uriașă. Deja văd rezultate!" },
    { name: "Vasilache Anca Maria", text: "Totul a fost minunat... Abia aștept să revin!" },
    { name: "Neicu Manuela", text: "Un loc cu o vibe bună, cu oameni super drăguți. Mi-a plăcut foarte mult, abia aștept să revin!" },
    { name: "Dibu Andreea", text: "Un loc cu o atmosferă prietenoasă, instructori foarte bine pregătiți care te susțin cu dedicare pe tot parcursul procesului! Un loc cald, fresh, o echipă fantastică! Recomand!! Top!" },
    { name: "Liliana Nicolae", text: "Instructori dedicați care lucrează cu tine exact ce ai nevoie. De asemenea, un spațiu foarte relaxant și frumos decorat." },
    { name: "Alexandra Ivan", text: "Ceea ce apreciez cel mai mult la acest studio de Pilates este faptul că antrenamentele sunt personalizate nevoilor mele și adaptate condiției mele. În plus, vibe-ul locului este uimitor! Îl recomand cu căldură!" },
    { name: "Loana Cazanescu", text: "Un spațiu frumos decorat și relaxant! Instructori buni și dedicați." },
    { name: "Ana-Maria Opris", text: "Studio grozav!" },
];

function getInitials(name: string): string {
    return name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}

function StarIcon() {
    return (
        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );
}

export default function ReviewsSection() {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const getCardsPerView = useCallback((): number => {
        if (typeof window === 'undefined') return 3;
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }, []);

    const scrollToIndex = useCallback((index: number) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const cardsPerView = getCardsPerView();
        const cardWidth = container.offsetWidth / cardsPerView;
        container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }, [getCardsPerView]);

    const goTo = useCallback((index: number) => {
        const clamped = Math.max(0, Math.min(index, REVIEWS.length - 1));
        setCurrentIndex(clamped);
        scrollToIndex(clamped);
        setIsUserInteracting(true);
        setTimeout(() => setIsUserInteracting(false), 6000);
    }, [scrollToIndex]);

    const goPrev = useCallback(() => {
        goTo(currentIndex === 0 ? REVIEWS.length - 1 : currentIndex - 1);
    }, [currentIndex, goTo]);

    const goNext = useCallback(() => {
        goTo(currentIndex === REVIEWS.length - 1 ? 0 : currentIndex + 1);
    }, [currentIndex, goTo]);

    // Auto-advance every 5 seconds
    useEffect(() => {
        if (isUserInteracting) {
            if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
            return;
        }
        autoAdvanceRef.current = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = prev === REVIEWS.length - 1 ? 0 : prev + 1;
                scrollToIndex(next);
                return next;
            });
        }, 5000);
        return () => {
            if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
        };
    }, [isUserInteracting, scrollToIndex]);

    // Sync currentIndex on scroll (snap detection)
    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const cardsPerView = getCardsPerView();
        const cardWidth = container.offsetWidth / cardsPerView;
        const newIndex = Math.round(container.scrollLeft / cardWidth);
        setCurrentIndex(Math.max(0, Math.min(newIndex, REVIEWS.length - 1)));
    }, [getCardsPerView]);

    return (
        <section id="reviews" className="bg-aluna-alabaster py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14"
                >
                    <p className="text-aluna-gold uppercase tracking-[0.35em] text-[10px] font-medium">
                        {t('reviews.eyebrow')}
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl text-aluna-charcoal mt-4 mb-3">
                        {t('reviews.headline')}
                    </h2>

                    {/* Google rating row */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="flex items-center gap-0.5 text-aluna-gold">
                            <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                        </span>
                        <span className="text-aluna-stone text-sm font-medium">5.0</span>
                        <span className="text-aluna-stone/50 text-sm">·</span>
                        <span className="text-aluna-stone text-sm">13 {t('reviews.count')}</span>
                    </div>
                </motion.div>

                {/* Carousel wrapper */}
                <div className="relative">
                    {/* Prev button */}
                    <button
                        onClick={goPrev}
                        aria-label="Previous review"
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-10 h-10 items-center justify-center bg-white shadow-md text-aluna-charcoal hover:bg-aluna-cream transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next button */}
                    <button
                        onClick={goNext}
                        aria-label="Next review"
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-10 h-10 items-center justify-center bg-white shadow-md text-aluna-charcoal hover:bg-aluna-cream transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Track */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 snap-x snap-mandatory"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {REVIEWS.map((review, i) => (
                            <div
                                key={i}
                                className="snap-start flex-shrink-0 w-[calc(100%-0px)] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                            >
                                <div className="bg-white shadow-sm p-7 h-full flex flex-col">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-aluna-cream flex items-center justify-center text-aluna-earth font-serif text-sm font-medium flex-shrink-0">
                                        {getInitials(review.name)}
                                    </div>

                                    {/* Name */}
                                    <p className="font-sans font-medium text-aluna-charcoal text-sm mt-3">
                                        {review.name}
                                    </p>

                                    {/* Stars */}
                                    <div className="flex items-center gap-0.5 mt-1 text-aluna-gold">
                                        <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                                    </div>

                                    {/* Text */}
                                    <p className="text-aluna-stone font-light text-sm leading-relaxed mt-3 line-clamp-4 flex-1">
                                        {review.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile prev/next buttons */}
                <div className="flex items-center justify-center gap-4 mt-6 sm:hidden">
                    <button
                        onClick={goPrev}
                        aria-label="Previous review"
                        className="w-10 h-10 flex items-center justify-center bg-white shadow-sm text-aluna-charcoal hover:bg-aluna-cream transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goNext}
                        aria-label="Next review"
                        className="w-10 h-10 flex items-center justify-center bg-white shadow-sm text-aluna-charcoal hover:bg-aluna-cream transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-1.5 mt-6">
                    {REVIEWS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to review ${i + 1}`}
                            className={`transition-all duration-300 rounded-full ${
                                i === currentIndex
                                    ? 'w-4 h-1.5 bg-aluna-gold'
                                    : 'w-1.5 h-1.5 bg-aluna-stone/30 hover:bg-aluna-stone/60'
                            }`}
                        />
                    ))}
                </div>

                {/* Google link */}
                <div className="text-center mt-10">
                    <a
                        href="https://maps.app.goo.gl/TTGnkHSrDtsadZdV9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aluna-stone/60 text-xs uppercase tracking-[0.25em] hover:text-aluna-gold transition-colors duration-200"
                    >
                        {t('reviews.view_all')}
                    </a>
                </div>
            </div>
        </section>
    );
}
