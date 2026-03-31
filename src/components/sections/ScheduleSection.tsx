import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import spotlightImg from '../../assets/spotlight-studio.jpg';
import { useContactModal } from '../../context/ContactModalContext';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-aluna-gold shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const scheduleRows = [
    { dayKey: 'schedule.days.mon_fri', time: '08:00 – 21:00' },
    { dayKey: 'schedule.days.saturday', time: '09:00 – 18:00' },
    { dayKey: 'schedule.days.sunday', closed: true },
];

export default function ScheduleSection() {
    const { t } = useTranslation();
    const { openModal } = useContactModal();

    const benefits = t('schedule.benefits', { returnObjects: true }) as string[];

    return (
        <section id="schedule" className="bg-aluna-cream py-28">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="label-eyebrow mb-5">{t('schedule.eyebrow')}</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-aluna-charcoal leading-tight">
                        {t('schedule.headline').split('|').map((part, i, arr) => (
                            <span key={i}>
                                {part}
                                {i < arr.length - 1 && (
                                    <span className="italic text-aluna-gold"> |</span>
                                )}
                            </span>
                        ))}
                    </h2>
                </motion.div>
            </div>

            {/* Two-column cards */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                    {/* LEFT card — Class Schedule */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white shadow-lg p-10 lg:p-14 flex flex-col"
                    >
                        <p className="label-eyebrow mb-6">{t('schedule.schedule_title')}</p>
                        <div className="flex-1 space-y-0 divide-y divide-aluna-cream">
                            {scheduleRows.map(({ dayKey, time, closed }) => (
                                <div key={dayKey} className="flex justify-between items-center py-5">
                                    <span className="font-sans text-sm text-aluna-charcoal font-medium tracking-wide">
                                        {t(dayKey)}
                                    </span>
                                    {closed ? (
                                        <span className="text-xs text-aluna-stone/60 italic">{t('schedule.closed')}</span>
                                    ) : (
                                        <span className="font-serif text-aluna-charcoal text-lg">{time}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-10">
                            <button
                                onClick={openModal}
                                className="btn-primary cursor-pointer"
                            >
                                {t('schedule.cta')}
                            </button>
                        </div>
                    </motion.div>

                    {/* RIGHT card — Why Aluna? */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-aluna-alabaster p-10 lg:p-14 flex flex-col"
                    >
                        <p className="label-eyebrow mb-6">{t('schedule.why_title')}</p>
                        <ul className="space-y-6 flex-1">
                            {benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckIcon />
                                    <span className="text-aluna-charcoal font-light leading-relaxed text-sm md:text-base">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Promo banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-aluna-charcoal mt-0 md:mt-8 py-5 px-8 text-center"
                >
                    <p className="text-aluna-gold font-serif text-lg italic tracking-wide">
                        ✦ {t('schedule.promo')} ✦
                    </p>
                </motion.div>
            </div>

            {/* Studio image with quote overlay */}
            <div className="relative mt-16 w-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="w-full h-[400px] md:h-[530px]"
                >
                    <img
                        src={spotlightImg}
                        alt="Aluna Pilates Studio"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aluna-charcoal/40 via-transparent to-transparent" />
                </motion.div>

                {/* Quote overlay — hidden on mobile */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="hidden md:block absolute bottom-10 left-10 lg:left-16 max-w-sm bg-white/95 backdrop-blur-sm p-8 shadow-xl"
                >
                    <div className="w-8 h-px bg-aluna-gold mb-5" />
                    <p className="font-serif italic text-aluna-charcoal text-lg leading-relaxed">
                        &ldquo;{t('schedule.quote')}&rdquo;
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
