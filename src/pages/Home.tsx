import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef, useEffect, lazy, Suspense } from 'react';
import { scrollToSection } from '../hooks/useActiveSection';
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
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-white/60 uppercase tracking-[0.45em] text-[11px] mb-4 sm:mb-7 font-light"
                    >
                        Reformer Pilates Studio
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-7xl md:text-[7rem] font-serif text-white mb-4 sm:mb-7 leading-[0.95] sm:leading-[0.92] tracking-tight"
                    >
                        {t('home.hero.title')}
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
                        <button onClick={() => scrollToSection('schedule')} className="btn-primary-light">
                            {t('nav.schedule')}
                        </button>
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
                        <h2 className="text-3xl md:text-5xl font-serif mb-8 text-aluna-charcoal italic leading-tight">
                            {t('home.philosophy.title')}
                        </h2>
                        <p className="text-xl md:text-2xl text-aluna-stone leading-relaxed font-light italic">
                            &ldquo;{t('home.philosophy.quote')}&rdquo;
                        </p>
                        <p className="mt-8 text-base text-aluna-stone/65 leading-relaxed max-w-xl mx-auto font-light">
                            {t('home.philosophy.desc')}
                        </p>
                        <div className="w-px h-14 bg-gradient-to-b from-aluna-gold/50 to-transparent mx-auto mt-12" />
                    </motion.div>
                </div>
            </section>

            <ScheduleSection />
            <PricingSection />
            <ReviewsSection />
            <LocationSection />
        </div>
    );
}
