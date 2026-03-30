import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContactModal } from '../../../context/ContactModalContext';

export default function FormErrorState() {
    const { t } = useTranslation();
    const { resetForm, errorMessage } = useContactModal();

    const handleRetry = () => {
        resetForm();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 gap-6"
        >
            {/* Error Icon */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center"
            >
                <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </motion.div>

            {/* Error Message */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-center space-y-3"
            >
                <h3 className="text-lg font-serif text-aluna-charcoal">
                    {t('contact_modal.states.error_title')}
                </h3>
                <p className="text-sm text-aluna-stone">
                    {errorMessage || t('contact_modal.states.error_message')}
                </p>
            </motion.div>

            {/* Retry Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetry}
                className="px-6 py-2 bg-aluna-charcoal text-aluna-alabaster rounded font-semibold hover:bg-aluna-gold hover:text-aluna-charcoal transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aluna-gold"
            >
                {t('contact_modal.actions.retry')}
            </motion.button>
        </motion.div>
    );
}
