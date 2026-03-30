import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalPortal from './ModalPortal';

interface ImageLightboxProps {
    isOpen: boolean;
    src: string;
    alt: string;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasNavigation?: boolean;
}

/* ── Slide variants: direction 1 = forward (next), -1 = backward (prev) ── */
const imageVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 80 : -80,
        opacity: 0,
        scale: 0.96,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -80 : 80,
        opacity: 0,
        scale: 0.96,
    }),
};

const imageTransition = {
    x: { type: 'spring' as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.25 },
    scale: { duration: 0.25 },
};

export default function ImageLightbox({
    isOpen,
    src,
    alt,
    onClose,
    onNext,
    onPrev,
    hasNavigation = false,
}: ImageLightboxProps) {
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [direction, setDirection] = useState(0);

    const goNext = useCallback(() => {
        setDirection(1);
        onNext?.();
    }, [onNext]);

    const goPrev = useCallback(() => {
        setDirection(-1);
        onPrev?.();
    }, [onPrev]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) goNext();
            else goPrev();
        } else if (dy > 50) {
            onClose();
        }
    };

    return (
        <ModalPortal>
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop scrim with blur */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-40"
                    />

                    {/* Whole lightbox shell — rises from beneath the screen */}
                    <motion.div
                        initial={{ y: '100vh', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100vh', opacity: 0 }}
                        transition={{
                            y: { type: 'spring' as const, stiffness: 120, damping: 22 },
                            opacity: { duration: 0.4 },
                        }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        {/* Image + close button wrapper */}
                        <div className="relative flex flex-col items-center max-w-4xl w-full px-4 sm:px-6 pointer-events-auto">
                            {/* Close button — centered above the image */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                onClick={onClose}
                                className="mb-3 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white transition-colors duration-200"
                                aria-label="Close lightbox"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            {/* Image */}
                            <div
                                className="relative w-full max-h-[80vh]"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    <motion.img
                                        key={src}
                                        src={src}
                                        alt={alt}
                                        custom={direction}
                                        variants={imageVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={imageTransition}
                                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                        draggable={false}
                                    />
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        {hasNavigation && (
                            <>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.3, duration: 0.3 }}
                                    onClick={goPrev}
                                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[60] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white transition-colors duration-200 pointer-events-auto"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </motion.button>

                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.3, duration: 0.3 }}
                                    onClick={goNext}
                                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[60] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white transition-colors duration-200 pointer-events-auto"
                                    aria-label="Next image"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </>
                        )}

                        {/* Swipe hint for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm pointer-events-none"
                        >
                            Swipe down to close
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        </ModalPortal>
    );
}
