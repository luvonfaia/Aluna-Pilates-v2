import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GMA_BOOKING_URL } from '../../config/formConfig';

gsap.registerPlugin(ScrollTrigger);

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
    const benefits = t('schedule.benefits', { returnObjects: true }) as string[];

    const headerRef    = useRef<HTMLDivElement>(null);
    const leftCardRef  = useRef<HTMLDivElement>(null);
    const rightCardRef = useRef<HTMLDivElement>(null);
    const promoRef     = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header — rises up
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, ease: 'none',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 90%',
                        end: 'top 40%',
                        scrub: 1.5,
                    },
                }
            );

            // Left card — rises, starts slightly after header enters
            gsap.fromTo(leftCardRef.current,
                { opacity: 0, y: 90 },
                {
                    opacity: 1, y: 0, ease: 'none',
                    scrollTrigger: {
                        trigger: leftCardRef.current,
                        start: 'top 92%',
                        end: 'top 28%',
                        scrub: 1.5,
                    },
                }
            );

            // Right card — rises slightly behind left
            gsap.fromTo(rightCardRef.current,
                { opacity: 0, y: 110 },
                {
                    opacity: 1, y: 0, ease: 'none',
                    scrollTrigger: {
                        trigger: rightCardRef.current,
                        start: 'top 95%',
                        end: 'top 28%',
                        scrub: 1.8,
                    },
                }
            );

            // Promo banner
            gsap.fromTo(promoRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, ease: 'none',
                    scrollTrigger: {
                        trigger: promoRef.current,
                        start: 'top 92%',
                        end: 'top 60%',
                        scrub: 1.5,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="schedule" className="bg-aluna-cream py-28">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
                <div ref={headerRef}>
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
                </div>
            </div>

            {/* Two-column cards */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                    {/* LEFT card — Class Schedule */}
                    <div ref={leftCardRef} className="bg-white shadow-lg p-10 lg:p-14 flex flex-col">
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
                    </div>

                    {/* RIGHT card — Why Aluna? */}
                    <div ref={rightCardRef} className="bg-aluna-alabaster p-10 lg:p-14 flex flex-col">
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
                    </div>
                </div>

                {/* Promo banner + CTA */}
                <div ref={promoRef}>
                    <div className="bg-aluna-charcoal mt-0 md:mt-8 py-5 px-8 text-center">
                        <p className="text-aluna-gold font-serif text-lg italic tracking-wide">
                            ✦ {t('schedule.promo')} ✦
                        </p>
                    </div>
                    <div className="flex justify-center mt-8">
                        <a
                            href={GMA_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            {t('schedule.cta')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
