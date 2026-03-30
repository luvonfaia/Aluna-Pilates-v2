import { useState, useEffect } from 'react';

const SECTION_IDS = ['home', 'about', 'classes', 'gallery'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function scrollToSection(id: string) {
    if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function useActiveSection(): SectionId {
    const [active, setActive] = useState<SectionId>('home');

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActive(id);
                },
                { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
            );

            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return active;
}
