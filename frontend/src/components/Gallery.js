import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Gallery = () => {
  const { language, t } = useLanguage();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API}/gallery`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Fallback images
        setImages([
          {
            id: '1',
            title_es: 'Cacao Fino de Aroma',
            title_en: 'Fine Aroma Cacao',
            description_es: 'Granos de cacao seleccionados de la Amazonía Peruana',
            description_en: 'Selected cacao beans from the Peruvian Amazon',
            image_url: 'https://images.unsplash.com/photo-1699575947488-30f08e71896b?w=800',
            category: 'cacao',
          },
          {
            id: '2',
            title_es: 'Bosque Amazónico',
            title_en: 'Amazon Forest',
            description_es: 'Nuestro entorno natural de producción',
            description_en: 'Our natural production environment',
            image_url: 'https://images.unsplash.com/photo-1699575678956-aefa714b67f0?w=800',
            category: 'nature',
          },
          {
            id: '3',
            title_es: 'Proceso de Fermentación',
            title_en: 'Fermentation Process',
            description_es: 'Control de calidad en cada etapa',
            description_en: 'Quality control at every stage',
            image_url: 'https://images.pexels.com/photos/6420910/pexels-photo-6420910.jpeg?w=800',
            category: 'process',
          },
          {
            id: '4',
            title_es: 'Majambo Fresco',
            title_en: 'Fresh Majambo',
            description_es: 'Fruta exótica del Amazonas',
            description_en: 'Exotic fruit from the Amazon',
            image_url: 'https://images.pexels.com/photos/14436424/pexels-photo-14436424.jpeg?w=800',
            category: 'product',
          },
          {
            id: '5',
            title_es: 'Sostenibilidad',
            title_en: 'Sustainability',
            description_es: 'Prácticas responsables con el medio ambiente',
            description_en: 'Environmentally responsible practices',
            image_url: 'https://images.pexels.com/photos/7450070/pexels-photo-7450070.jpeg?w=800',
            category: 'sustainability',
          },
          {
            id: '6',
            title_es: 'Granos Seleccionados',
            title_en: 'Selected Beans',
            description_es: 'Calidad premium para mercados gourmet',
            description_en: 'Premium quality for gourmet markets',
            image_url: 'https://images.pexels.com/photos/33662910/pexels-photo-33662910.jpeg?w=800',
            category: 'product',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }
    setSelectedImage(images[newIndex]);
  };

  const getTitle = (image) => language === 'es' ? image.title_es : image.title_en;
  const getDescription = (image) => language === 'es' ? image.description_es : image.description_en;

  return (
    <section 
      id="gallery" 
      data-testid="gallery-section"
      className="py-24 md:py-32 bg-[#FDFBF7]"
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
            data-testid="gallery-title"
          >
            {t('gallery.title')}
          </h2>
          <p className="text-[#5C5C5C] max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-[#E5E0D8] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group cursor-pointer overflow-hidden ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
                onClick={() => openLightbox(image)}
                data-testid={`gallery-image-${image.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#E5E0D8]">
                  <img
                    src={image.image_url}
                    alt={getTitle(image)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#1A3C34]/0 group-hover:bg-[#1A3C34]/70 transition-all duration-300 flex items-end p-6">
                  <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-serif text-xl font-semibold text-white mb-1">
                      {getTitle(image)}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {getDescription(image)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            data-testid="gallery-lightbox"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              data-testid="lightbox-close"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
              data-testid="lightbox-prev"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
              data-testid="lightbox-next"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image_url}
                alt={getTitle(selectedImage)}
                className="w-full h-full object-contain"
              />
              <div className="text-center mt-4">
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                  {getTitle(selectedImage)}
                </h3>
                <p className="text-white/70">
                  {getDescription(selectedImage)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
