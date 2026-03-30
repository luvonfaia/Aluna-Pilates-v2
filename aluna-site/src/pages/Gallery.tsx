import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ImageLightbox from '../components/common/ImageLightbox';

export default function Gallery() {
    const { t } = useTranslation();
    const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

    const images = [
        { src: '/assets/gallery/Aluna_studio_1.png', span: 'tall' },
        { src: '/assets/gallery/Aluna_studio_2.png', span: 'normal' },
        { src: '/assets/gallery/Aluna_studio_3.png', span: 'normal' },
        { src: '/assets/gallery/Aluna_studio_4.png', span: 'wide' },
        { src: '/assets/gallery/Aluna_studio_5.png', span: 'normal' },
        { src: '/assets/gallery/Aluna_studio_6.png', span: 'tall' },
    ];

    const handleNextImage = () => {
        if (selectedImageIdx !== null) {
            setSelectedImageIdx((selectedImageIdx + 1) % images.length);
        }
    };

    const handlePrevImage = () => {
        if (selectedImageIdx !== null) {
            setSelectedImageIdx((selectedImageIdx - 1 + images.length) % images.length);
        }
    };

    return (
        <div id="gallery">
            {/* Hero */}
            <section className="py-20 bg-aluna-alabaster text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                        <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedImageIdx(idx)}
                            className="break-inside-avoid relative group overflow-hidden rounded-lg w-full text-left border-none bg-transparent p-0 cursor-pointer"
                            aria-label={`Open ${t('nav.gallery')} image ${idx + 1}`}
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={img.src}
                                    alt={`Aluna Studio ${idx + 1}`}
                                    loading="lazy"
                                    className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-aluna-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Lightbox — always mounted so AnimatePresence can play exit */}
            <ImageLightbox
                isOpen={selectedImageIdx !== null}
                src={selectedImageIdx !== null ? images[selectedImageIdx].src : ''}
                alt={selectedImageIdx !== null ? `Aluna Studio ${selectedImageIdx + 1}` : ''}
                onClose={() => setSelectedImageIdx(null)}
                onNext={handleNextImage}
                onPrev={handlePrevImage}
                hasNavigation={true}
            />
        </div>
    );
}
