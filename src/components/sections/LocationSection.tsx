import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LocationSection() {
    const { t } = useTranslation();

    return (
        <section className="bg-aluna-cream py-0">
            {/* Map container */}
            <div className="relative w-full h-[420px] md:h-[500px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4868.661311187034!2d26.1336531!3d44.458233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f9ee8a7f20c9%3A0x254c833071b20301!2sAluna%20Reformer%20Studio!5e1!3m2!1sen!2sro!4v1775045486068!5m2!1sen!2sro"
                    className="w-full h-full border-0 grayscale-[15%]"
                    loading="lazy"
                    title="Aluna Reformer Studio"
                    allowFullScreen
                />

                {/* Desktop overlay card — hidden on mobile */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden md:block absolute left-8 bottom-8 bg-aluna-charcoal/95 backdrop-blur-sm p-8 max-w-xs shadow-xl"
                >
                    <p className="text-aluna-gold uppercase tracking-[0.35em] text-[10px] font-medium">
                        {t('location.eyebrow')}
                    </p>
                    <h3 className="font-serif text-xl text-white mt-3 mb-1">
                        Aluna Reformer Studio
                    </h3>
                    <p className="text-aluna-alabaster/70 text-sm font-light">
                        Șos. Colentina nr. 16, bl. B3, parter ap. 07
                    </p>
                    <p className="text-aluna-alabaster/70 text-sm font-light">
                        București, România
                    </p>

                    <div className="w-8 h-px bg-aluna-gold/40 my-4" />

                    <div className="space-y-1">
                        <p className="text-aluna-alabaster/60 text-xs font-light">Lun – Vin: 08:00 – 21:00</p>
                        <p className="text-aluna-alabaster/60 text-xs font-light">Sâmbătă: 09:00 – 18:00</p>
                        <p className="text-aluna-alabaster/60 text-xs font-light">Duminică: Închis</p>
                    </div>

                    <a
                        href="https://maps.app.goo.gl/TTGnkHSrDtsadZdV9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-5 border border-aluna-gold/60 text-aluna-gold text-[10px] uppercase tracking-widest px-5 py-2.5 hover:bg-aluna-gold hover:text-aluna-charcoal transition-all duration-300"
                    >
                        {t('location.directions')}
                    </a>
                </motion.div>
            </div>

            {/* Mobile info card — below the map */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden bg-aluna-charcoal w-full px-6 py-8"
            >
                <p className="text-aluna-gold uppercase tracking-[0.35em] text-[10px] font-medium">
                    {t('location.eyebrow')}
                </p>
                <h3 className="font-serif text-xl text-white mt-3 mb-1">
                    Aluna Reformer Studio
                </h3>
                <p className="text-aluna-alabaster/70 text-sm font-light">
                    Șos. Colentina nr. 16, bl. B3, parter ap. 07
                </p>
                <p className="text-aluna-alabaster/70 text-sm font-light">
                    București, România
                </p>

                <div className="w-8 h-px bg-aluna-gold/40 my-4" />

                <div className="space-y-1">
                    <p className="text-aluna-alabaster/60 text-xs font-light">Lun – Vin: 08:00 – 21:00</p>
                    <p className="text-aluna-alabaster/60 text-xs font-light">Sâmbătă: 09:00 – 18:00</p>
                    <p className="text-aluna-alabaster/60 text-xs font-light">Duminică: Închis</p>
                </div>

                <a
                    href="https://maps.app.goo.gl/TTGnkHSrDtsadZdV9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-5 border border-aluna-gold/60 text-aluna-gold text-[10px] uppercase tracking-widest px-5 py-2.5 hover:bg-aluna-gold hover:text-aluna-charcoal transition-all duration-300"
                >
                    {t('location.directions')}
                </a>
            </motion.div>
        </section>
    );
}
