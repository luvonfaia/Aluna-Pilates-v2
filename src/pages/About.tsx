import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useContactModal } from '../context/ContactModalContext';

export default function About() {
    const { t } = useTranslation();
    const { openModal } = useContactModal();

    return (
        <div id="about">
            {/* Hero */}
            <section className="relative py-24 bg-aluna-charcoal overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-aluna-charcoal/70 to-aluna-charcoal/90" />
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-3xl"
                    >
                        <p className="label-eyebrow text-aluna-gold mb-6">{t('nav.about')}</p>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
                            {t('about.hero.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/65 font-light leading-relaxed max-w-xl">
                            {t('about.hero.desc')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 md:order-1 relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070"
                                alt="Studio Interior"
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-aluna-gold/15 -z-10 hidden md:block" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 md:order-2"
                        >
                            <p className="label-eyebrow mb-6">Our Story</p>
                            <h2 className="text-3xl md:text-4xl font-serif text-aluna-charcoal mb-8 leading-tight">
                                {t('about.sanctuary.title')}
                            </h2>
                            <div className="w-12 h-px bg-aluna-gold mb-8" />
                            <p className="text-aluna-stone text-lg leading-relaxed mb-6 font-light">
                                {t('about.sanctuary.desc1')}
                            </p>
                            <p className="text-aluna-stone text-lg leading-relaxed font-light">
                                {t('about.sanctuary.desc2')}
                            </p>
                            <div className="mt-10">
                                <button onClick={openModal} className="btn-primary cursor-pointer">
                                    {t('nav.book')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-28 bg-aluna-cream">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="label-eyebrow mb-5">{t('about.instructors.title')}</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-aluna-charcoal">Meet the Team</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i - 1) * 0.12, duration: 0.7 }}
                                className="group"
                            >
                                <div className="w-full h-[420px] bg-aluna-stone/10 mb-6 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-aluna-charcoal/0 group-hover:bg-aluna-charcoal/8 transition-colors duration-500" />
                                    <div className="w-full h-full bg-aluna-stone/15 flex items-center justify-center text-aluna-stone/30">
                                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-serif text-aluna-charcoal mb-1">Instructor Name</h3>
                                <p className="text-aluna-gold text-[10px] uppercase tracking-[0.3em] mb-3">{t('about.instructors.role')}</p>
                                <p className="text-aluna-stone/75 text-sm leading-relaxed font-light">
                                    {t('about.instructors.bio')}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
