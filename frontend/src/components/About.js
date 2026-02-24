import { motion } from 'framer-motion';
import { Target, Eye } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="about" 
      data-testid="about-section"
      className="py-24 md:py-32 bg-[#FDFBF7] relative noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1699575678956-aefa714b67f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMHBvZHMlMjB0cmVlJTIwYW1hem9uJTIwcmFpbmZvcmVzdCUyMHBlcnV2aWFufGVufDB8fHx8MTc3MTk2MzE1N3ww&ixlib=rb-4.1.0&q=85"
                alt="Amazon Forest"
                className="w-full h-full object-cover"
              />
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#C06E52] -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A3C34] mb-6"
              data-testid="about-title"
            >
              {t('about.title')}
            </h2>

            <div className="inline-flex items-center px-3 py-1 bg-[#4A6C45]/10 text-[#4A6C45] text-xs font-mono uppercase tracking-wider rounded-full border border-[#4A6C45]/20 mb-6">
              {t('about.brand')}
            </div>

            <p className="text-[#5C5C5C] leading-relaxed mb-10">
              {t('about.description')}
            </p>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white border border-[#E5E0D8] p-6 hover:border-[#1A3C34] transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1A3C34] text-white group-hover:bg-[#C06E52] transition-colors">
                    <Target size={24} weight="thin" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#1A3C34] mb-2">
                      {t('about.mission')}
                    </h3>
                    <p className="text-[#5C5C5C] text-sm leading-relaxed">
                      {t('about.missionText')}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white border border-[#E5E0D8] p-6 hover:border-[#1A3C34] transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1A3C34] text-white group-hover:bg-[#C06E52] transition-colors">
                    <Eye size={24} weight="thin" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#1A3C34] mb-2">
                      {t('about.vision')}
                    </h3>
                    <p className="text-[#5C5C5C] text-sm leading-relaxed">
                      {t('about.visionText')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
