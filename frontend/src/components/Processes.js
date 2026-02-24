import { motion } from 'framer-motion';
import { Plant, Truck, Package } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export const Processes = () => {
  const { t } = useLanguage();

  const processes = [
    {
      key: 'produce',
      icon: Plant,
    },
    {
      key: 'transport',
      icon: Truck,
    },
    {
      key: 'distribute',
      icon: Package,
    },
  ];

  return (
    <section 
      id="processes" 
      data-testid="processes-section"
      className="py-24 md:py-32 bg-[#1A3C34] relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/6420910/pexels-photo-6420910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Process Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4"
            data-testid="processes-title"
          >
            {t('processes.title')}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t('processes.subtitle')}
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-[#C06E52]/30 -translate-y-1/2 z-0" />

          {processes.map((process, index) => {
            const Icon = process.icon;
            return (
              <motion.div
                key={process.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex-1 relative z-10"
                data-testid={`process-${process.key}`}
              >
                <div className="bg-[#FDFBF7] p-8 h-full hover:shadow-xl transition-shadow">
                  {/* Number */}
                  <span className="font-mono text-6xl text-[#E5E0D8] font-bold absolute top-4 right-4">
                    {t(`processes.${process.key}.number`)}
                  </span>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-[#1A3C34] flex items-center justify-center mb-6">
                    <Icon size={32} weight="thin" className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl font-semibold text-[#1A3C34] mb-4">
                    {t(`processes.${process.key}.title`)}
                  </h3>
                  <p className="text-[#5C5C5C] leading-relaxed">
                    {t(`processes.${process.key}.description`)}
                  </p>

                  {/* Arrow indicator for desktop */}
                  {index < processes.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#C06E52] rotate-45 z-20" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
