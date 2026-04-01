import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner({ onDismiss }: { onDismiss: () => void }) {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) setVisible(true);
    }, []);

    function handleAccept() {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        setVisible(false);
        onDismiss();
    }

    function handleDecline() {
        localStorage.setItem(STORAGE_KEY, 'declined');
        setVisible(false);
        onDismiss();
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-[200] bg-aluna-charcoal/95 backdrop-blur-sm border-t border-white/10"
                >
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        <p className="text-white/75 text-xs leading-relaxed flex-1">
                            {t('cookie_banner.message')}{' '}
                            <Link
                                to="/cookie-policy"
                                className="text-aluna-gold hover:text-aluna-gold-light underline underline-offset-2 transition-colors duration-200 whitespace-nowrap"
                            >
                                {t('cookie_banner.learn_more')}
                            </Link>
                        </p>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                                onClick={handleDecline}
                                className="text-white/50 hover:text-white/80 text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                            >
                                {t('cookie_banner.decline')}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-5 py-2 bg-aluna-gold hover:bg-aluna-gold-light text-aluna-charcoal text-xs uppercase tracking-widest font-medium transition-colors duration-200 cursor-pointer"
                            >
                                {t('cookie_banner.accept')}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
