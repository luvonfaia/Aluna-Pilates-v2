import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import spotlightImg from '../../assets/spotlight-studio.jpg';
import { useContactModal } from '../../context/ContactModalContext';
import { scrollToSection } from '../../hooks/useActiveSection';

interface PricingItem {
    name: string;
    detail: string;
    original: string;
    price: string;
}

function PricingCard({
    title,
    items,
    delay = 0,
}: {
    title: string;
    items: PricingItem[];
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white shadow-md p-10 lg:p-12"
        >
            <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-serif text-aluna-charcoal">{title}</h3>
            </div>
            <div className="w-full h-px bg-aluna-cream mb-8" />
            <div className="space-y-0 divide-y divide-aluna-cream/80">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-5">
                        <div>
                            <p className="text-aluna-charcoal font-medium text-sm">{item.name}</p>
                            <p className="text-aluna-stone text-xs mt-0.5 font-light">{item.detail}</p>
                        </div>
                        <div className="text-right ml-4">
                            <p className="text-aluna-stone/50 text-xs line-through">{item.original}</p>
                            <p className="text-aluna-charcoal font-serif text-xl">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function PricingSection() {
    const { t } = useTranslation();
    const { openModal } = useContactModal();

    const individualItems = t('pricing.individual.items', { returnObjects: true }) as PricingItem[];
    const semiPrivateItems = t('pricing.semi_private.items', { returnObjects: true }) as PricingItem[];

    return (
        <section id="pricing" className="bg-aluna-alabaster py-28">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="label-eyebrow mb-5">{t('pricing.eyebrow')}</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-aluna-charcoal mb-6 leading-tight">
                        {t('pricing.headline')}
                    </h2>
                    <div className="w-16 h-px bg-aluna-gold mb-8" />
                    <p className="text-aluna-stone font-light max-w-2xl leading-relaxed text-base md:text-lg">
                        {t('pricing.subtitle')}
                    </p>
                </motion.div>
            </div>

            {/* Pricing grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <PricingCard
                        title={t('pricing.individual.title')}
                        items={individualItems}
                        delay={0}
                    />
                    <PricingCard
                        title={t('pricing.semi_private.title')}
                        items={semiPrivateItems}
                        delay={0.1}
                    />
                </div>

                {/* Special Opening Offer block */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="mt-8 bg-white border border-aluna-gold/20 shadow-lg p-10 lg:p-12 flex flex-col sm:flex-row items-center gap-10"
                >
                    {/* Left text */}
                    <div className="flex-1 text-center sm:text-left">
                        <span className="inline-block label-eyebrow bg-aluna-gold/10 px-4 py-1.5 mb-5">
                            {t('pricing.offer.badge')}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif text-aluna-charcoal mb-4">
                            {t('pricing.offer.title')}
                        </h3>
                        <p className="text-aluna-stone font-light leading-relaxed text-sm md:text-base max-w-lg">
                            {t('pricing.offer.desc')}
                        </p>
                    </div>

                    {/* Right: spinning circle + button */}
                    <div className="flex flex-col items-center gap-6 shrink-0">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 border border-aluna-gold border-dashed rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="text-center">
                                <p className="font-serif text-3xl text-aluna-charcoal leading-none">10%</p>
                                <p className="text-[9px] uppercase tracking-widest text-aluna-stone mt-0.5">OFF</p>
                            </div>
                        </div>
                        <button
                            onClick={openModal}
                            className="btn-primary cursor-pointer whitespace-nowrap"
                        >
                            {t('pricing.offer.cta')}
                        </button>
                    </div>
                </motion.div>

                {/* The Aluna Method — editorial two-column */}
                <div className="mt-16 lg:mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-end">
                        {/* Image — 7/12 cols */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-7 aspect-[4/5] overflow-hidden"
                        >
                            <img
                                src={spotlightImg}
                                alt="The Aluna Method"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Text card — 5/12 cols, overlaps image on desktop */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-5 bg-white shadow-xl p-10 lg:p-14 lg:-ml-16 lg:mb-16 relative z-10"
                        >
                            <div className="w-8 h-px bg-aluna-gold mb-8" />
                            <h3 className="text-3xl md:text-4xl font-serif text-aluna-charcoal mb-6 leading-tight">
                                {t('pricing.method.title')}
                            </h3>
                            <p className="text-aluna-stone font-light leading-relaxed text-sm md:text-base mb-10">
                                {t('pricing.method.desc')}
                            </p>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="inline-flex items-center gap-2 text-aluna-charcoal hover:text-aluna-gold text-[10px] uppercase tracking-[0.3em] border-b border-aluna-charcoal/30 hover:border-aluna-gold pb-1 transition-all duration-300 cursor-pointer font-medium"
                            >
                                {t('pricing.method.link')}
                                <span>→</span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
