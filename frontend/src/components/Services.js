import { motion } from 'framer-motion';
import { Grains, Flask, Airplane } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      key: 'beans',
      icon: Grains,
      number: '01',
    },
    {
      key: 'development',
      icon: Flask,
      number: '02',
    },
    {
      key: 'export',
      icon: Airplane,
      number: '03',
    },
  ];

  return (
    <section 
      id="services" 
      data-testid="services-section"
      className="py-24 md:py-32 bg-[#FDFBF7] relative noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A3C34] mb-4"
            data-testid="services-title"
          >
            {t('services.title')}
          </h2>
          <p className="text-[#5C5C5C] max-w-2xl">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-1">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
                data-testid={`service-${service.key}`}
              >
                <div className="border-b border-[#E5E0D8] py-8 flex items-start gap-6 hover:bg-[#E5E0D8]/30 transition-colors px-4 -mx-4">
                  {/* Number */}
                  <span className="font-mono text-sm text-[#C06E52] pt-2">
                    {service.number}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#1A3C34] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C06E52] transition-colors">
                    <Icon size={28} weight="thin" className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A3C34] mb-2 group-hover:text-[#C06E52] transition-colors">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="text-[#5C5C5C] leading-relaxed max-w-2xl">
                      {t(`services.${service.key}.description`)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 border border-[#E5E0D8] group-hover:border-[#1A3C34] group-hover:bg-[#1A3C34] transition-all">
                    <svg 
                      className="w-5 h-5 text-[#1A3C34] group-hover:text-white transform group-hover:translate-x-1 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
