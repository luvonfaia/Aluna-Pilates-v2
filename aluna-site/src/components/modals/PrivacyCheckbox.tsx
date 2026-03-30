import { Controller, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface PrivacyCheckboxProps {
    control: Control<any>;
    isDisabled?: boolean;
}

export default function PrivacyCheckbox({ control, isDisabled }: PrivacyCheckboxProps) {
    const { t } = useTranslation();

    return (
        <Controller
            name="privacy_agreed"
            control={control}
            rules={{ required: t('contact_modal.validation.required') }}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <motion.label
                        whileHover={{ x: 2 }}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <input
                            type="checkbox"
                            {...field}
                            disabled={isDisabled}
                            className="w-5 h-5 rounded border border-aluna-stone/30 accent-aluna-gold cursor-pointer group-hover:border-aluna-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <span className="text-xs text-aluna-stone/75 group-hover:text-aluna-charcoal transition-colors">
                            {t('contact_modal.form.privacy_label')}{' '}
                            <a
                                href="/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aluna-gold hover:underline font-semibold"
                            >
                                {t('contact_modal.form.privacy_link')}
                            </a>
                        </span>
                    </motion.label>
                    {error && <p className="text-xs text-red-500 mt-2">{error.message}</p>}
                </div>
            )}
        />
    );
}
