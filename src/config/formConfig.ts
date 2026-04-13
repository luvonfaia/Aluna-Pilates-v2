/**
 * External booking platform URL (Gym Management App)
 */
export const GMA_BOOKING_URL =
    'https://alunareformerstudio.gym-management-app.com/leads/new?locale=ro&mobile_app=true';

/**
 * Contact Form Configuration
 * Customize form behavior, messages, and styling
 */

export const formConfig = {
    // Success state behavior
    successAutoCloseDelay: 3000, // milliseconds (3 seconds)

    // Success message customization
    successMessage: {
        // You can override these in translations (contact_modal.states.success_title, success_message)
        // Or customize here:
        showCheckmark: true,
        playSound: false, // Play success sound (future enhancement)
        triggerConfetti: false, // Trigger confetti animation (future enhancement)
    },

    // Form submission configuration
    submission: {
        debounceMs: 1000, // Prevent double-submit within 1 second
        timeoutMs: 10000, // Timeout if request takes > 10 seconds
    },

    // Validation configuration
    validation: {
        nameMinLength: 2,
        phonePattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        emailPattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },

    // Animation configuration
    animations: {
        modalEntranceDuration: 0.3, // seconds
        stateTransitionDuration: 0.4, // seconds
        checkmarkRotationDuration: 0.5, // seconds
    },

    // Formspree configuration
    formspree: {
        baseUrl: 'https://formspree.io/f',
        subject: 'New Class Inquiry - ALUNA',
    },
};

/**
 * Get customized success message
 * Can be overridden by i18next translations
 */
export const getSuccessConfig = () => ({
    autoCloseDelay: formConfig.successAutoCloseDelay,
    showCheckmark: formConfig.successMessage.showCheckmark,
    playSound: formConfig.successMessage.playSound,
    triggerConfetti: formConfig.successMessage.triggerConfetti,
});

/**
 * Example of how to customize:
 *
 * // In this file, modify formConfig:
 * successAutoCloseDelay: 5000, // 5 seconds instead of 3
 *
 * // Or in locale files (en.json):
 * "contact_modal": {
 *   "states": {
 *     "success_title": "Thank You!",
 *     "success_message": "Your inquiry has been received. We'll contact you within 24 hours."
 *   }
 * }
 */
