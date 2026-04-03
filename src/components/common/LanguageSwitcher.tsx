import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const inactiveClass = onDark
        ? 'text-white/55 hover:text-white'
        : 'text-aluna-stone hover:text-aluna-charcoal';

    const dividerClass = onDark ? 'text-white/25' : 'text-aluna-stone/50';

    return (
        <div className="flex items-center space-x-2.5 text-xs sm:text-[13px] uppercase tracking-widest font-medium">
            <button
                onClick={() => changeLanguage('ro')}
                className={`cursor-pointer transition-colors duration-300 ${i18n.language === 'ro' ? 'text-aluna-gold' : inactiveClass}`}
            >
                RO
            </button>
            <span className={dividerClass}>|</span>
            <button
                onClick={() => changeLanguage('en')}
                className={`cursor-pointer transition-colors duration-300 ${i18n.language === 'en' ? 'text-aluna-gold' : inactiveClass}`}
            >
                EN
            </button>
        </div>
    );
}
