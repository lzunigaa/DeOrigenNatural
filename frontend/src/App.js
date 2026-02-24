import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Processes } from './components/Processes';
import { Values } from './components/Values';
import { Varieties } from './components/Varieties';
import { Services } from './components/Services';
import { Sustainability } from './components/Sustainability';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toaster } from 'sonner';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FDFBF7]" data-testid="app-container">
        <Toaster 
          position="top-right" 
          richColors 
          toastOptions={{
            style: {
              fontFamily: 'Manrope, sans-serif',
            },
          }}
        />
        <Header />
        <main>
          <Hero />
          <About />
          <Processes />
          <Values />
          <Varieties />
          <Services />
          <Sustainability />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
