import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../../hooks/useActiveSection';
import { useContactModal } from '../../context/ContactModalContext';

export default function Footer() {
    const { t } = useTranslation();
    const { openModal } = useContactModal();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-aluna-charcoal text-aluna-alabaster pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <button onClick={() => scrollToSection('home')} className="block mb-8 cursor-pointer">
                            <img
                                src="/logo.svg"
                                alt="ALUNA Reformer Studio"
                                className="h-28 md:h-40 w-auto object-contain brightness-[1.15] contrast-[0.9]"
                            />
                        </button>
                        <p className="text-aluna-alabaster/50 font-light text-sm leading-relaxed mb-7">
                            {t('footer.tagline')}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-aluna-alabaster/15 flex items-center justify-center text-aluna-alabaster/50 hover:border-aluna-gold hover:text-aluna-gold transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-aluna-alabaster/15 flex items-center justify-center text-aluna-alabaster/50 hover:border-aluna-gold hover:text-aluna-gold transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Studio links */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-aluna-gold mb-7 font-medium">{t('footer.sections.studio')}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: t('footer.links.about'), sectionId: 'about' },
                                { name: t('footer.links.classes'), sectionId: 'classes' },
                                { name: t('footer.links.instructors'), sectionId: 'about' },
                                { name: t('footer.links.pricing'), sectionId: 'classes' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <button
                                        onClick={() => scrollToSection(item.sectionId)}
                                        className="text-aluna-alabaster/50 hover:text-aluna-gold text-sm transition-colors duration-300 font-light cursor-pointer"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support links */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-aluna-gold mb-7 font-medium">{t('footer.sections.support')}</h4>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={openModal}
                                    className="text-aluna-alabaster/50 hover:text-aluna-gold text-sm transition-colors duration-300 font-light cursor-pointer"
                                >
                                    {t('footer.links.contact')}
                                </button>
                            </li>
                            {[
                                { name: t('footer.links.faq'), href: '#' },
                                { name: t('footer.links.privacy'), href: '#' },
                                { name: t('footer.links.terms'), href: '#' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} className="text-aluna-alabaster/50 hover:text-aluna-gold text-sm transition-colors duration-300 font-light">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-aluna-gold mb-7 font-medium">{t('footer.sections.newsletter')}</h4>
                        <p className="text-aluna-alabaster/45 font-light text-sm mb-6 leading-relaxed">
                            {t('footer.newsletter.desc')}
                        </p>
                        <form className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder={t('footer.newsletter.placeholder')}
                                className="bg-transparent border-b border-aluna-alabaster/20 py-2 text-sm text-aluna-alabaster focus:outline-none focus:border-aluna-gold transition-colors placeholder:text-aluna-alabaster/25"
                            />
                            <button
                                type="button"
                                className="text-left text-[10px] uppercase tracking-widest text-aluna-gold hover:text-aluna-gold-light transition-colors font-medium"
                            >
                                {t('footer.newsletter.button')} →
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider + bottom row */}
                <div className="border-t border-aluna-alabaster/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-aluna-alabaster/30 font-light tracking-wide">
                    <p>&copy; {currentYear} ALUNA Reformer Studio. {t('footer.rights')}</p>
                    <p>{t('footer.credit')}</p>
                </div>
            </div>
        </footer>
    );
}
