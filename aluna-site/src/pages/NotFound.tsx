import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-aluna-alabaster text-center px-4">
            <h1 className="text-9xl font-serif text-aluna-charcoal mb-4 opacity-10">404</h1>
            <h2 className="text-3xl md:text-4xl font-serif text-aluna-charcoal mb-6">{t('not_found.title')}</h2>
            <p className="text-xl text-aluna-stone font-light mb-12 max-w-md">
                {t('not_found.desc')}
            </p>
            <Link
                to="/"
                className="btn-primary"
            >
                {t('not_found.back')}
            </Link>
        </div>
    );
}
