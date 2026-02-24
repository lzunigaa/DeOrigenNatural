import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    // Navigation
    nav: {
      about: 'Quiénes Somos',
      processes: 'Procesos',
      values: 'Valores',
      varieties: 'Variedades',
      services: 'Servicios',
      sustainability: 'Sostenibilidad',
      gallery: 'Galería',
      contact: 'Contacto',
    },
    // Hero
    hero: {
      title: 'Cacao Fino de Aroma & Majambo',
      subtitle: 'de la Amazonía Peruana',
      description: 'Orígenes seleccionados para mercados gourmet internacionales. Calidad, trazabilidad y sostenibilidad en cada grano.',
      cta: 'Solicitar Presupuesto',
      scroll: 'Descubre más',
    },
    // About
    about: {
      title: 'Quiénes Somos',
      brand: 'CAOJAMBO',
      description: 'Somos De Origen Natural Company, una empresa peruana dedicada a la exportación de cacao fino de aroma y Majambo de la Amazonía Peruana. Nuestra marca CAOJAMBO representa nuestra pasión por valorar el fruto completo, desde sus raíces ancestrales hasta los mercados más exigentes del mundo.',
      mission: 'Misión',
      missionText: 'Ser el puente que conecta la biodiversidad de la Amazonía Peruana con el mercado internacional, promoviendo el desarrollo sostenible de nuestras comunidades aliadas.',
      vision: 'Visión',
      visionText: 'Convertirnos en el socio estratégico de referencia para los tesoros naturales amazónicos, reconocidos por nuestra integridad, calidad y compromiso con la sostenibilidad.',
    },
    // Processes
    processes: {
      title: 'Nuestros Procesos',
      subtitle: 'Tres pilares fundamentales garantizan la excelencia de nuestros productos',
      produce: {
        title: 'Producir',
        number: '01',
        description: 'Trabajamos directamente con comunidades locales, aplicando técnicas ancestrales combinadas con estándares modernos de calidad.',
      },
      transport: {
        title: 'Transportar',
        number: '02',
        description: 'Cadena de frío y logística especializada que preserva las características únicas de cada lote desde el origen.',
      },
      distribute: {
        title: 'Distribuir',
        number: '03',
        description: 'Red de distribución global con trazabilidad completa, garantizando la llegada en condiciones óptimas.',
      },
    },
    // Essence & Values
    values: {
      title: 'Nuestra Esencia & Valores',
      subtitle: 'Nos especializamos en el origen, no en el volumen',
      essence: 'Cada grano cuenta una historia. Nos enfocamos en microlotes de variedades finas, donde la calidad supera la cantidad.',
      integrity: {
        title: 'Integridad',
        description: 'Transparencia total en cada transacción. Precios justos para productores y clientes.',
      },
      traceability: {
        title: 'Trazabilidad',
        description: 'Documentación completa desde la parcela hasta el destino final. Cada lote tiene su historia.',
      },
      sustainability: {
        title: 'Sostenibilidad',
        description: 'Prácticas que protegen el medio ambiente y fortalecen las comunidades locales.',
      },
    },
    // Varieties
    varieties: {
      title: 'Nuestras Variedades',
      subtitle: 'Productos premium de la Amazonía Peruana',
      majambo: {
        title: 'Majambo',
        description: 'Fruta exótica amazónica con propiedades nutricionales excepcionales.',
      },
      cacao: {
        title: 'Cacao Fino de Aroma',
        description: 'Granos seleccionados con perfiles de sabor únicos reconocidos internacionalmente.',
      },
      derivatives: {
        title: 'Derivados',
        description: 'Productos procesados manteniendo la esencia y calidad del origen.',
      },
      practices: 'Prácticas Sostenibles',
      nutrition: 'Beneficios Nutricionales',
      flavors: 'Sabores Únicos',
    },
    // Services
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones integrales para su negocio',
      beans: {
        title: 'Venta de Granos',
        description: 'Cacao fino de aroma y Majambo en granos, con certificación de origen y calidad premium.',
      },
      development: {
        title: 'Desarrollo de Productos',
        description: 'Colaboramos en la creación de productos personalizados según sus especificaciones.',
      },
      export: {
        title: 'Servicio de Exportación',
        description: 'Gestión integral de logística de exportación, documentación y cumplimiento normativo.',
      },
    },
    // Sustainability
    sustainability: {
      title: 'Sostenibilidad',
      subtitle: 'Nuestro compromiso con el planeta y las comunidades',
      circular: {
        title: 'Economía Circular',
        description: 'Aprovechamiento integral del fruto, minimizando residuos.',
      },
      zero: {
        title: 'Cero Residuos',
        description: 'Procesos diseñados para eliminar desperdicios en cada etapa.',
      },
      biodiversity: {
        title: 'Biodiversidad',
        description: 'Protección activa de ecosistemas amazónicos y especies nativas.',
      },
      human: {
        title: 'Capital Humano',
        description: 'Respeto y desarrollo de las comunidades productoras.',
      },
    },
    // Gallery
    gallery: {
      title: 'Galería',
      subtitle: 'Descubre nuestro mundo',
    },
    // Contact
    contact: {
      title: 'Contacto',
      subtitle: 'Estamos listos para atenderte',
      name: 'Nombre',
      company: 'Empresa',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      service: 'Servicio de Interés',
      message: 'Mensaje',
      submit: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: 'Mensaje enviado correctamente',
      error: 'Error al enviar el mensaje',
      selectService: 'Seleccione un servicio',
      serviceOptions: {
        beans: 'Venta de Granos',
        development: 'Desarrollo de Productos',
        export: 'Servicio de Exportación',
        other: 'Otro',
      },
    },
    // Footer
    footer: {
      tagline: 'Cacao Fino de Aroma & Majambo de la Amazonía Peruana',
      rights: 'Todos los derechos reservados',
      address: 'Dirección',
      addressValue: 'Amazonía Peruana',
      phone: 'Teléfono',
      phoneValue: '+51 XXX XXX XXX',
      email: 'Email',
      emailValue: 'info@deorigennnatural.com',
    },
  },
  en: {
    // Navigation
    nav: {
      about: 'About Us',
      processes: 'Processes',
      values: 'Values',
      varieties: 'Varieties',
      services: 'Services',
      sustainability: 'Sustainability',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    // Hero
    hero: {
      title: 'Fine Aroma Cacao & Majambo',
      subtitle: 'from the Peruvian Amazon',
      description: 'Selected origins for international gourmet markets. Quality, traceability and sustainability in every bean.',
      cta: 'Request Quote',
      scroll: 'Discover more',
    },
    // About
    about: {
      title: 'About Us',
      brand: 'CAOJAMBO',
      description: 'We are De Origen Natural Company, a Peruvian company dedicated to exporting fine aroma cacao and Majambo from the Peruvian Amazon. Our brand CAOJAMBO represents our passion for valuing the complete fruit, from its ancestral roots to the most demanding markets in the world.',
      mission: 'Mission',
      missionText: 'To be the bridge that connects the biodiversity of the Peruvian Amazon with the international market, promoting sustainable development of our allied communities.',
      vision: 'Vision',
      visionText: 'To become the strategic partner of reference for Amazonian natural treasures, recognized for our integrity, quality and commitment to sustainability.',
    },
    // Processes
    processes: {
      title: 'Our Processes',
      subtitle: 'Three fundamental pillars guarantee the excellence of our products',
      produce: {
        title: 'Produce',
        number: '01',
        description: 'We work directly with local communities, applying ancestral techniques combined with modern quality standards.',
      },
      transport: {
        title: 'Transport',
        number: '02',
        description: 'Cold chain and specialized logistics that preserve the unique characteristics of each batch from origin.',
      },
      distribute: {
        title: 'Distribute',
        number: '03',
        description: 'Global distribution network with complete traceability, ensuring arrival in optimal conditions.',
      },
    },
    // Essence & Values
    values: {
      title: 'Our Essence & Values',
      subtitle: 'We specialize in origin, not volume',
      essence: 'Every bean tells a story. We focus on microlots of fine varieties, where quality exceeds quantity.',
      integrity: {
        title: 'Integrity',
        description: 'Total transparency in every transaction. Fair prices for producers and clients.',
      },
      traceability: {
        title: 'Traceability',
        description: 'Complete documentation from plot to final destination. Every batch has its story.',
      },
      sustainability: {
        title: 'Sustainability',
        description: 'Practices that protect the environment and strengthen local communities.',
      },
    },
    // Varieties
    varieties: {
      title: 'Our Varieties',
      subtitle: 'Premium products from the Peruvian Amazon',
      majambo: {
        title: 'Majambo',
        description: 'Exotic Amazonian fruit with exceptional nutritional properties.',
      },
      cacao: {
        title: 'Fine Aroma Cacao',
        description: 'Selected beans with unique flavor profiles recognized internationally.',
      },
      derivatives: {
        title: 'Derivatives',
        description: 'Processed products maintaining the essence and quality of origin.',
      },
      practices: 'Sustainable Practices',
      nutrition: 'Nutritional Benefits',
      flavors: 'Unique Flavors',
    },
    // Services
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive solutions for your business',
      beans: {
        title: 'Bean Sales',
        description: 'Fine aroma cacao and Majambo beans, with origin certification and premium quality.',
      },
      development: {
        title: 'Product Development',
        description: 'We collaborate in creating customized products according to your specifications.',
      },
      export: {
        title: 'Export Service',
        description: 'Comprehensive export logistics management, documentation and regulatory compliance.',
      },
    },
    // Sustainability
    sustainability: {
      title: 'Sustainability',
      subtitle: 'Our commitment to the planet and communities',
      circular: {
        title: 'Circular Economy',
        description: 'Comprehensive use of the fruit, minimizing waste.',
      },
      zero: {
        title: 'Zero Waste',
        description: 'Processes designed to eliminate waste at every stage.',
      },
      biodiversity: {
        title: 'Biodiversity',
        description: 'Active protection of Amazonian ecosystems and native species.',
      },
      human: {
        title: 'Human Capital',
        description: 'Respect and development of producer communities.',
      },
    },
    // Gallery
    gallery: {
      title: 'Gallery',
      subtitle: 'Discover our world',
    },
    // Contact
    contact: {
      title: 'Contact',
      subtitle: 'We are ready to assist you',
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      service: 'Service of Interest',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully',
      error: 'Error sending message',
      selectService: 'Select a service',
      serviceOptions: {
        beans: 'Bean Sales',
        development: 'Product Development',
        export: 'Export Service',
        other: 'Other',
      },
    },
    // Footer
    footer: {
      tagline: 'Fine Aroma Cacao & Majambo from the Peruvian Amazon',
      rights: 'All rights reserved',
      address: 'Address',
      addressValue: 'Peruvian Amazon',
      phone: 'Phone',
      phoneValue: '+51 XXX XXX XXX',
      email: 'Email',
      emailValue: 'info@deorigennnatural.com',
    },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'es';
    }
    return 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
