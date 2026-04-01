/**
 * Analytics utility for tracking contact form events
 * Integrates with Google Analytics 4 (gtag)
 */

function gtag(event: string, params: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event, { timestamp: new Date().toISOString(), ...params });
    }
}

export const trackModalOpen = () =>
    gtag('contact_modal_opened', {});

export const trackFormSubmit = (selectedClass?: string) =>
    gtag('contact_form_submitted', { selected_class: selectedClass });

export const trackFormSuccess = (selectedClass?: string) =>
    gtag('contact_form_success', { value: 1, selected_class: selectedClass });

export const trackFormError = (errorMessage?: string) =>
    gtag('contact_form_error', { error_message: errorMessage });

export const trackModalClose = (submissionState?: 'idle' | 'loading' | 'success' | 'error') =>
    gtag('contact_modal_closed', { form_state: submissionState });

export const trackClassSelection = (className: string) =>
    gtag('class_selected', { class_name: className });
