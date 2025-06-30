import React, { useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CtaSection from '../components/sections/CtaSection';
import { motion } from 'framer-motion';

// Configuração para scroll suave para toda a página
const HomePage = () => {
  useEffect(() => {
    // Adicionar scroll suave ao HTML
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Limpar ao desmontar o componente
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
          
      </motion.div>
      

      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <CtaSection />
      </motion.div>
    </div>
  );
};

export default HomePage;
