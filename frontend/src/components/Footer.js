import { motion } from 'framer-motion';
import { MapPin, Phone, Envelope, InstagramLogo, LinkedinLogo, FacebookLogo } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      data-testid="footer"
      className="bg-[#1A3C34] text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <button 
              onClick={scrollToTop}
              className="inline-block mb-4"
              data-testid="footer-logo"
            >
              <span className="font-serif text-3xl font-bold tracking-tight text-white hover:text-[#C06E52] transition-colors">
                CAOJAMBO
              </span>
            </button>
            <p className="text-white/70 leading-relaxed mb-6 max-w-md">
              {t('footer.tagline')}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-[#C06E52] hover:bg-[#C06E52] transition-all"
                data-testid="social-instagram"
              >
                <InstagramLogo size={20} weight="regular" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-[#C06E52] hover:bg-[#C06E52] transition-all"
                data-testid="social-linkedin"
              >
                <LinkedinLogo size={20} weight="regular" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-[#C06E52] hover:bg-[#C06E52] transition-all"
                data-testid="social-facebook"
              >
                <FacebookLogo size={20} weight="regular" />
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-serif text-lg font-semibold mb-6">
              {t('contact.title')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} weight="thin" className="text-[#C06E52] flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-white/50 text-sm">{t('footer.address')}</span>
                  <span className="text-white">{t('footer.addressValue')}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} weight="thin" className="text-[#C06E52] flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-white/50 text-sm">{t('footer.phone')}</span>
                  <span className="text-white">{t('footer.phoneValue')}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Envelope size={20} weight="thin" className="text-[#C06E52] flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-white/50 text-sm">{t('footer.email')}</span>
                  <span className="text-white">{t('footer.emailValue')}</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-serif text-lg font-semibold mb-6">
              Links
            </h4>
            <ul className="space-y-3">
              {['about', 'processes', 'values', 'varieties', 'services', 'sustainability', 'gallery', 'contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`}
                    className="text-white/70 hover:text-[#C06E52] transition-colors"
                    data-testid={`footer-link-${item}`}
                  >
                    {t(`nav.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} De Origen Natural Company. {t('footer.rights')}.
          </p>
          <p className="text-white/50 text-sm font-mono">
            CAOJAMBO
          </p>
        </div>
      </div>
    </footer>
  );
};
