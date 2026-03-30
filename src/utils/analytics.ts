/**
 * Analytics utility for tracking contact form events
 * Integrates with Google Analytics 4 (gtag)
 */

export interface ContactFormEvent {
    event_name: string;
    event_value?: number;
    form_state?: 'idle' | 'loading' | 'success' | 'error';
    selected_class?: string;
    email_domain?: string;
    timestamp: string;
}

/**
 * Track contact modal opening
 */
export const trackModalOpen = () => {
    const event: ContactFormEvent = {
        event_name: 'contact_modal_opened',
        timestamp: new Date().toISOString(),
    };

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_modal_opened', {
            timestamp: event.timestamp,
        });
    }

    // Console log for debugging (remove in production)
    console.log('[Analytics]', event);
};

/**
 * Track contact form submission attempt
 */
export const trackFormSubmit = (selectedClass?: string) => {
    const event: ContactFormEvent = {
        event_name: 'contact_form_submitted',
        selected_class: selectedClass,
        timestamp: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_form_submitted', {
            selected_class: selectedClass,
            timestamp: event.timestamp,
        });
    }

    console.log('[Analytics]', event);
};

/**
 * Track successful form submission
 */
export const trackFormSuccess = (selectedClass?: string) => {
    const event: ContactFormEvent = {
        event_name: 'contact_form_success',
        form_state: 'success',
        selected_class: selectedClass,
        event_value: 1,
        timestamp: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_form_success', {
            value: 1,
            selected_class: selectedClass,
            timestamp: event.timestamp,
        });
    }

    console.log('[Analytics]', event);
};

/**
 * Track form submission error
 */
export const trackFormError = (errorMessage?: string) => {
    const event: ContactFormEvent = {
        event_name: 'contact_form_error',
        form_state: 'error',
        timestamp: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_form_error', {
            error_message: errorMessage,
            timestamp: event.timestamp,
        });
    }

    console.log('[Analytics]', event);
};

/**
 * Track modal closure
 */
export const trackModalClose = (submissionState?: 'idle' | 'loading' | 'success' | 'error') => {
    const event: ContactFormEvent = {
        event_name: 'contact_modal_closed',
        form_state: submissionState,
        timestamp: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_modal_closed', {
            form_state: submissionState,
            timestamp: event.timestamp,
        });
    }

    console.log('[Analytics]', event);
};

/**
 * Track class selection
 */
export const trackClassSelection = (className: string) => {
    const event: ContactFormEvent = {
        event_name: 'class_selected',
        selected_class: className,
        timestamp: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'class_selected', {
            class_name: className,
        });
    }

    console.log('[Analytics]', event);
};
