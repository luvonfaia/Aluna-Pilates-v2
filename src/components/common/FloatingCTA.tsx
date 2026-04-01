import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { useContactModal } from '../../context/ContactModalContext';

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
    const sizeClass = 'text-[9px] sm:text-[10px] lg:text-[12px]';
    return (
        <div className="relative flex items-center justify-center">
            {/* Invisible spacer preserves pill width */}
            <span className={`invisible ${sizeClass} font-semibold tracking-[0.08em] select-none ${color}`}>
                {text}
            </span>

            {/* Outgoing chars — visible at rest */}
            <div className="absolute inset-0 flex items-center justify-center">
                {chars.map((char, i) => (
                    <div key={`out-${i}`} className="overflow-hidden h-[1.3em] flex items-center">
                        <span
                            ref={el => { charsOutRef.current[i] = el; }}
                            className={`inline-block ${sizeClass} font-semibold tracking-[0.08em] ${color}`}
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
                            className={`inline-block ${sizeClass} font-semibold tracking-[0.08em] ${color}`}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Phone SVG ──────────────────────────────────────────────────────────────
function PhoneSVG({ className }: { className?: string }) {
    return (
        <svg className={`w-[18px] h-[18px] ${className ?? ''}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
    );
}

// ─── Mail SVG (contact pill icon on mobile) ──────────────────────────────────
function MailSVG({ className }: { className?: string }) {
    return (
        <svg className={`w-[18px] h-[18px] ${className ?? ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
        </svg>
    );
}

// ─── WhatsApp SVG ───────────────────────────────────────────────────────────
function WhatsAppSVG({ className }: { className?: string }) {
    return (
        <svg className={`w-[18px] h-[18px] ${className ?? ''}`} viewBox="0 0 24 24" fill="none">
            <path
                fill="currentColor"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
        </svg>
    );
}

// ─── Subtle glass shadow ────────────────────────────────────────────────────
const PILL_SHADOW =
    '0 4px 16px 0 rgba(0,0,0,0.06),' +
    '0 1px 4px 0 rgba(0,0,0,0.04)';

// ─── Main component ─────────────────────────────────────────────────────────
export default function FloatingCTA() {
    const { t } = useTranslation();
    const { openModal, isOpen: modalOpen } = useContactModal();
    const [onDark, setOnDark] = useState(true);

    // Phone — single icon ref + char refs for label
    const phoneIcon     = useRef<HTMLDivElement>(null);
    const phoneCharsOut = useRef<(HTMLSpanElement | null)[]>([]);
    const phoneCharsIn  = useRef<(HTMLSpanElement | null)[]>([]);

    // Contact — char refs
    const contactCharsOut = useRef<(HTMLSpanElement | null)[]>([]);
    const contactCharsIn  = useRef<(HTMLSpanElement | null)[]>([]);

    // WhatsApp — single icon ref + char refs for label
    const waIcon      = useRef<HTMLDivElement>(null);
    const waCharsOut  = useRef<(HTMLSpanElement | null)[]>([]);
    const waCharsIn   = useRef<(HTMLSpanElement | null)[]>([]);

    // ── Adaptive dark/light detection ──────────────────────────────────────
    useEffect(() => {
        const parseRGB = (str: string) => {
            const m = str.match(/rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/);
            if (!m) return null;
            return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
        };

        const getLuminance = (r: number, g: number, b: number) => {
            const lin = (c: number) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
            return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        };

        const blend = (R: number, G: number, B: number, r: number, g: number, b: number, a: number) => {
            const alpha = Math.min(1, Math.max(0, a));
            if (alpha < 0.05) return [R, G, B] as [number, number, number];
            return [R * (1 - alpha) + r * alpha, G * (1 - alpha) + g * alpha, B * (1 - alpha) + b * alpha] as [number, number, number];
        };

        const check = () => {
            const x = window.innerWidth / 2;
            const y = window.innerHeight - 60;

            const all = document.elementsFromPoint(x, y) as Element[];
            const pageEls = all.filter(el => !el.closest('[data-floating-cta]'));

            let R = 249, G = 248, B = 246;
            for (const el of [...pageEls].reverse()) {
                const cs = window.getComputedStyle(el);

                const bg = cs.backgroundColor;
                if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                    const c = parseRGB(bg);
                    if (c) [R, G, B] = blend(R, G, B, c.r, c.g, c.b, c.a);
                }

                const bgImg = cs.backgroundImage;
                if (bgImg && bgImg !== 'none' && bgImg.includes('gradient')) {
                    const rgbaRe = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.]+))?\s*\)/g;
                    for (const m of bgImg.matchAll(rgbaRe)) {
                        [R, G, B] = blend(R, G, B, +m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1);
                    }
                    const oklabRe = /ok(?:lab|lch)\(\s*([\d.]+%?)[\s,]+[-\d.]+[\s,]+[-\d.]+(?:\s*\/\s*([\d.]+))?\s*\)/g;
                    for (const m of bgImg.matchAll(oklabRe)) {
                        const rawL = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
                        const a = m[2] !== undefined ? +m[2] : 1;
                        const gray = Math.round(Math.pow(Math.min(1, rawL), 2.2) * 255);
                        [R, G, B] = blend(R, G, B, gray, gray, gray, a);
                    }
                }
            }

            setOnDark(getLuminance(R, G, B) < 0.35);
        };

        check();
        window.addEventListener('scroll', check, { passive: true });
        window.addEventListener('resize', check, { passive: true });
        return () => {
            window.removeEventListener('scroll', check);
            window.removeEventListener('resize', check);
        };
    }, []);

    // ── Hide "in" chars on mount ────────────────────────────────────────────
    useEffect(() => {
        const pIn = phoneCharsIn.current.filter(Boolean)   as HTMLSpanElement[];
        const cIn = contactCharsIn.current.filter(Boolean) as HTMLSpanElement[];
        const wIn = waCharsIn.current.filter(Boolean)      as HTMLSpanElement[];
        gsap.set([...pIn, ...cIn, ...wIn], { yPercent: 150, opacity: 0 });
    }, []);

    // ── Hover: Phone ───────────────────────────────────────────────────────
    const onPhoneEnter = () => {
        gsap.killTweensOf(phoneIcon.current);
        gsap.fromTo(
            phoneIcon.current,
            { scale: 1, rotate: 0 },
            {
                scale: 1.3,
                rotate: 18,
                duration: 0.2,
                ease: 'power2.out',
                onComplete() {
                    gsap.to(phoneIcon.current, {
                        scale: 1,
                        rotate: 0,
                        duration: 0.65,
                        ease: 'elastic.out(1.1, 0.45)',
                    });
                },
            }
        );

        const pOut = phoneCharsOut.current.filter(Boolean) as HTMLSpanElement[];
        const pIn  = phoneCharsIn.current.filter(Boolean)  as HTMLSpanElement[];

        gsap.killTweensOf([...pOut, ...pIn]);
        gsap.set(pOut, { yPercent: 0,   opacity: 1 });
        gsap.set(pIn,  { yPercent: 150, opacity: 0 });

        const tl = gsap.timeline();
        tl.to(pOut,   { yPercent: -150, opacity: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.01 }, 0);
        tl.fromTo(pIn,
            { yPercent: 150, opacity: 0 },
            { yPercent: 0,   opacity: 1, duration: 0.55, ease: EASE_OUT, stagger: 0.01 },
            0
        );
    };

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
    const onWaEnter = () => {
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

    // ── Colors ────────────────────────────────────────────────────────────
    const outerClass = onDark
        ? 'bg-white/15 backdrop-blur-xl border border-white/20'
        : 'bg-aluna-charcoal/[0.06] backdrop-blur-xl border border-aluna-stone/20';

    const innerClass = onDark
        ? 'bg-white/25 backdrop-blur-sm text-white border border-white/25'
        : 'bg-white backdrop-blur-sm text-aluna-charcoal border border-aluna-stone/15';

    const outerShadow = onDark
        ? '0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)'
        : '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)';

    const textColor  = onDark ? 'text-white' : 'text-aluna-charcoal';
    const iconColor  = onDark ? 'text-[#25D366]' : 'text-[#25D366]';
    const phoneColor = onDark ? 'text-aluna-gold' : 'text-aluna-gold';
    const mailColor  = onDark ? 'text-white/80' : 'text-aluna-stone';

    return (
        <motion.div
            data-floating-cta
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: modalOpen ? 0 : 1,
                y: modalOpen ? -200 : 0,
            }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center"
        >
            <div
                className={`flex items-center gap-1.5 p-1.5 rounded-[60px] transition-all duration-500 ${outerClass}`}
                style={{ boxShadow: outerShadow }}
            >
                {/* ── Phone pill ── */}
                <a
                    href="tel:+40786704688"
                    onMouseEnter={onPhoneEnter}
                    aria-label="Call us"
                    className={`relative h-10 px-4 sm:px-4 lg:px-5 rounded-full overflow-hidden flex items-center justify-center gap-0 sm:gap-2 lg:gap-2.5 cursor-pointer transition-colors duration-500 ${innerClass}`}
                    style={{ boxShadow: PILL_SHADOW }}
                >
                    <div ref={phoneIcon} className={`flex-shrink-0 flex items-center ${phoneColor}`}>
                        <PhoneSVG />
                    </div>
                    {/* Text hidden below sm */}
                    <div className="hidden sm:block">
                        <SplitLabel
                            text="0786 704 688"
                            charsOutRef={phoneCharsOut}
                            charsInRef={phoneCharsIn}
                            color={textColor}
                        />
                    </div>
                </a>

                {/* ── Contact pill ── */}
                <button
                    onClick={openModal}
                    onMouseEnter={onContactEnter}
                    aria-label="Open contact form"
                    className={`relative h-10 px-4 sm:px-5 lg:px-6 rounded-full overflow-hidden flex items-center justify-center cursor-pointer transition-colors duration-500 ${innerClass}`}
                    style={{ boxShadow: PILL_SHADOW }}
                >
                    {/* Mail icon shown only on mobile */}
                    <MailSVG className={`sm:hidden flex-shrink-0 ${mailColor}`} />
                    {/* Text hidden below sm */}
                    <div className="hidden sm:block">
                        <SplitLabel
                            text={t('floating_cta.contact')}
                            charsOutRef={contactCharsOut}
                            charsInRef={contactCharsIn}
                            color={textColor}
                        />
                    </div>
                </button>

                {/* ── WhatsApp pill ── */}
                <a
                    href="https://wa.me/40786704688"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={onWaEnter}
                    aria-label="Contact us on WhatsApp"
                    className={`relative h-10 px-4 sm:px-4 lg:px-5 rounded-full overflow-hidden flex items-center justify-center gap-0 sm:gap-2 lg:gap-2.5 cursor-pointer transition-colors duration-500 ${innerClass}`}
                    style={{ boxShadow: PILL_SHADOW }}
                >
                    <div ref={waIcon} className={`flex-shrink-0 flex items-center ${iconColor}`}>
                        <WhatsAppSVG />
                    </div>
                    {/* Text hidden below sm */}
                    <div className="hidden sm:block">
                        <SplitLabel
                            text="WhatsApp"
                            charsOutRef={waCharsOut}
                            charsInRef={waCharsIn}
                            color={textColor}
                        />
                    </div>
                </a>
            </div>
        </motion.div>
    );
}
