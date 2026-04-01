import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContactModal } from '../../context/ContactModalContext';
import ModalPortal from '../common/ModalPortal';
import ContactModalForm from './ContactModalForm';
import FormLoadingState from './FormStates/FormLoadingState';
import FormSuccessState from './FormStates/FormSuccessState';
import FormErrorState from './FormStates/FormErrorState';
import { trackModalOpen, trackModalClose } from '../../utils/analytics';

// Jeskojets-style easing: fast launch, gentle deceleration
const EASE_OUT: [number, number, number, number] = [0.25, 1, 0.5, 1];

export default function ContactModal() {
    const { t } = useTranslation();
    const { isOpen, closeModal, submissionState } = useContactModal();
    const panelRef = useRef<HTMLDivElement>(null);

    // Track open/close
    useEffect(() => {
        if (isOpen) trackModalOpen();
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) trackModalClose(submissionState);
    }, [isOpen, submissionState]);

    // Escape key + scroll lock
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, closeModal]);

    return (
        <ModalPortal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[250]">
                        {/* ── Backdrop ── no blur, just dark overlay like jeskojets */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: EASE_OUT }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/40"
                            aria-hidden="true"
                        />

                        {/* ── Bottom-anchored panel ── slides up from below */}
                        <motion.div
                            ref={panelRef}
                            initial={{ y: '110%' }}
                            animate={{ y: '0%' }}
                            exit={{ y: '110%' }}
                            transition={{ duration: 1, ease: EASE_OUT }}
                            className="absolute bottom-8 sm:bottom-10 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-[min(520px,calc(100%-64px))] z-[300] pointer-events-auto flex flex-col items-center"
                            role="dialog"
                            aria-modal="true"
                            aria-label={t('contact_modal.form.name_label')}
                        >
                            {/* ── Close button (floating, above panel with gap) ── */}
                            <motion.button
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
                                onClick={closeModal}
                                className="w-11 h-11 mb-3 rounded-full bg-white/90 backdrop-blur-sm border border-aluna-stone/15 shadow-lg flex items-center justify-center text-aluna-stone hover:text-aluna-charcoal hover:border-aluna-gold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aluna-gold flex-shrink-0 cursor-pointer"
                                aria-label="Close contact form"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            <div className="bg-aluna-cream rounded-3xl sm:rounded-[24px] shadow-2xl max-h-[85vh] overflow-y-auto w-full">

                                {/* ── Header ── */}
                                <div className="px-8 pt-4 pb-2 sm:px-10 sm:pt-6 sm:pb-3">
                                    <h2 className="text-2xl sm:text-3xl font-serif text-aluna-charcoal">
                                        {submissionState === 'success'
                                            ? t('contact_modal.states.success_title')
                                            : 'Contact'}
                                    </h2>
                                </div>

                                {/* ── Content (state router) ── */}
                                <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                                    <AnimatePresence mode="wait">
                                        {submissionState === 'idle' && (
                                            <motion.div
                                                key="form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.4, ease: EASE_OUT }}
                                            >
                                                <ContactModalForm />
                                            </motion.div>
                                        )}
                                        {submissionState === 'loading' && (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FormLoadingState />
                                            </motion.div>
                                        )}
                                        {submissionState === 'success' && (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 30 }}
                                                transition={{ duration: 0.5, ease: EASE_OUT }}
                                            >
                                                <FormSuccessState onClose={closeModal} />
                                            </motion.div>
                                        )}
                                        {submissionState === 'error' && (
                                            <motion.div
                                                key="error"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FormErrorState />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ModalPortal>
    );
}
