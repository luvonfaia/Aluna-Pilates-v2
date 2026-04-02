import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const EASE_OUT: [number, number, number, number] = [0.25, 1, 0.5, 1];
const REVEAL = {
    hidden: { opacity: 0, y: 16 },
    show:   { opacity: 1, y: 0 },
};

export default function About() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    // ESC to close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate('/'); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [navigate]);

    return (
        <div
            id="about"
            className="fixed inset-0 z-[170] bg-black/40 flex flex-col items-center justify-center px-4 pt-20 pb-4"
        >
            {/* Backdrop — click to close */}
            <div className="absolute inset-0" onClick={() => navigate('/')} aria-hidden="true" />

            <div className="relative w-full sm:w-[min(520px,calc(100%-64px))] flex flex-col items-center">

                {/* Close button — identical to ContactModal */}
                <motion.button
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
                    onClick={() => navigate('/')}
                    className="w-11 h-11 mb-3 rounded-full bg-white/90 backdrop-blur-sm border border-aluna-stone/15 shadow-lg flex items-center justify-center text-aluna-stone hover:text-aluna-charcoal hover:border-aluna-gold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aluna-gold flex-shrink-0 cursor-pointer"
                    aria-label="Close"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>

                {/* Panel — slides up from below */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE_OUT }}
                    className="w-full"
                >
                    <div
                        ref={scrollRef}
                        className="bg-aluna-cream rounded-3xl sm:rounded-[24px] shadow-2xl overflow-y-auto w-full"
                        style={{
                            maxHeight: 'calc(100vh - 152px)',
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehavior: 'contain',
                        }}
                    >
                        {/* Header */}
                        <div className="px-8 pt-6 pb-0 sm:px-10 sm:pt-8">
                            <p className="label-eyebrow mb-2">{t('about.split.eyebrow')}</p>
                            <h2 className="text-2xl sm:text-3xl font-serif text-aluna-charcoal">
                                {t('about.hero.title')}
                            </h2>
                            <div className="w-10 h-px bg-aluna-gold mt-5" />
                        </div>

                        {/* Body */}
                        <div className="px-8 pt-6 pb-8 sm:px-10 sm:pb-10 space-y-5">

                            {/* Four narrative paragraphs */}
                            {([1, 2, 3, 4] as const).map((n, i) => (
                                <motion.p
                                    key={n}
                                    variants={REVEAL}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.1, root: scrollRef }}
                                    transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                    className={`leading-relaxed font-light text-aluna-stone ${n === 1 ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
                                >
                                    {t(`about.split.p${n}`)}
                                </motion.p>
                            ))}

                            {/* Gold pull-quote — closing statement */}
                            <motion.div
                                variants={REVEAL}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.1, root: scrollRef }}
                                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                className="pt-5 border-t border-aluna-stone/15"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-0.5 mt-1 self-stretch flex-shrink-0 bg-aluna-gold/60 rounded-full" />
                                    <div>
                                        <p className="text-sm sm:text-base font-serif text-aluna-charcoal italic leading-snug mb-1">
                                            {t('about.closing.line1')}
                                        </p>
                                        <p className="text-sm sm:text-base font-serif text-aluna-gold italic leading-snug">
                                            {t('about.closing.line2')}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>


                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
