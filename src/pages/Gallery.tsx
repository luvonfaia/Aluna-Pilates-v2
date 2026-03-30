import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';

export default function Gallery() {
    const { t } = useTranslation();

    const images = [
        { src: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070', span: 'tall' },
        { src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069', span: 'normal' },
        { src: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2070', span: 'normal' },
        { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070', span: 'wide' },
        { src: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070', span: 'normal' },
        { src: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070', span: 'tall' },
    ];

    return (
        <PageTransition>
            <div>
                {/* Hero */}
                <section className="py-20 bg-aluna-alabaster text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="label-eyebrow mb-5">{t('nav.gallery')}</p>
                        <h1 className="text-4xl sm:text-5xl font-serif text-aluna-charcoal mb-4">
                            {t('gallery.title')}
                        </h1>
                        <p className="text-aluna-stone font-light max-w-md mx-auto">
                            {t('gallery.subtitle')}
                        </p>
                    </motion.div>
                </section>

                {/* Masonry grid */}
                <section className="pb-24 px-6 md:px-10">
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 max-w-7xl mx-auto">
                        {images.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="break-inside-avoid relative group overflow-hidden"
                            >
                                <img
                                    src={img.src}
                                    alt={`Aluna Studio ${idx + 1}`}
                                    loading="lazy"
                                    className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-aluna-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
