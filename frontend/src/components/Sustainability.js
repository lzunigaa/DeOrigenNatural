import { motion } from 'framer-motion';
import { Recycle, TrashSimple, TreeEvergreen, Users } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export const Sustainability = () => {
  const { t } = useLanguage();

  const initiatives = [
    {
      key: 'circular',
      icon: Recycle,
    },
    {
      key: 'zero',
      icon: TrashSimple,
    },
    {
      key: 'biodiversity',
      icon: TreeEvergreen,
    },
    {
      key: 'human',
      icon: Users,
    },
  ];

  return (
    <section 
      id="sustainability" 
      data-testid="sustainability-section"
      className="py-24 md:py-32 bg-[#E2E8E4] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A3C34' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A3C34] mb-4"
            data-testid="sustainability-title"
          >
            {t('sustainability.title')}
          </h2>
          <p className="text-[#1A3C34]/70 max-w-2xl mx-auto">
            {t('sustainability.subtitle')}
          </p>
        </motion.div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <motion.div
                key={initiative.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 text-center group hover:shadow-xl transition-all"
                data-testid={`sustainability-${initiative.key}`}
              >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto bg-[#1A3C34] flex items-center justify-center mb-6 group-hover:bg-[#C06E52] transition-colors">
                  <Icon size={40} weight="thin" className="text-white" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-semibold text-[#1A3C34] mb-3">
                  {t(`sustainability.${initiative.key}.title`)}
                </h3>
                <p className="text-[#5C5C5C] text-sm leading-relaxed">
                  {t(`sustainability.${initiative.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#1A3C34] p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {[
              { value: '100%', label: 'Trazabilidad' },
              { value: '+50', label: 'Familias' },
              { value: '0', label: 'Residuos' },
              { value: '+10', label: 'Años' },
            ].map((stat, index) => (
              <div key={index} className="px-4 md:px-8 text-center">
                <span className="block font-serif text-3xl md:text-4xl font-bold text-[#C06E52] mb-2">
                  {stat.value}
                </span>
                <span className="text-white/70 text-sm font-mono uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
