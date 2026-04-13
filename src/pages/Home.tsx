import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef, useEffect, lazy, Suspense } from 'react';
import { scrollToSection } from '../hooks/useActiveSection';
import { GMA_BOOKING_URL } from '../config/formConfig';
import WaveTransition from '../components/canvas/WaveTransition';
import ScheduleSection from '../components/sections/ScheduleSection';
import PricingSection from '../components/sections/PricingSection';
import ReviewsSection from '../components/sections/ReviewsSection';
import LocationSection from '../components/sections/LocationSection';

// Lazy-load Three.js components so the vendor chunk loads async after first paint
const PhilosophyTorus = lazy(() => import('../components/canvas/PhilosophyTorus'));

export default function Home() {
    const { t } = useTranslation();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75;
        }
    }, []);

    return (
        <>
        <Helmet><link rel="canonical" href="https://alunareformerstudio.ro/" /></Helmet>
        <div id="home" className="overflow-hidden">
            {/* Hero Section – Full-screen video background */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Video */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    aria-hidden="true"
                >
                    <source src="/intro.mp4" type="video/mp4" />
                </video>

                {/* Layered gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/65 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-[1]" />

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl sm:text-7xl md:text-[7rem] font-serif italic text-white mb-4 sm:mb-7 leading-[1.05] sm:leading-[0.95] tracking-tight"
                    >
                        {(() => {
                            const parts = t('home.hero.title').split('|');
                            if (parts.length === 2) {
                                const words = parts[0].trimEnd().split(' ');
                                const lastWord = words.pop();
                                return (
                                    <>
                                        {words.join(' ')}{' '}
                                        <span className="whitespace-nowrap">
                                            {lastWord}<span className="text-aluna-gold not-italic"> |</span>{parts[1]}
                                        </span>
                                    </>
                                );
                            }
                            return t('home.hero.title');
                        })()}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.75 }}
                        className="text-base md:text-xl text-white/75 font-light mb-8 sm:mb-12 max-w-lg mx-auto leading-relaxed tracking-wide"
                    >
                        {t('home.hero.subtitle')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a
                            href={GMA_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary-light"
                        >
                            {t('nav.book')}
                        </a>
                        <button onClick={() => scrollToSection('pricing')} className="btn-ghost">
                            {t('nav.pricing')}
                        </button>
                    </motion.div>

                    {/* Opening offer badge — centered, below CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                        className="flex justify-center mt-8"
                    >
                        <button
                            onClick={() => scrollToSection('pricing')}
                            style={{
                                animation: 'badgeFloat 4s ease-in-out infinite, badgeBreathe 3.5s ease-in-out infinite',
                            }}
                            className="relative overflow-hidden flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/15 px-5 py-3 hover:bg-white/15 transition-colors duration-300 cursor-pointer"
                        >
                            {/* Gold shimmer sweep */}
                            <span
                                className="pointer-events-none absolute inset-0 w-1/3"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(201,182,138,0.35), transparent)',
                                    animation: 'goldShimmer 2.4s ease-in-out infinite',
                                    animationDelay: '1.5s',
                                }}
                            />
                            <div className="flex flex-col items-center leading-none relative z-10">
                                <span className="font-serif text-2xl text-white leading-none">10%</span>
                                <span className="text-[8px] uppercase tracking-widest text-aluna-gold mt-0.5">OFF</span>
                            </div>
                            <div className="w-px h-8 bg-white/20 relative z-10" />
                            <div className="text-left relative z-10">
                                <p className="text-white text-[10px] uppercase tracking-[0.2em] font-medium">{t('home.hero.offer_badge_title')}</p>
                                <p className="text-white/55 text-[9px] tracking-wide mt-0.5">{t('home.hero.offer_badge_sub')}</p>
                            </div>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Wave divider — rises between hero and philosophy on scroll */}
            <WaveTransition />

            {/* Philosophy */}
            <section id="philosophy" className="py-36 bg-aluna-alabaster text-center relative overflow-hidden">
                {/* 3D torus rings — lazy-loaded, WebGL, rotates on scroll */}
                <Suspense fallback={null}>
                    <PhilosophyTorus />
                </Suspense>

                {/* Decorative rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-aluna-gold/8 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-aluna-gold/12 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-aluna-gold/18 pointer-events-none" />

                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="w-px h-14 bg-gradient-to-b from-transparent to-aluna-gold/50 mx-auto mb-12" />
                        <p className="label-eyebrow mb-8 text-aluna-gold/70">
                            {t('home.philosophy.title')}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-serif mb-10 text-aluna-charcoal italic leading-tight">
                            {t('home.philosophy.quote')}
                        </h2>
                        <p className="text-base text-aluna-stone/65 leading-relaxed max-w-xl mx-auto font-light">
                            {t('home.philosophy.desc')}
                        </p>
                        <p className="mt-5 text-base text-aluna-stone/65 leading-relaxed max-w-xl mx-auto font-light">
                            {t('home.philosophy.desc2')}
                        </p>
                        <div className="w-px h-14 bg-gradient-to-b from-aluna-gold/50 to-transparent mx-auto mt-12" />
                    </motion.div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-24 md:py-32 bg-aluna-cream">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-14 md:mb-20"
                    >
                        <p className="label-eyebrow mb-4">{t('about.split.eyebrow')}</p>
                        <h2 className="text-4xl md:text-6xl font-serif text-aluna-charcoal leading-tight max-w-xl">
                            {t('about.hero.title')}
                        </h2>
                        <div className="w-12 h-px bg-aluna-gold mt-8" />
                    </motion.div>

                    {/* Two-column body */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
                        <div className="space-y-6">
                            {([1, 2] as const).map((n, i) => (
                                <motion.p
                                    key={n}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className={`leading-relaxed font-light text-aluna-stone ${n === 1 ? 'text-lg' : 'text-base'}`}
                                >
                                    {t(`about.split.p${n}`)}
                                </motion.p>
                            ))}
                        </div>
                        <div className="space-y-6">
                            {([3, 4] as const).map((n, i) => (
                                <motion.p
                                    key={n}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-base leading-relaxed font-light text-aluna-stone"
                                >
                                    {t(`about.split.p${n}`)}
                                </motion.p>
                            ))}
                        </div>
                    </div>

                    {/* Closing pull-quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-14 pt-10 border-t border-aluna-stone/15 flex items-start gap-4"
                    >
                        <div className="w-0.5 self-stretch flex-shrink-0 bg-aluna-gold/60 rounded-full" />
                        <div>
                            <p className="text-xl md:text-2xl font-serif text-aluna-charcoal italic leading-snug mb-1">
                                {t('about.closing.line1')}
                            </p>
                            <p className="text-xl md:text-2xl font-serif text-aluna-gold italic leading-snug">
                                {t('about.closing.line2')}
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>

            <ScheduleSection />
            <PricingSection />
            <ReviewsSection />
            <LocationSection />
        </div>
        </>
    );
}
