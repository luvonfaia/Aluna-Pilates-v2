import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-medium">
            <button
                onClick={() => changeLanguage('ro')}
                className={`cursor-pointer transition-colors duration-300 ${i18n.language === 'ro' ? 'text-aluna-gold' : 'text-aluna-stone hover:text-aluna-charcoal'
                    }`}
            >
                RO
            </button>
            <span className="text-aluna-stone/50">|</span>
            <button
                onClick={() => changeLanguage('en')}
                className={`cursor-pointer transition-colors duration-300 ${i18n.language === 'en' ? 'text-aluna-gold' : 'text-aluna-stone hover:text-aluna-charcoal'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
