import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success(t('contact.success'));
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-transparent border-b border-[#1A3C34] px-0 py-4 focus:outline-none focus:border-[#C06E52] placeholder:text-[#1A3C34]/50 transition-colors";

  return (
    <section 
      id="contact" 
      data-testid="contact-section"
      className="py-24 md:py-32 bg-[#FDFBF7] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A3C34] mb-4"
              data-testid="contact-title"
            >
              {t('contact.title')}
            </h2>
            <p className="text-[#5C5C5C] mb-12">
              {t('contact.subtitle')}
            </p>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7450070/pexels-photo-7450070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3C34]/60 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#1A3C34] mb-1">
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  data-testid="contact-name-input"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-[#1A3C34] mb-1">
                  {t('contact.company')}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClasses}
                  data-testid="contact-company-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#1A3C34] mb-1">
                  {t('contact.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  data-testid="contact-email-input"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#1A3C34] mb-1">
                  {t('contact.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  data-testid="contact-phone-input"
                />
              </div>

              {/* Service Interest */}
              <div>
                <label className="block text-sm font-medium text-[#1A3C34] mb-1">
                  {t('contact.service')}
                </label>
                <select
                  name="service_interest"
                  value={formData.service_interest}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  data-testid="contact-service-select"
                >
                  <option value="">{t('contact.selectService')}</option>
                  <option value="beans">{t('contact.serviceOptions.beans')}</option>
                  <option value="development">{t('contact.serviceOptions.development')}</option>
                  <option value="export">{t('contact.serviceOptions.export')}</option>
                  <option value="other">{t('contact.serviceOptions.other')}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#1A3C34] mb-1">
                  {t('contact.message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  data-testid="contact-message-input"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A3C34] text-white px-8 py-4 font-medium tracking-wide transition-all hover:bg-[#152F29] shadow-[4px_4px_0px_0px_#C06E52] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="contact-submit-button"
              >
                {loading ? t('contact.sending') : t('contact.submit')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
