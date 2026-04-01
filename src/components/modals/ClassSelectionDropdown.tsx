import { Controller, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackClassSelection } from '../../utils/analytics';

interface ClassSelectionDropdownProps {
    control: Control<any>;
    isDisabled?: boolean;
}

interface ClassOption {
    value: string;
    label: string;
}

export default function ClassSelectionDropdown({ control, isDisabled }: ClassSelectionDropdownProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const classOptions: ClassOption[] = [
        { value: 'individual', label: t('pricing.individual.title') },
        { value: 'semi_private', label: t('pricing.semi_private.title') },
    ];

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    return (
        <Controller
            name="class"
            control={control}
            rules={{ required: t('contact_modal.validation.required') }}
            render={({ field, fieldState: { error } }) => (
                <div className="relative" ref={containerRef}>
                    <label className="block text-[10px] uppercase tracking-[0.35em] text-aluna-stone font-semibold mb-2">
                        {t('contact_modal.form.class_label')}
                    </label>

                    {/* Trigger */}
                    <motion.button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        disabled={isDisabled}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-4 py-3 bg-white rounded-xl text-left transition-all duration-300 flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed ${
                            isOpen
                                ? 'border-aluna-gold ring-1 ring-aluna-gold/30 shadow-md border'
                                : error
                                  ? 'border border-red-400 shadow-sm'
                                  : 'border border-aluna-stone/15 shadow-sm hover:border-aluna-stone/30 hover:shadow-md'
                        }`}
                    >
                        <span className={field.value ? 'text-aluna-charcoal font-medium' : 'text-aluna-stone/50'}>
                            {field.value
                                ? classOptions.find((opt) => opt.value === field.value)?.label
                                : t('contact_modal.form.class_placeholder')}
                        </span>

                        {/* Chevron */}
                        <motion.svg
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                            className="w-4 h-4 text-aluna-stone/60 flex-shrink-0 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                    </motion.button>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-aluna-stone/10 shadow-xl overflow-hidden z-50"
                            >
                                <div className="p-1.5">
                                    {classOptions.map((option, index) => {
                                        const isSelected = field.value === option.value;
                                        return (
                                            <motion.button
                                                key={option.value}
                                                type="button"
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.04, duration: 0.2 }}
                                                onClick={() => {
                                                    field.onChange(option.value);
                                                    trackClassSelection(option.label);
                                                    setIsOpen(false);
                                                }}
                                                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-all duration-200 ${
                                                    isSelected
                                                        ? 'bg-aluna-gold/10 text-aluna-charcoal'
                                                        : 'text-aluna-charcoal/80 hover:bg-aluna-cream/60'
                                                }`}
                                            >
                                                <span className={isSelected ? 'font-medium' : ''}>
                                                    {option.label}
                                                </span>

                                                {/* Checkmark for selected */}
                                                {isSelected && (
                                                    <motion.svg
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                                                        className="w-4 h-4 text-aluna-gold flex-shrink-0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </motion.svg>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error */}
                    {error && <p className="text-xs text-red-500 mt-1.5">{error.message}</p>}
                </div>
            )}
        />
    );
}
