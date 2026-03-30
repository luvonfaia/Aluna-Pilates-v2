import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContactModal } from '../../../context/ContactModalContext';
import { formConfig } from '../../../config/formConfig';

interface FormSuccessStateProps {
    onClose: () => void;
}

export default function FormSuccessState({ onClose }: FormSuccessStateProps) {
    const { t } = useTranslation();
    const { resetForm } = useContactModal();

    // Auto-close modal after configured delay
    useEffect(() => {
        const timer = setTimeout(() => {
            resetForm();
            onClose();
        }, formConfig.successAutoCloseDelay);

        return () => clearTimeout(timer);
    }, [onClose, resetForm]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center py-12 gap-6"
        >
            {/* Checkmark Icon */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-16 h-16 rounded-full bg-aluna-gold/10 flex items-center justify-center"
            >
                <motion.svg
                    initial={{ strokeDashoffset: 50, opacity: 0 }}
                    animate={{ strokeDashoffset: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="w-10 h-10 text-aluna-gold"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </motion.svg>
            </motion.div>

            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-center space-y-2"
            >
                <h3 className="text-lg font-serif text-aluna-charcoal">
                    {t('contact_modal.states.success_title')}
                </h3>
                <p className="text-sm text-aluna-stone">
                    {t('contact_modal.states.success_message')}
                </p>
            </motion.div>

            {/* Auto-close Progress Bar */}
            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: formConfig.successAutoCloseDelay / 1000, ease: 'linear' }}
                className="h-1 bg-aluna-gold/30 rounded-full w-full"
            />
        </motion.div>
    );
}
