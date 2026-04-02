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

                                {/* ── Quick-contact buttons ── */}
                                {submissionState === 'idle' && (
                                    <div className="px-8 sm:px-10 pb-5">
                                        <div className="flex gap-3">
                                            <a
                                                href="tel:+40786704688"
                                                className="flex-1 flex items-center justify-center gap-2.5 h-11 rounded-xl border border-aluna-stone/20 bg-aluna-alabaster hover:bg-aluna-gold/10 hover:border-aluna-gold/40 transition-all duration-300 text-aluna-charcoal"
                                            >
                                                <svg className="w-4 h-4 text-aluna-gold flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                                </svg>
                                                <span className="text-[11px] font-medium tracking-wide">0786 704 688</span>
                                            </a>
                                            <a
                                                href="https://wa.me/40786704688"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2.5 h-11 rounded-xl border border-aluna-stone/20 bg-aluna-alabaster hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-all duration-300 text-aluna-charcoal"
                                            >
                                                <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                                                    <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                <span className="text-[11px] font-medium tracking-wide">WhatsApp</span>
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3 mt-5 mb-1">
                                            <div className="flex-1 h-px bg-aluna-stone/15" />
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-aluna-stone/50">{t('contact_modal.or_send_message')}</span>
                                            <div className="flex-1 h-px bg-aluna-stone/15" />
                                        </div>
                                    </div>
                                )}

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
