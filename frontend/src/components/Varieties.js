import { motion } from 'framer-motion';
import { Leaf, Heart, Coffee } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export const Varieties = () => {
  const { t } = useLanguage();

  const varieties = [
    {
      key: 'majambo',
      image: 'https://images.pexels.com/photos/14436424/pexels-photo-14436424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      badge: t('varieties.practices'),
      badgeIcon: Leaf,
    },
    {
      key: 'cacao',
      image: 'https://images.pexels.com/photos/7450070/pexels-photo-7450070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      badge: t('varieties.flavors'),
      badgeIcon: Coffee,
    },
    {
      key: 'derivatives',
      image: 'https://images.pexels.com/photos/33662910/pexels-photo-33662910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      badge: t('varieties.nutrition'),
      badgeIcon: Heart,
    },
  ];

  return (
    <section 
      id="varieties" 
      data-testid="varieties-section"
      className="py-24 md:py-32 bg-[#E5E0D8]/30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            data-testid="varieties-title"
          >
            {t('varieties.title')}
          </h2>
          <p className="text-[#5C5C5C] max-w-2xl mx-auto">
            {t('varieties.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {varieties.map((variety, index) => {
            const BadgeIcon = variety.badgeIcon;
            return (
              <motion.div
                key={variety.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative group overflow-hidden ${
                  index === 0 ? 'md:row-span-2' : ''
                }`}
                data-testid={`variety-${variety.key}`}
              >
                <div className={`relative ${index === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'} overflow-hidden bg-[#E5E0D8]`}>
                  <img
                    src={variety.image}
                    alt={t(`varieties.${variety.key}.title`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3C34]/90 via-[#1A3C34]/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 bg-white/90 text-[#1A3C34] text-xs font-mono uppercase tracking-wider">
                    <BadgeIcon size={14} weight="bold" />
                    {variety.badge}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                      {t(`varieties.${variety.key}.title`)}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {t(`varieties.${variety.key}.description`)}
                    </p>
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
