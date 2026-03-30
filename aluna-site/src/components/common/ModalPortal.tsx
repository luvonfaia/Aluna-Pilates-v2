import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
    children: React.ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Get or create modal root element
        let root = document.getElementById('modal-root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'modal-root';
            document.body.appendChild(root);
        }
        setPortalRoot(root);
    }, []);

    if (!portalRoot) return null;

    return createPortal(children, portalRoot);
}
