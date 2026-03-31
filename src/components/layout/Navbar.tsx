import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useActiveSection, scrollToSection } from '../../hooks/useActiveSection';
import { useContactModal } from '../../context/ContactModalContext';

export default function Navbar() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const activeSection = useActiveSection();
    const { openModal } = useContactModal();

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
        { name: t('nav.about'), sectionId: 'about' },
        { name: t('nav.classes'), sectionId: 'classes' },
        { name: t('nav.gallery'), sectionId: 'gallery' },
        { name: t('nav.contact'), sectionId: 'contact' },
    ];

    const handleNavClick = (sectionId: string) => {
        if (sectionId === 'contact') {
            openModal();
        } else {
            scrollToSection(sectionId);
        }
        setIsOpen(false);
    };

    const isActive = (sectionId: string) => sectionId !== 'contact' && activeSection === sectionId;

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100]">
                {/* Top info strip */}
                <div className={`transition-all duration-500 ${scrolled ? 'bg-aluna-alabaster/95 backdrop-blur-md' : 'bg-white/5 backdrop-blur-sm'} border-b border-white/10 py-2.5 px-4 sm:px-6`}>
                    <div className="max-w-7xl mx-auto flex justify-center items-center gap-6 sm:gap-12 text-[11px] sm:text-xs tracking-[0.18em] font-medium">
                        <div className="flex items-center gap-5 sm:gap-7">
                            <a
                                href="https://www.instagram.com/alunareformerstudio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 transition-colors duration-300 hover:text-aluna-gold ${scrolled ? 'text-aluna-stone' : 'text-white/80'}`}
                                aria-label="Instagram"
                            >
                                <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                <span className="hidden min-[500px]:inline tracking-[0.15em]">alunareformerstudio</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-7">
                            <a
                                href="mailto:hello@alunareformerstudio.ro"
                                className={`hover:text-aluna-gold transition-colors duration-300 ${scrolled ? 'text-aluna-stone/70' : 'text-white/60'}`}
                                aria-label="Email"
                            >
                                <svg className="min-[500px]:hidden w-[18px] h-[18px] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                                </svg>
                                <span className="hidden min-[500px]:inline">hello@alunareformerstudio.ro</span>
                            </a>
                            <span className={`w-px h-3.5 hidden sm:block ${scrolled ? 'bg-aluna-stone/20' : 'bg-white/15'}`} />
                            <div className={scrolled ? '' : 'text-white/60'}>
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main nav bar */}
                <div className={`transition-all duration-500 relative z-[160] ${
                    scrolled && !isOpen
                        ? 'bg-aluna-alabaster/97 backdrop-blur-lg shadow-sm border-b border-aluna-stone/8 py-2'
                        : 'bg-transparent py-3'
                }`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex justify-between items-center">
                            {/* Logo */}
                            <div className={`relative z-10 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
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
                                <LanguageSwitcher />
                                <button
                                    onClick={openModal}
                                    className={`btn-primary text-[10px] py-2.5 transition-all duration-300 cursor-pointer ${
                                        !scrolled ? 'btn-primary-light' : 'btn-primary'
                                    }`}
                                >
                                    {t('nav.book')}
                                </button>
                            </div>

                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden z-[160] relative w-10 h-10 flex items-center justify-center focus:outline-none"
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            >
                                <div className="w-6 flex flex-col items-end gap-[6px]">
                                    <motion.span
                                        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="block w-full h-px bg-aluna-charcoal"
                                    />
                                    <motion.span
                                        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="block w-4 h-px bg-aluna-charcoal"
                                    />
                                    <motion.span
                                        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="block w-full h-px bg-aluna-charcoal"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 bg-aluna-alabaster z-[150] flex flex-col items-center justify-center"
                        >
                            <motion.nav
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.07 } }
                                }}
                                className="flex flex-col items-center gap-8"
                                aria-label="Mobile navigation"
                            >
                                {navLinks.map((item) => (
                                    <motion.div
                                        key={item.sectionId}
                                        variants={{
                                            hidden: { opacity: 0, y: 16 },
                                            visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1] } }
                                        }}
                                    >
                                        <button
                                            onClick={() => handleNavClick(item.sectionId)}
                                            className={`text-4xl font-serif transition-colors cursor-pointer ${isActive(item.sectionId) ? 'text-aluna-gold' : 'text-aluna-charcoal hover:text-aluna-gold'}`}
                                        >
                                            {item.name}
                                        </button>
                                    </motion.div>
                                ))}
                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                                >
                                    <LanguageSwitcher />
                                </motion.div>
                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                                    className="mt-4"
                                >
                                    <button
                                        onClick={() => { openModal(); setIsOpen(false); }}
                                        className="btn-primary px-12 py-4 cursor-pointer"
                                    >
                                        {t('nav.book')}
                                    </button>
                                </motion.div>
                            </motion.nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
