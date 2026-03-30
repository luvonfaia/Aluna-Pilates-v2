import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import spotlightImg from '../assets/spotlight-studio.jpg';
import { scrollToSection } from '../hooks/useActiveSection';

export default function Home() {
    const { t } = useTranslation();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75;
        }
    }, []);

    const classesList = [
        {
            title: t('home.class_types.reformer_flow.title'),
            level: t('home.levels.all'),
            desc: t('home.class_types.reformer_flow.desc')
        },
        {
            title: t('home.class_types.sculpt_tone.title'),
            level: t('home.levels.intermediate'),
            desc: t('home.class_types.sculpt_tone.desc')
        },
        {
            title: t('home.class_types.stretch_restore.title'),
            level: t('home.levels.gentle'),
            desc: t('home.class_types.stretch_restore.desc')
        }
    ];

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
                        className="text-white/60 uppercase tracking-[0.45em] text-[11px] mb-7 font-light"
                    >
                        Reformer Pilates Studio
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl sm:text-7xl md:text-[7rem] font-serif text-white mb-7 leading-[0.92] tracking-tight"
                    >
                        {t('home.hero.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.75 }}
                        className="text-lg md:text-xl text-white/75 font-light mb-12 max-w-lg mx-auto leading-relaxed tracking-wide"
                    >
                        {t('home.hero.subtitle')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button onClick={() => scrollToSection('classes')} className="btn-primary-light">
                            {t('home.hero.cta')}
                        </button>
                        <button onClick={() => scrollToSection('about')} className="btn-ghost">
                            {t('home.spotlight.cta')}
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-36 bg-aluna-alabaster text-center relative overflow-hidden">
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

            {/* Classes Teaser */}
            <section className="py-32 bg-aluna-cream">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-aluna-gold uppercase tracking-[0.35em] text-[10px] mb-4 font-medium">
                                {t('nav.classes')}
                            </p>
                            <h2 className="text-4xl md:text-5xl font-serif text-aluna-charcoal mb-4">
                                {t('home.classes_teaser.title')}
                            </h2>
                            <p className="text-aluna-stone font-light max-w-md leading-relaxed">
                                {t('home.classes_teaser.subtitle')}
                            </p>
                        </motion.div>
                        <button
                            onClick={() => scrollToSection('classes')}
                            className="hidden md:flex items-center gap-2 text-aluna-charcoal hover:text-aluna-gold uppercase tracking-widest text-[10px] border-b border-aluna-charcoal/40 hover:border-aluna-gold pb-1 transition-all duration-300 mt-6 cursor-pointer"
                        >
                            {t('home.classes_teaser.view_all')}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {classesList.map((cls, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="group bg-aluna-alabaster p-10 hover:bg-aluna-charcoal transition-all duration-500 cursor-pointer"
                            >
                                <div className="h-px w-12 bg-aluna-gold mb-8 group-hover:w-full transition-all duration-700" />
                                <span className="inline-block text-[10px] uppercase tracking-[0.35em] text-aluna-stone/70 group-hover:text-aluna-gold/60 mb-5 transition-colors duration-300">
                                    {cls.level}
                                </span>
                                <h3 className="text-2xl font-serif text-aluna-charcoal group-hover:text-aluna-alabaster mb-4 transition-colors duration-300">
                                    {cls.title}
                                </h3>
                                <p className="text-aluna-stone/75 group-hover:text-aluna-alabaster/55 font-light leading-relaxed mb-8 text-sm transition-colors duration-300">
                                    {cls.desc}
                                </p>
                                <span className="inline-flex items-center gap-2 text-aluna-gold text-[10px] uppercase tracking-[0.25em] group-hover:tracking-[0.35em] transition-all duration-500">
                                    {t('home.classes_teaser.learn_more')}
                                    <span>→</span>
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <button
                            onClick={() => scrollToSection('classes')}
                            className="text-aluna-charcoal hover:text-aluna-gold uppercase tracking-widest text-xs border-b border-aluna-charcoal hover:border-aluna-gold pb-1 transition-colors cursor-pointer"
                        >
                            {t('home.classes_teaser.view_all')} →
                        </button>
                    </div>
                </div>
            </section>

            {/* Instructor / Studio Spotlight */}
            <section className="flex flex-col md:flex-row h-auto md:h-[700px]">
                <div className="w-full md:w-1/2 h-[420px] md:h-full relative overflow-hidden">
                    <img
                        src={spotlightImg}
                        alt="Aluna Reformer Studio"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-aluna-charcoal/30" />
                </div>
                <div className="w-full md:w-1/2 bg-aluna-charcoal text-aluna-alabaster p-12 md:p-20 xl:p-28 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-aluna-gold uppercase tracking-[0.35em] text-[10px] mb-8 font-medium">Studio</p>
                        <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                            {t('home.spotlight.title')}
                        </h2>
                        <div className="w-12 h-px bg-aluna-gold/40 mb-8" />
                        <p className="text-aluna-alabaster/65 font-light leading-relaxed mb-12 max-w-md text-lg">
                            {t('home.spotlight.desc')}
                        </p>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="btn-secondary border-aluna-gold/40 text-aluna-alabaster hover:bg-aluna-gold/15 hover:border-aluna-gold/70 transition-all duration-300 cursor-pointer"
                        >
                            {t('home.spotlight.cta')}
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
