import Lenis from 'lenis';

let _lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
    return _lenis;
}

export function setLenis(instance: Lenis | null): void {
    _lenis = instance;
}

export function scrollTo(
    target: string | number | HTMLElement,
    options?: Parameters<Lenis['scrollTo']>[1]
): void {
    _lenis?.scrollTo(target as string & number & HTMLElement, options);
}
