import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import { Link } from 'react-router-dom';

export default function Classes() {
    const { t } = useTranslation();

    const classes = [
        {
            title: t('classes.list.foundations.title'),
            description: t('classes.list.foundations.desc'),
            level: t('home.levels.beginner'),
            intensity: t('classes.intensities.low_medium')
        },
        {
            title: t('classes.list.signature.title'),
            description: t('classes.list.signature.desc'),
            level: t('home.levels.all'),
            intensity: t('classes.intensities.medium')
        },
        {
            title: t('classes.list.dynamic.title'),
            description: t('classes.list.dynamic.desc'),
            level: t('home.levels.intermediate'),
            intensity: t('classes.intensities.high')
        },
        {
            title: t('classes.list.jumpboard.title'),
            description: t('classes.list.jumpboard.desc'),
            level: t('home.levels.intermediate'),
            intensity: t('classes.intensities.high')
        }
    ];

    const packages = [
        { name: t('classes.investment.packages.drop_in'), price: '€35', details: t('classes.investment.details.days_14'), featured: false },
        { name: t('classes.investment.packages.pack_5'), price: '€165', details: t('classes.investment.details.months_2'), featured: false },
        { name: t('classes.investment.packages.pack_10'), price: '€300', details: t('classes.investment.details.months_4'), featured: true },
        { name: t('classes.investment.packages.monthly'), price: '€280', details: t('classes.investment.details.commitment'), featured: false }
    ];

    return (
        <PageTransition>
            <div>
                {/* Hero */}
                <section className="bg-aluna-alabaster pt-16 pb-20 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="label-eyebrow mb-5">{t('nav.classes')}</p>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-aluna-charcoal mb-6">
                                {t('classes.title')}
                            </h1>
                            <p className="text-xl text-aluna-stone font-light max-w-xl mx-auto leading-relaxed">
                                {t('classes.subtitle')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Class List */}
                <section className="py-24 bg-aluna-cream">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {classes.map((cls, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08, duration: 0.7 }}
                                    className="group border-b border-aluna-stone/15 last:border-0 md:[&:nth-child(2)]:border-0 md:[&:nth-child(4)]:border-0 p-10 md:p-12 hover:bg-aluna-alabaster/60 transition-colors duration-300"
                                >
                                    <div className="flex justify-between items-start mb-5">
                                        <h3 className="text-2xl font-serif text-aluna-charcoal leading-tight">{cls.title}</h3>
                                        <span className="text-aluna-gold text-[10px] uppercase tracking-[0.3em] ml-4 mt-1 shrink-0">{cls.level}</span>
                                    </div>
                                    <p className="text-aluna-stone/85 mb-5 font-light leading-relaxed">{cls.description}</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-8 bg-aluna-gold/50" />
                                        <p className="text-[10px] text-aluna-stone/55 uppercase tracking-widest">{t('classes.intensity')}: {cls.intensity}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="py-28 bg-aluna-alabaster">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <p className="label-eyebrow mb-5">{t('classes.investment.title')}</p>
                            <h2 className="text-3xl md:text-4xl font-serif text-aluna-charcoal">Invest in Your Practice</h2>
                        </motion.div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.7 }}
                                    whileHover={{ y: -6 }}
                                    className={`relative p-8 text-center transition-all duration-300 ${
                                        pkg.featured
                                            ? 'bg-aluna-charcoal text-aluna-alabaster shadow-2xl shadow-aluna-charcoal/20'
                                            : 'bg-aluna-cream text-aluna-charcoal hover:shadow-lg hover:shadow-aluna-charcoal/8'
                                    }`}
                                >
                                    {pkg.featured && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="bg-aluna-gold text-white text-[9px] uppercase tracking-[0.3em] px-4 py-1">
                                                Popular
                                            </span>
                                        </div>
                                    )}
                                    <h3 className={`text-sm font-sans font-medium uppercase tracking-widest mb-6 ${pkg.featured ? 'text-aluna-gold' : 'text-aluna-stone'}`}>
                                        {pkg.name}
                                    </h3>
                                    <p className={`text-4xl font-serif font-light mb-2 ${pkg.featured ? 'text-white' : 'text-aluna-charcoal'}`}>
                                        {pkg.price}
                                    </p>
                                    <p className={`text-[11px] mb-8 font-light ${pkg.featured ? 'text-aluna-alabaster/55' : 'text-aluna-stone/60'}`}>
                                        {pkg.details}
                                    </p>
                                    <Link
                                        to="/contact"
                                        className={`block w-full py-3 text-[10px] uppercase tracking-widest transition-all duration-300 rounded-full ${
                                            pkg.featured
                                                ? 'bg-aluna-gold text-white hover:bg-aluna-gold-light'
                                                : 'border border-aluna-charcoal/25 text-aluna-charcoal hover:bg-aluna-charcoal hover:text-white hover:border-aluna-charcoal'
                                        }`}
                                    >
                                        {t('classes.investment.purchase')}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
