import { BrowserRouter } from 'react-router-dom';
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

function App() {
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
