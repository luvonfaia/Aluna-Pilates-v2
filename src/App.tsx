import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BackToTop from './components/common/BackToTop';
import FloatingCTA from './components/common/FloatingCTA';
import ScrollToTop from './components/common/ScrollToTop';
import CookieBanner from './components/common/CookieBanner';
import { ContactModalProvider } from './context/ContactModalContext';
import ContactModal from './components/modals/ContactModal';

function App() {
  const [cookieBannerVisible, setCookieBannerVisible] = useState(
    () => !localStorage.getItem('cookie_consent')
  );

  return (
    <ContactModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-aluna-alabaster font-sans text-aluna-charcoal flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <BackToTop />
          <FloatingCTA cookieBannerVisible={cookieBannerVisible} />
          <Footer />
          <ContactModal />
          <CookieBanner onDismiss={() => setCookieBannerVisible(false)} />
        </div>
      </BrowserRouter>
    </ContactModalProvider>
  );
}

export default App;
