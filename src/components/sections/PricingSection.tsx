import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GMA_BOOKING_URL } from '../../config/formConfig';

gsap.registerPlugin(ScrollTrigger);

interface PricingItem {
    name: string;
    detail: string;
    original: string;
    price: string;
}

function PricingCard({ title, items }: { title: string; items: PricingItem[] }) {
    return (
        <div className="bg-white shadow-md p-10 lg:p-12 h-full">
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
        </div>
    );
}

export default function PricingSection() {
    const { t } = useTranslation();

    const individualItems  = t('pricing.individual.items',   { returnObjects: true }) as PricingItem[];
    const semiPrivateItems = t('pricing.semi_private.items', { returnObjects: true }) as PricingItem[];

    const headerRef      = useRef<HTMLDivElement>(null);
    const individualRef  = useRef<HTMLDivElement>(null);
    const semiRef        = useRef<HTMLDivElement>(null);
    const offerRef       = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isDesktop = window.innerWidth >= 1024; // lg breakpoint

        const ctx = gsap.context(() => {
            // Header — vertical rise
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

            if (isDesktop) {
                // Desktop: Individual sweeps in from left
                gsap.fromTo(individualRef.current,
                    { opacity: 0, x: -320 },
                    {
                        opacity: 1, x: 0, ease: 'none',
                        scrollTrigger: {
                            trigger: individualRef.current,
                            start: 'top 90%',
                            end: 'top 25%',
                            scrub: 1.5,
                        },
                    }
                );

                // Desktop: Semi-Private sweeps in from right
                gsap.fromTo(semiRef.current,
                    { opacity: 0, x: 320 },
                    {
                        opacity: 1, x: 0, ease: 'none',
                        scrollTrigger: {
                            trigger: semiRef.current,
                            start: 'top 90%',
                            end: 'top 25%',
                            scrub: 1.8,
                        },
                    }
                );
            } else {
                // Mobile: both rise vertically, staggered
                gsap.fromTo(individualRef.current,
                    { opacity: 0, y: 90 },
                    {
                        opacity: 1, y: 0, ease: 'none',
                        scrollTrigger: {
                            trigger: individualRef.current,
                            start: 'top 92%',
                            end: 'top 28%',
                            scrub: 1.5,
                        },
                    }
                );

                gsap.fromTo(semiRef.current,
                    { opacity: 0, y: 110 },
                    {
                        opacity: 1, y: 0, ease: 'none',
                        scrollTrigger: {
                            trigger: semiRef.current,
                            start: 'top 95%',
                            end: 'top 28%',
                            scrub: 1.8,
                        },
                    }
                );
            }

            // Offer block — vertical rise
            gsap.fromTo(offerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, ease: 'none',
                    scrollTrigger: {
                        trigger: offerRef.current,
                        start: 'top 92%',
                        end: 'top 55%',
                        scrub: 1.5,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="pricing" className="bg-aluna-alabaster py-28">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
                <div ref={headerRef}>
                    <p className="label-eyebrow mb-5">{t('pricing.eyebrow')}</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-aluna-charcoal mb-6 leading-tight">
                        {t('pricing.headline')}
                    </h2>
                    <div className="w-16 h-px bg-aluna-gold mb-8" />
                </div>
            </div>

            {/* Pricing grid — overflow-hidden prevents horizontal scrollbar during sweep */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        <div ref={individualRef}>
                            <PricingCard
                                title={t('pricing.individual.title')}
                                items={individualItems}
                            />
                        </div>
                        <div ref={semiRef}>
                            <PricingCard
                                title={t('pricing.semi_private.title')}
                                items={semiPrivateItems}
                            />
                        </div>
                    </div>
                </div>

                {/* Special Opening Offer block */}
                <div
                    ref={offerRef}
                    className="mt-8 bg-white border border-aluna-gold/20 shadow-lg p-10 lg:p-12 flex flex-col sm:flex-row items-center gap-10"
                >
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
                    <div className="flex flex-col items-center gap-6 shrink-0">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 border border-aluna-gold border-dashed rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="text-center">
                                <p className="font-serif text-3xl text-aluna-charcoal leading-none">10%</p>
                                <p className="text-[9px] uppercase tracking-widest text-aluna-stone mt-0.5">OFF</p>
                            </div>
                        </div>
                        <a
                            href={GMA_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary whitespace-nowrap"
                        >
                            {t('nav.book')}
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
