import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useActiveSection, scrollToSection } from '../../hooks/useActiveSection';

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

export default function Navbar({ onMenuToggle }: { onMenuToggle?: (open: boolean) => void }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (val: boolean) => {
        setIsOpen(val);
        onMenuToggle?.(val);
    };
    const [scrolled, setScrolled] = useState(false);
    const activeSection = useActiveSection();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const navLinks = [
        { name: t('nav.about'),    sectionId: 'about' },
        { name: t('nav.schedule'), sectionId: 'schedule' },
        { name: t('nav.pricing'),  sectionId: 'pricing' },
    ];

    const handleNavClick = (sectionId: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollToSection(sectionId), 100);
        } else {
            scrollToSection(sectionId);
        }
        toggleMenu(false);
    };

    const isActive = (sectionId: string) =>
        location.pathname === '/' && activeSection === sectionId;

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100]">

                {/* ── Top info strip ── */}
                <div className={`transition-all duration-500 ${scrolled ? 'bg-aluna-alabaster/95 backdrop-blur-md' : 'bg-white/5 backdrop-blur-sm'} border-b border-white/10 py-3 px-4 sm:px-6`}>
                    <div className="max-w-7xl mx-auto flex justify-center items-center gap-6 sm:gap-12 text-[13px] sm:text-[14px] tracking-[0.18em] font-medium">
                        <div className="flex items-center gap-5 sm:gap-7">
                            <a
                                href="https://www.instagram.com/alunareformerstudio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 transition-colors duration-300 hover:text-aluna-gold ${scrolled ? 'text-aluna-stone' : 'text-white/80'}`}
                                aria-label="Instagram"
                            >
                                <svg className="w-[22px] h-[22px] sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                <span className="tracking-[0.15em]">alunareformerstudio</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-7">
                            <LanguageSwitcher onDark={!scrolled} />
                        </div>
                    </div>
                </div>

                {/* ── Main nav bar ── */}
                <div className={`transition-all duration-500 relative z-[160] ${
                    scrolled && !isOpen
                        ? 'bg-aluna-alabaster/97 backdrop-blur-lg shadow-sm border-b border-aluna-stone/8 py-2'
                        : 'bg-transparent py-3'
                }`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex justify-between items-center">

                            {/* Logo */}
                            <div className={`relative z-10 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <button onClick={() => scrollToSection('home')} className="block cursor-pointer">
                                    <img
                                        src="/logo.svg"
                                        alt="ALUNA Reformer Studio"
                                        className={`w-auto object-contain transition-all duration-500 ${
                                            scrolled && !isOpen ? 'h-12 md:h-[68px]' : 'h-[68px] md:h-[122px]'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Desktop Menu */}
                            <div className={`hidden md:flex items-center gap-8 relative z-10 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                                {navLinks.map((item) => (
                                    <button
                                        key={item.sectionId}
                                        onClick={() => handleNavClick(item.sectionId)}
                                        className={`relative text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 py-1 cursor-pointer
                                            ${isActive(item.sectionId)
                                                ? 'text-aluna-gold'
                                                : scrolled
                                                    ? 'text-aluna-stone hover:text-aluna-charcoal'
                                                    : 'text-white/75 hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                        {isActive(item.sectionId) && (
                                            <motion.div
                                                layoutId="nav-underline"
                                                className="absolute -bottom-1 left-0 right-0 h-px bg-aluna-gold"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Mobile Hamburger — becomes styled close button when open */}
                            <button
                                onClick={() => toggleMenu(!isOpen)}
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                                className={`md:hidden z-[160] relative w-10 h-10 flex items-center justify-center focus:outline-none transition-all duration-300 ${
                                    isOpen ? 'rounded-xl bg-white/15 backdrop-blur-md border border-white/25' : ''
                                }`}
                            >
                                <div className="w-5 flex flex-col items-end gap-[5px]">
                                    <motion.span
                                        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                        className={`block w-full h-px transition-colors duration-200 ${isOpen ? 'bg-white' : 'bg-aluna-charcoal'}`}
                                    />
                                    <motion.span
                                        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.18 }}
                                        className={`block w-3.5 h-px transition-colors duration-200 ${isOpen ? 'bg-white' : 'bg-aluna-charcoal'}`}
                                    />
                                    <motion.span
                                        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                        className={`block w-full h-px transition-colors duration-200 ${isOpen ? 'bg-white' : 'bg-aluna-charcoal'}`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Mobile Menu Overlay — jeskojets style ── */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="fixed inset-0 z-[150]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Dark backdrop — page shows through dimmed */}
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                            {/* Content */}
                            <div className="relative flex flex-col h-full px-6 sm:px-10">

                                {/* Nav pills — right-aligned, staggered slide from right */}
                                <nav
                                    className="flex flex-col items-end gap-3 mt-32"
                                    aria-label="Mobile navigation"
                                >
                                    {navLinks.map((item, i) => (
                                        <motion.div
                                            key={item.sectionId}
                                            initial={{ opacity: 0, x: 48 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 48 }}
                                            transition={{
                                                duration: 0.55,
                                                ease: [0.22, 1, 0.36, 1],
                                                delay: 0.07 + i * 0.07,
                                            }}
                                        >
                                            <button
                                                onClick={() => handleNavClick(item.sectionId)}
                                                className="group flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full bg-white/[0.14] backdrop-blur-xl border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-colors duration-200"
                                            >
                                                <span className="text-[15px] font-medium tracking-wide">
                                                    {item.name}
                                                </span>
                                                <span className="w-8 h-8 rounded-full bg-aluna-gold/20 border border-aluna-gold/40 text-aluna-gold flex items-center justify-center flex-shrink-0 group-hover:bg-aluna-gold/35 group-hover:border-aluna-gold/60 transition-colors duration-200">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Contact info pills — pinned to bottom */}
                                <motion.div
                                    className="flex flex-col items-end gap-2 mt-auto mb-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.38 }}
                                >
                                    <a
                                        href="mailto:hello@alunareformerstudio.ro"
                                        className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-sm tracking-wide hover:text-white hover:bg-white/10 transition-colors duration-200"
                                    >
                                        hello@alunareformerstudio.ro
                                    </a>
                                    <a
                                        href="tel:+40786704688"
                                        className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-sm tracking-wide hover:text-white hover:bg-white/10 transition-colors duration-200"
                                    >
                                        0786 704 688
                                    </a>
                                    <a
                                        href="https://wa.me/40786704688"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-sm tracking-wide hover:text-[#25D366] hover:bg-white/10 transition-colors duration-200"
                                    >
                                        <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                                        WhatsApp
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
