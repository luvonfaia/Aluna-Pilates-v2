import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../hooks/useActiveSection';
export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: t('nav.about'), onClick: () => scrollToSection('about') },
        { label: t('nav.schedule'), onClick: () => scrollToSection('schedule') },
        { label: t('nav.pricing'), onClick: () => scrollToSection('pricing') },
    ];

    return (
        <footer className="bg-aluna-cream pt-16 pb-20 sm:pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Three-column layout */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-6 pb-12">
                    {/* LEFT: Logo + Studio name */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <button onClick={() => scrollToSection('home')} className="cursor-pointer">
                            <img
                                src="/logo.svg"
                                alt="ALUNA Studio"
                                className="h-16 w-auto object-contain"
                            />
                        </button>
                        <span className="font-serif text-aluna-charcoal text-sm tracking-[0.2em] uppercase">
                            Aluna Studio
                        </span>
                    </div>

                    {/* CENTER: Nav links */}
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-10">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={link.onClick}
                                className="text-aluna-charcoal hover:text-aluna-gold text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-300 cursor-pointer"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* RIGHT: Instagram + Copyright */}
                    <div className="flex flex-col items-center md:items-end gap-3">
                        <a
                            href="https://www.instagram.com/alunareformerstudio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-aluna-stone hover:text-aluna-gold transition-colors duration-300"
                            aria-label="Instagram"
                        >
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <span className="text-xs tracking-[0.12em]">alunareformerstudio</span>
                        </a>
                        <p className="text-aluna-stone/60 text-[10px] font-light tracking-wide">
                            &copy; {currentYear} ALUNA Studio
                        </p>
                    </div>
                </div>

                {/* Bottom border */}
                <div className="border-t border-aluna-charcoal/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-aluna-stone/50 text-[10px] uppercase tracking-[0.3em] font-light">
                        {t('footer.rights')}
                    </p>
                    <Link
                        to="/cookie-policy"
                        className="text-aluna-stone/50 hover:text-aluna-gold text-[10px] uppercase tracking-[0.3em] font-light transition-colors duration-200"
                    >
                        {t('cookie_policy.title')}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
