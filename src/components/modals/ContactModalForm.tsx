import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useContactModal } from '../../context/ContactModalContext';
import ClassSelectionDropdown from './ClassSelectionDropdown';
import PrivacyCheckbox from './PrivacyCheckbox';
import { trackFormSubmit, trackFormSuccess, trackFormError } from '../../utils/analytics';

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    class: string;
    privacy_agreed: boolean;
}

export default function ContactModalForm() {
    const { t } = useTranslation();
    const { setSubmissionState, setErrorMessage } = useContactModal();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            class: '',
            privacy_agreed: false,
        },
        mode: 'onChange',
    });

    const agreePrivacy = watch('privacy_agreed');

    const onSubmit = async (data: ContactFormData) => {
        setSubmissionState('loading');

        // Track form submission
        trackFormSubmit(data.class);

        // Map class ID to class title for email
        const classNames: Record<string, string> = {
            individual: t('pricing.individual.title'),
            semi_private: t('pricing.semi_private.title'),
        };

        const className = classNames[data.class] || data.class;
        const formData = {
            name: data.name,
            email: data.email,
            phone: data.phone || 'N/A',
            class: className,
            _subject: 'New Class Inquiry - ALUNA',
            _reply_to: data.email,
        };

        try {
            const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

            if (!formspreeId) {
                throw new Error('Formspree ID not configured');
            }

            const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                trackFormSuccess(className);
                setSubmissionState('success');
            } else {
                const errorData = await response.json();
                const errorMsg = errorData.error || t('contact_modal.states.error');
                trackFormError(errorMsg);
                setErrorMessage(errorMsg);
                setSubmissionState('error');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Network error';
            trackFormError(message);
            setErrorMessage(message);
            setSubmissionState('error');
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            {/* Name Field */}
            <div>
                <label className="block text-[10px] uppercase tracking-[0.35em] text-aluna-stone font-semibold mb-2">
                    {t('contact_modal.form.name_label')}
                </label>
                <input
                    type="text"
                    placeholder={t('contact_modal.form.name_placeholder')}
                    {...register('name', {
                        required: t('contact_modal.validation.required'),
                        minLength: {
                            value: 2,
                            message: t('contact_modal.validation.name_min'),
                        },
                    })}
                    className="w-full px-4 py-3 bg-white border border-aluna-stone/20 rounded text-aluna-charcoal placeholder-aluna-stone/50 focus:outline-none focus:border-aluna-gold focus:ring-1 focus:ring-aluna-gold transition-all"
                    disabled={isSubmitting}
                />
                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label className="block text-[10px] uppercase tracking-[0.35em] text-aluna-stone font-semibold mb-2">
                    {t('contact_modal.form.email_label')}
                </label>
                <input
                    type="email"
                    placeholder={t('contact_modal.form.email_placeholder')}
                    {...register('email', {
                        required: t('contact_modal.validation.required'),
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('contact_modal.validation.email_invalid'),
                        },
                    })}
                    className="w-full px-4 py-3 bg-white border border-aluna-stone/20 rounded text-aluna-charcoal placeholder-aluna-stone/50 focus:outline-none focus:border-aluna-gold focus:ring-1 focus:ring-aluna-gold transition-all"
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Phone Field */}
            <div>
                <label className="block text-[10px] uppercase tracking-[0.35em] text-aluna-stone font-semibold mb-2">
                    {t('contact_modal.form.phone_label')}
                </label>
                <input
                    type="tel"
                    placeholder={t('contact_modal.form.phone_placeholder')}
                    {...register('phone', {
                        pattern: {
                            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                            message: t('contact_modal.validation.phone_invalid'),
                        },
                    })}
                    className="w-full px-4 py-3 bg-white border border-aluna-stone/20 rounded text-aluna-charcoal placeholder-aluna-stone/50 focus:outline-none focus:border-aluna-gold focus:ring-1 focus:ring-aluna-gold transition-all"
                    disabled={isSubmitting}
                />
                {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                )}
            </div>

            {/* Class Selection */}
            <ClassSelectionDropdown control={control} isDisabled={isSubmitting} />

            {/* Privacy Checkbox */}
            <PrivacyCheckbox control={control} isDisabled={isSubmitting} />

            {/* Submit Button — sticky so it's always visible on mobile */}
            <div className="sticky bottom-0 -mx-8 sm:-mx-10 px-8 sm:px-10 pt-3 pb-8 bg-aluna-cream">
                <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting || !agreePrivacy}
                    className="w-full py-3 bg-aluna-charcoal text-aluna-alabaster rounded font-semibold hover:bg-aluna-gold hover:text-aluna-charcoal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-aluna-gold focus:ring-offset-2"
                >
                    {isSubmitting ? t('contact_modal.form.submitting') : t('contact_modal.form.submit')}
                </motion.button>
            </div>
        </motion.form>
    );
}
