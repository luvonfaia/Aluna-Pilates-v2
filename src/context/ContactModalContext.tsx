import React, { createContext, useContext, useState, useCallback } from 'react';

export type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

interface ContactModalContextType {
    isOpen: boolean;
    submissionState: SubmissionState;
    errorMessage: string | null;
    openModal: () => void;
    closeModal: () => void;
    setSubmissionState: (state: SubmissionState) => void;
    setErrorMessage: (message: string | null) => void;
    resetForm: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const ContactModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    const resetForm = useCallback(() => {
        setSubmissionState('idle');
        setErrorMessage(null);
    }, []);

    const value: ContactModalContextType = {
        isOpen,
        submissionState,
        errorMessage,
        openModal,
        closeModal,
        setSubmissionState,
        setErrorMessage,
        resetForm,
    };

    return (
        <ContactModalContext.Provider value={value}>
            {children}
        </ContactModalContext.Provider>
    );
};

export const useContactModal = (): ContactModalContextType => {
    const context = useContext(ContactModalContext);
    if (!context) {
        throw new Error('useContactModal must be used within ContactModalProvider');
    }
    return context;
};
