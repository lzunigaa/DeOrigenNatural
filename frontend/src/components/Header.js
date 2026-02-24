import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'processes', href: '#processes' },
    { key: 'values', href: '#values' },
    { key: 'varieties', href: '#varieties' },
    { key: 'services', href: '#services' },
    { key: 'sustainability', href: '#sustainability' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        data-testid="main-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-header py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            data-testid="logo-link"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className={`font-serif text-2xl font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-[#1A3C34]' : 'text-white'
            }`}>
              CAOJAMBO
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.key}
                data-testid={`nav-${item.key}`}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C06E52] ${
                  isScrolled ? 'text-[#1A3C34]' : 'text-white'
                }`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              data-testid="language-toggle"
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all hover:bg-[#1A3C34] hover:text-white hover:border-[#1A3C34] ${
                isScrolled 
                  ? 'border-[#1A3C34] text-[#1A3C34]' 
                  : 'border-white/50 text-white'
              }`}
            >
              <Globe size={16} />
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? 'text-[#1A3C34]' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#FDFBF7] pt-24 lg:hidden"
          >
            <nav className="flex flex-col items-center gap-6 p-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  data-testid={`mobile-nav-${item.key}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-2xl font-serif text-[#1A3C34] hover:text-[#C06E52] transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
