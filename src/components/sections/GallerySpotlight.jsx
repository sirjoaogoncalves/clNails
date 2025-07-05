import React, { useState, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, X, Play, Image as ImageIcon } from 'lucide-react';

// Import selected images and video from gallery
import image1 from '../../assets/images/gallery/Cor 20 - formato bicudo.png';
import image16 from '../../assets/images/gallery/Cor 58 formato amendoado.png';
import image26 from '../../assets/images/gallery/Unha Francesa_cor 2 e 4_formato bailarina.png';
import image30 from '../../assets/images/gallery/verniz_de_gel_francesa_cor_45.jpeg';
import image32 from '../../assets/images/gallery/Mix nudes (4, 5, 7, 8 e 10)_formato bailarina.png';
import image99 from '../../assets/images/gallery/Formato_quadrado_cor_21_francesa_anelar.jpeg';

// Curated selection of 6 items (5 images + 1 video)
const spotlightItems = [
  {
    id: 1,
    src: image1,
    title: 'Cor 20 formato bicudo',
    category: 'Cor',
    type: 'image'
  },
  {
    id: 16,
    src: image16,
    title: 'Cor 58 formato amendoado',
    category: 'Cor',
    type: 'image'
  },
  {
    id: 26,
    src: image26,
    title: 'Unha francesa cor 2 e 4 formato bailarina',
    category: 'Francesa',
    type: 'image'
  },
  {
    id: 30,
    src: image30,
    title: 'Verniz de gel francesa cor 45',
    category: 'Pedicure',
    type: 'image'
  },
  {
    id: 32,
    src: image32,
    title: 'Mix nudes (4, 5, 7, 8 e 10) formato bailarina',
    category: 'Nude',
    type: 'image'
  },
  {
    id: 33,
    src: image99,
    title: 'Formato quadrado cor 21 francesa anelar',
    category: 'Nail Art',
    type: 'image'
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(196, 144, 143, 0.15), 0 10px 10px -5px rgba(196, 144, 143, 0.1)",
    transition: { duration: 0.3 }
  }
};

// Modal component for viewing larger images/videos
const GalleryModal = ({ item, isOpen, onClose }) => {
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 bg-white/90 text-gray-800 rounded-full p-2 hover:bg-white transition-colors shadow-md"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="relative">
          {item?.type === 'video' ? (
            <video
              src={item?.src}
              controls
              className="w-full h-auto max-h-[80vh] object-contain"
              autoPlay
            />
          ) : (
            <img
              src={item?.src}
              alt={item?.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="text-white text-xl font-bold">{item?.title}</h3>
            <p className="text-white/80">{item?.category}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GallerySpotlight = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-100/50 -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-200/30 -z-10 transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
            As nossas últimas criações
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-6">
            Descobre algumas das nossas obras mais recentes. Cada unha conta uma história única com personalidade e elegância.
          </p>
        </motion.div>

        {/* Gallery Grid - Uniform Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          {spotlightItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => openModal(item)}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-white h-full group">
                <CardContent className="p-0 relative">
                  <div className="relative overflow-hidden aspect-square">
                    {item.type === 'video' ? (
                      <>
                        <video
                          src={item.src}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          muted
                          loop
                        />
                        {/* Video play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 rounded-full p-3">
                            <Play className="h-6 w-6 text-primary-600" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-white text-sm md:text-base mb-1">
                          {item.title}
                        </h3>
                        <p className="text-white/80 text-xs md:text-sm">{item.category}</p>
                      </div>
                    </div>

                    {/* Icon indicator */}
                    <div className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {item.type === 'video' ? (
                        <Play size={14} className="text-primary-600" />
                      ) : (
                        <ImageIcon size={14} className="text-primary-600" />
                      )}
                    </div>

                    {/* Category badge */}
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link to="/gallery">
            <Button className="group bg-primary hover:bg-primary-700 text-white px-8 py-4 h-auto text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="mr-2">Ver galeria completa</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        <GalleryModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </AnimatePresence>
    </section>
  );
};

export default GallerySpotlight;
