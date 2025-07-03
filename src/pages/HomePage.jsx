import React, { useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import GallerySpotlight from '../components/sections/GallerySpotlight';
import ColorPaletteTeaser from '../components/sections/ColorPaletteTeaser';
import CtaSection from '../components/sections/CtaSection';
import { motion } from 'framer-motion';

// Animation variants for smooth section transitions
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const HomePage = () => {
  useEffect(() => {
    // Add smooth scrolling to HTML
    document.documentElement.style.scrollBehavior = 'smooth';

    // Clean up when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection />
      </motion.div>

      {/* Gallery Spotlight Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <GallerySpotlight />
      </motion.div>

      {/* Color Palette Teaser Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <ColorPaletteTeaser />
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <CtaSection />
      </motion.div>
    </div>
  );
};

export default HomePage;
