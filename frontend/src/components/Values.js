import { motion } from 'framer-motion';
import { Handshake, Path, Leaf } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export const Values = () => {
  const { t } = useLanguage();

  const values = [
    {
      key: 'integrity',
      icon: Handshake,
    },
    {
      key: 'traceability',
      icon: Path,
    },
    {
      key: 'sustainability',
      icon: Leaf,
    },
  ];

  return (
    <section 
      id="values" 
      data-testid="values-section"
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
            data-testid="values-title"
          >
            {t('values.title')}
          </h2>
          <p className="text-[#5C5C5C] text-lg mb-8 max-w-2xl">
            {t('values.subtitle')}
          </p>

          {/* Essence Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-l-4 border-[#C06E52] pl-6 py-2"
          >
            <p className="text-xl font-serif italic text-[#1A3C34]">
              "{t('values.essence')}"
            </p>
          </motion.div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white border border-[#E5E0D8] p-8 hover:border-[#1A3C34] transition-all group cursor-default"
                data-testid={`value-${value.key}`}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-[#1A3C34] flex items-center justify-center mb-6 group-hover:bg-[#C06E52] transition-colors">
                  <Icon size={32} weight="thin" className="text-white" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-semibold text-[#1A3C34] mb-4">
                  {t(`values.${value.key}.title`)}
                </h3>
                <p className="text-[#5C5C5C] leading-relaxed">
                  {t(`values.${value.key}.description`)}
                </p>

                {/* Hover accent */}
                <div className="h-1 w-0 bg-[#C06E52] mt-6 group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
