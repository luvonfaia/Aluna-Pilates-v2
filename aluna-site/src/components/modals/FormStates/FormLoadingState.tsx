import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function FormLoadingState() {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 gap-4"
        >
            {/* Spinner */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-3 border-aluna-stone/20 border-t-aluna-gold rounded-full"
            />

            {/* Loading Text */}
            <p className="text-sm text-aluna-stone text-center">
                {t('contact_modal.form.submitting')}
            </p>
        </motion.div>
    );
}
