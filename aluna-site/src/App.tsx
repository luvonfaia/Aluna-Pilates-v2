import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Gallery from './pages/Gallery';
import BackToTop from './components/common/BackToTop';
import FloatingCTA from './components/common/FloatingCTA';
import { ContactModalProvider } from './context/ContactModalContext';
import ContactModal from './components/modals/ContactModal';
import { gsap, ScrollTrigger } from './lib/scrollTrigger';
import { setLenis } from './lib/lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <ContactModalProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-aluna-alabaster font-sans text-aluna-charcoal flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Home />
            <About />
            <Classes />
            <Gallery />
          </main>
          <BackToTop />
          <FloatingCTA />
          <Footer />
          <ContactModal />
        </div>
      </BrowserRouter>
    </ContactModalProvider>
  );
}

export default App;
