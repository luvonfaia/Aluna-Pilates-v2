import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const EASE_OUT = 'cubic-bezier(0.25, 1, 0.5, 1)';

// ─── Character-split text component ────────────────────────────────────────
function SplitLabel({
    text,
    charsOutRef,
    charsInRef,
    color,
}: {
    text: string;
    charsOutRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
    charsInRef:  React.MutableRefObject<(HTMLSpanElement | null)[]>;
    color: string;
}) {
    const chars = text.split('');
    return (
        <div className="relative flex items-center justify-center">
            {/* Invisible spacer preserves pill width */}
            <span className={`invisible text-[12px] font-semibold tracking-[0.08em] select-none ${color}`}>
                {text}
            </span>

            {/* Outgoing chars — visible at rest */}
            <div className="absolute inset-0 flex items-center justify-center">
                {chars.map((char, i) => (
                    <div key={`out-${i}`} className="overflow-hidden h-[1.3em] flex items-center">
                        <span
                            ref={el => { charsOutRef.current[i] = el; }}
                            className={`inline-block text-[12px] font-semibold tracking-[0.08em] ${color}`}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    </div>
                ))}
            </div>

            {/* Incoming chars — hidden at rest, slide in on hover */}
            <div className="absolute inset-0 flex items-center justify-center">
                {chars.map((char, i) => (
                    <div key={`in-${i}`} className="overflow-hidden h-[1.3em] flex items-center">
                        <span
                            ref={el => { charsInRef.current[i] = el; }}
                            className={`inline-block text-[12px] font-semibold tracking-[0.08em] ${color}`}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── WhatsApp SVG ───────────────────────────────────────────────────────────
function WhatsAppSVG({ className }: { className?: string }) {
    return (
        <svg className={`w-[16px] h-[16px] ${className ?? ''}`} viewBox="0 0 24 24" fill="none">
            <path
                fill="currentColor"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
        </svg>
    );
}

// ─── Multi-layer shadow ─────────────────────────────────────────────────────
const PILL_SHADOW =
    '0 198px 55px 0 rgba(0,0,0,0.00),' +
    '0 127px 51px 0 rgba(0,0,0,0.01),' +
    '0  71px 43px 0 rgba(0,0,0,0.04),' +
    '0  32px 32px 0 rgba(0,0,0,0.07),' +
    '0   8px 17px 0 rgba(0,0,0,0.10)';

// ─── Main component ─────────────────────────────────────────────────────────
export default function FloatingCTA() {
    const { t } = useTranslation();
    const [onDark, setOnDark] = useState(true);

    // Contact — char refs
    const contactCharsOut = useRef<(HTMLSpanElement | null)[]>([]);
    const contactCharsIn  = useRef<(HTMLSpanElement | null)[]>([]);

    // WhatsApp — single icon ref + char refs for label
    const waIcon      = useRef<HTMLDivElement>(null);
    const waCharsOut  = useRef<(HTMLSpanElement | null)[]>([]);
    const waCharsIn   = useRef<(HTMLSpanElement | null)[]>([]);

    // ── Adaptive dark/light detection ──────────────────────────────────────
    useEffect(() => {
        const selectors = ['section.h-screen', 'section.bg-aluna-charcoal', 'footer'];
        const visible   = new Set<Element>();

        const obs = new IntersectionObserver(
            entries => {
                entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
                setOnDark(visible.size > 0);
            },
            { threshold: 0.05 }
        );

        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => obs.observe(el)));
        return () => obs.disconnect();
    }, []);

    // ── Hide "in" chars on mount ────────────────────────────────────────────
    useEffect(() => {
        const cIn = contactCharsIn.current.filter(Boolean) as HTMLSpanElement[];
        const wIn = waCharsIn.current.filter(Boolean)      as HTMLSpanElement[];
        gsap.set([...cIn, ...wIn], { yPercent: 150, opacity: 0 });
    }, []);

    // ── Hover: Contact ─────────────────────────────────────────────────────
    const onContactEnter = () => {
        const cOut = contactCharsOut.current.filter(Boolean) as HTMLSpanElement[];
        const cIn  = contactCharsIn.current.filter(Boolean)  as HTMLSpanElement[];

        gsap.killTweensOf([...cOut, ...cIn]);
        gsap.set(cOut, { yPercent: 0,   opacity: 1 });
        gsap.set(cIn,  { yPercent: 150, opacity: 0 });

        const tl = gsap.timeline();
        tl.to(cOut,   { yPercent: -150, opacity: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.01 }, 0);
        tl.fromTo(cIn,
            { yPercent: 150, opacity: 0 },
            { yPercent: 0,   opacity: 1, duration: 0.55, ease: EASE_OUT, stagger: 0.01 },
            0
        );
    };

    // ── Hover: WhatsApp ─────────────────────────────────────────────────────
    // Icon: elastic spring bounce (scale + rotation) — no duplicate elements
    // Text: same char-split as Contact
    const onWaEnter = () => {
        // Spring bounce on the single icon
        gsap.killTweensOf(waIcon.current);
        gsap.fromTo(
            waIcon.current,
            { scale: 1, rotate: 0 },
            {
                scale: 1.3,
                rotate: -18,
                duration: 0.2,
                ease: 'power2.out',
                onComplete() {
                    gsap.to(waIcon.current, {
                        scale: 1,
                        rotate: 0,
                        duration: 0.65,
                        ease: 'elastic.out(1.1, 0.45)',
                    });
                },
            }
        );

        // Char-split on "WhatsApp" label
        const wOut = waCharsOut.current.filter(Boolean) as HTMLSpanElement[];
        const wIn  = waCharsIn.current.filter(Boolean)  as HTMLSpanElement[];

        gsap.killTweensOf([...wOut, ...wIn]);
        gsap.set(wOut, { yPercent: 0,   opacity: 1 });
        gsap.set(wIn,  { yPercent: 150, opacity: 0 });

        const tl = gsap.timeline();
        tl.to(wOut,   { yPercent: -150, opacity: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.01 }, 0);
        tl.fromTo(wIn,
            { yPercent: 150, opacity: 0 },
            { yPercent: 0,   opacity: 1, duration: 0.55, ease: EASE_OUT, stagger: 0.01 },
            0
        );
    };

    // ── Colors ─────────────────────────────────────────────────────────────
    const outerClass = onDark
        ? 'bg-white/15 backdrop-blur-md border border-white/20'
        : 'bg-white/80 backdrop-blur-md border border-aluna-stone/15 shadow-xl shadow-black/10';

    const innerClass = onDark
        ? 'bg-white text-aluna-charcoal'
        : 'bg-aluna-charcoal text-aluna-alabaster';

    const textColor = onDark ? 'text-aluna-charcoal' : 'text-aluna-alabaster';
    const iconColor = onDark ? 'text-[#25D366]'      : 'text-aluna-gold';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center"
        >
            <div
                className={`flex items-center gap-1.5 p-1.5 rounded-[60px] transition-all duration-500 ${outerClass}`}
                style={{ boxShadow: onDark ? '0 8px 32px rgba(0,0,0,0.12)' : 'none' }}
            >
                {/* ── Contact pill ── */}
                <Link
                    to="/contact"
                    onMouseEnter={onContactEnter}
                    aria-label="Go to contact page"
                    className={`relative h-10 px-6 rounded-full overflow-hidden flex items-center cursor-pointer transition-colors duration-500 ${innerClass}`}
                    style={{ boxShadow: PILL_SHADOW }}
                >
                    <SplitLabel
                        text={t('floating_cta.contact')}
                        charsOutRef={contactCharsOut}
                        charsInRef={contactCharsIn}
                        color={textColor}
                    />
                </Link>

                {/* ── WhatsApp pill ── */}
                <a
                    href="https://wa.me/40700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={onWaEnter}
                    aria-label="Contact us on WhatsApp"
                    className={`relative h-10 px-5 rounded-full overflow-hidden flex items-center gap-2.5 cursor-pointer transition-colors duration-500 ${innerClass}`}
                    style={{ boxShadow: PILL_SHADOW }}
                >
                    {/* Single icon — elastic spring bounce, no ghost possible */}
                    <div ref={waIcon} className={`flex-shrink-0 flex items-center ${iconColor}`}>
                        <WhatsAppSVG />
                    </div>

                    {/* Label with char-split animation */}
                    <SplitLabel
                        text="WhatsApp"
                        charsOutRef={waCharsOut}
                        charsInRef={waCharsIn}
                        color={textColor}
                    />
                </a>
            </div>
        </motion.div>
    );
}
