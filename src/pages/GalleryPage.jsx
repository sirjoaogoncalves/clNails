import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Image as ImageIcon, Sparkles, X, Play, ChevronDown } from 'lucide-react';

import image1 from '../assets/images/gallery/Baby Boomer (cor 1 e 3)_formato amendoado.png';
import image2 from '../assets/images/gallery/Baby Boomer (cor 1 e 3) - formato bicudo.png';
import image3 from '../assets/images/gallery/Baby Boomer (cor 1 e 3) - formato quadrado, com os cantos arredondados.png';
import image4 from '../assets/images/gallery/Baby Boomer vários tons (51, 58, 57. 50 e 56)_formato bailarina.png';
import image5 from '../assets/images/gallery/Cor 10_formato bicudo.png';
import image6 from '../assets/images/gallery/Cor 14 formato quadrado.png';
import image7 from '../assets/images/gallery/Cor 14_Verniz de Gel.png';
import image8 from '../assets/images/gallery/Cor 18_formato bicudo.png';
import image9 from '../assets/images/gallery/Cor 19 - formato amendoado.png';
import image10 from '../assets/images/gallery/Cor 1 com desenhos_formato quadrado.png';
import image11 from '../assets/images/gallery/Cor 1 com pó de sereia nos anelares_formato bicudo.png';
import image12 from '../assets/images/gallery/Cor 1_formato amendoado.png';
import image13 from '../assets/images/gallery/Cor 1_verniz de gel.png';
import image14 from '../assets/images/gallery/Cor 20 - formato bicudo.png';
import image15 from '../assets/images/gallery/Cor 21_verniz de gel.png';
import image16 from '../assets/images/gallery/Cor 23 + 12 dedo do meio e anelar com nail art_formato bicudo.jpeg';
import image17 from '../assets/images/gallery/Cor 24 + cor 35 nos anelares_formato quadrado.png';
import image18 from '../assets/images/gallery/Cor 24_formato bailarina.jpeg';
import image19 from '../assets/images/gallery/Cor 25_formato amendoado.png';
import image20 from '../assets/images/gallery/Cor 27 formato amendoado.png';
import image21 from '../assets/images/gallery/Cor 3 formato amendoado e formato quadrado (duas mãos diferentes).png';
import image22 from '../assets/images/gallery/Cor 3_formato amendoado.png';
import image23 from '../assets/images/gallery/Cor 3_pedicure_verniz de gel.jpeg';
import image24 from '../assets/images/gallery/Cor 48 + 12 com desenhos no dedo do meio e no anelar_formato bicudo.jpeg';
import image25 from '../assets/images/gallery/Cor 4_formato quadrado.png';
import image26 from '../assets/images/gallery/Cor 51 formato amendoado.png';
import image27 from '../assets/images/gallery/Cor 54_formato amendoado.png';
import image28 from '../assets/images/gallery/Cor 58 formato amendoado.png';
import image29 from '../assets/images/gallery/Cor 7_formato amendoado.png';
import image30 from '../assets/images/gallery/Cor natural do gel com flores anelar e indicador_formato amendoado.png';
import image31 from '../assets/images/gallery/Mix nudes (4, 5, 7, 8 e 10)_formato bailarina.png';
import image32 from '../assets/images/gallery/Unha Francesa_cor 2 e 4_formato bailarina.png';
import video1 from '../assets/images/gallery/Verniz térmico (cor 59)_formato amendoado.mp4';
import image33 from '../assets/images/gallery/Fomato_amendoado_francesa_cor_1_mais_cor_40.jpeg';
import image34 from '../assets/images/gallery/Formato amendoado_cor_57.jpeg';
import image35 from '../assets/images/gallery/Formato bicudo_unha_francesa_cor_42_mais_cor_2.jpeg';
import image36 from '../assets/images/gallery/Formato_amendoado_cor_22.jpeg';
import image37 from '../assets/images/gallery/formato_amendoado_cor_3.jpeg';
import image38 from '../assets/images/gallery/formato_bailarina_cor_53_mais_cor_1_francesa_indicador_desenho_livre_anelar.jpeg';
import image39 from '../assets/images/gallery/formato_bicudo_cor_24.jpeg';
import image40 from '../assets/images/gallery/formato_bicudo_cor_58_francesa_anelar.png';
import video2 from '../assets/images/gallery/formato_quadrado_com_pontas_arredondadas_cor_3.mp4';
import image41 from '../assets/images/gallery/Formato_quadrado_cor_21_francesa_anelar.jpeg';
import image42 from '../assets/images/gallery/Formato_quadrado_cor_29.jpeg';
import image43 from '../assets/images/gallery/Pés_verniz_de_gel_cor_32.jpeg';
import image44 from '../assets/images/gallery/reconstrução_polygel_cor_7.jpeg';
import image45 from '../assets/images/gallery/verniz_de_gel_cor_10.jpeg';
import image46 from '../assets/images/gallery/Verniz_de_gel_formato_quadrado_cor_45_flor_anelar.jpeg';
import image47 from '../assets/images/gallery/verniz_de_gel_francesa_cor_45.jpeg';
import image48 from '../assets/images/gallery/Verniz_de_gel_unha_francesa_cor_2_mais_cor_3_formato_quadrado.jpeg';
import image49 from '../assets/images/gallery/Verniz_de_gel_unha_francesa_cor_2_mais_cor_3_pés.jpeg';

const galleryItems = [
  { id: 1,  src: image1,  title: 'Baby boomer (cor 1 e 3) formato amendoado',  category: 'Baby Boomer' },
  { id: 2,  src: image2,  title: 'Baby boomer (cor 1 e 3) formato bicudo',  category: 'Baby Boomer' },
  { id: 3,  src: image3,  title: 'Baby boomer (cor 1 e 3) formato quadrado, com os cantos arredondados',  category: 'Baby Boomer' },
  { id: 4,  src: image4,  title: 'Baby boomer vários tons (51, 58, 57. 50 e 56) formato bailarina',  category: 'Baby Boomer' },
  { id: 5,  src: image5,  title: 'Cor 10 formato bicudo',  category: 'Cor' },
  { id: 6,  src: image6,  title: 'Cor 14 formato quadrado',  category: 'Cor' },
  { id: 7,  src: image7,  title: 'Cor 14 verniz de gel',  category: 'Verniz de Gel' },
  { id: 8,  src: image8,  title: 'Cor 18 formato bicudo',  category: 'Cor' },
  { id: 9,  src: image9,  title: 'Cor 19 formato amendoado',  category: 'Cor' },
  { id: 10, src: image10, title: 'Cor 1 com desenhos formato quadrado',  category: 'Cor' },
  { id: 11, src: image11, title: 'Cor 1 com pó de sereia nos anelares formato bicudo',  category: 'Cor' },
  { id: 12, src: image12, title: 'Cor 1 formato amendoado',  category: 'Cor' },
  { id: 13, src: image13, title: 'Cor 1 verniz de gel',  category: 'Verniz de Gel' },
  { id: 14, src: image14, title: 'Cor 20 formato bicudo',  category: 'Cor' },
  { id: 15, src: image15, title: 'Cor 21 verniz de gel',  category: 'Verniz de Gel' },
  { id: 16, src: image16, title: 'Cor 23 + 12 dedo do meio e anelar com nail art formato bicudo',  category: 'Nail Art' },
  { id: 17, src: image17, title: 'Cor 24 + cor 35 nos anelares formato quadrado',  category: 'Cor' },
  { id: 18, src: image18, title: 'Cor 24 formato bailarina',  category: 'Cor' },
  { id: 19, src: image19, title: 'Cor 25 formato amendoado',  category: 'Cor' },
  { id: 20, src: image20, title: 'Cor 27 formato amendoado',  category: 'Cor' },
  { id: 21, src: image21, title: 'Cor 3 formato amendoado e formato quadrado (duas mãos diferentes)',  category: 'Cor' },
  { id: 22, src: image22, title: 'Cor 3 formato amendoado',  category: 'Cor' },
  { id: 23, src: image23, title: 'Cor 3 pedicure verniz de gel',  category: 'Pedicure' },
  { id: 24, src: image24, title: 'Cor 48 + 12 com desenhos no dedo do meio e no anelar formato bicudo',  category: 'Nail Art' },
  { id: 25, src: image25, title: 'Cor 4 formato quadrado',  category: 'Cor' },
  { id: 26, src: image26, title: 'Cor 51 formato amendoado',  category: 'Cor' },
  { id: 27, src: image27, title: 'Cor 54 formato amendoado',  category: 'Cor' },
  { id: 28, src: image28, title: 'Cor 58 formato amendoado',  category: 'Cor' },
  { id: 29, src: image29, title: 'Cor 7 formato amendoado',  category: 'Cor' },
  { id: 30, src: image30, title: 'Cor natural do gel com flores anelar e indicador formato amendoado',  category: 'Nail Art' },
  { id: 31, src: image31, title: 'Mix nudes (4, 5, 7, 8 e 10) formato bailarina',  category: 'Nude' },
  { id: 32, src: image32, title: 'Unha francesa cor 2 e 4 formato bailarina',  category: 'Francesa' },
  { id: 33,  src: video1,  title: 'Verniz térmico (cor 59) formato amendoado',  category: 'Verniz Térmico', type: 'video' },
  { id: 34, src: image33, title: 'Formato amendoado francesa cor 1 e cor 40', category: 'Francesa' },
  { id: 35, src: image34, title: 'Formato amendoado cor 57', category: 'Cor' },
  { id: 36, src: image35, title: 'Formato bicudo unha francesa cor 42 e cor 2', category: 'Francesa' },
  { id: 37, src: image36, title: 'Formato amendoado cor 22', category: 'Cor' },
  { id: 38, src: image37, title: 'Formato amendoado cor 3', category: 'Nude' },
  { id: 39, src: image38, title: 'Formato bailarina cor 53 e cor 1 francesa indicador desenho livre anelar', category: 'Nail Art' },
  { id: 40, src: image39, title: 'Formato bicudo cor 24', category: 'Cor' },
  { id: 41, src: image40, title: 'Formato bicudo cor 58 francesa anelar', category: 'Nail Art' },
  { id: 42, src: video2, title: 'Formato quadrado com pontas arredondadas cor 3', category: 'Nude', type: 'video' },
  { id: 43, src: image41, title: 'Formato quadrado cor 21 francesa anelar', category: 'Nail Art' },
  { id: 44, src: image42, title: 'Formato quadrado cor 29', category: 'Cor' },
  { id: 45, src: image43, title: 'Pés verniz de gel cor 32', category: 'Pedicure' },
  { id: 46, src: image44, title: 'Reconstrução polygel cor 7', category: 'Polygel' },
  { id: 47, src: image45, title: 'Verniz de gel cor 10', category: 'Pedicure' },
  { id: 48, src: image46, title: 'Verniz de gel formato quadrado cor 45 flor anelar', category: 'Verniz de Gel' },
  { id: 49, src: image47, title: 'Verniz de gel francesa cor 45', category: 'Pedicure' },
  { id: 50, src: image48, title: 'Verniz de gel unha francesa cor 2 e cor 3 formato quadrado', category: 'Francesa' },
  { id: 51, src: image49, title: 'Verniz de gel unha francesa cor 2 e cor 3', category: 'Pedicure' },
];

const categories = [...new Set(galleryItems.map(item => item.category))];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: { duration: 0.3 }
  }
};

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const GalleryModal = ({ item, isOpen, onClose }) => {
  useEffect(() => {
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
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full p-3 hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="relative">
          {item?.type === 'video' ? (
            <video
              src={item?.src}
              controls
              autoPlay
              className="w-full h-auto max-h-[70vh] object-contain bg-black rounded-t-3xl"
            />
          ) : (
            <img
              src={item?.src}
              alt={item?.title}
              className="w-full h-auto max-h-[70vh] object-contain rounded-t-3xl"
            />
          )}
        </div>

        <div className="p-6 bg-gradient-to-br from-primary-50 to-white">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item?.title}</h3>
          <div className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            <Sparkles className="w-3 h-3 mr-1" />
            {item?.category}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const filteredItems = activeCategory
    ? galleryItems.filter(item => item.category === activeCategory)
    : [];

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-gradient-to-b from-primary-50 via-white to-primary-50 py-8 md:py-16 overflow-hidden min-h-screen">

      <div className="absolute top-0 right-0 w-64 h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 -z-10 transform translate-x-1/3 -translate-y-1/3 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-primary-200 to-primary-300 -z-10 transform -translate-x-1/3 translate-y-1/3 opacity-40"></div>
      <div className="absolute top-1/3 left-4 md:left-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-200 -z-10 opacity-30"></div>
      <div className="absolute bottom-1/4 right-4 md:right-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-200 -z-10 opacity-20"></div>

      <div className="container mx-auto px-4 py-6 md:py-12">

        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900 relative inline-block">
            A nossa galeria
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 px-4">
            Explora a nossa coleção de designs de unhas e deixa-te inspirar para a tua próxima visita.
          </p>
        </motion.div>

        {/* Mobile-First Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          {/* Mobile Dropdown - Primary on small screens */}
          <div className="lg:hidden">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-primary-100 mx-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-full">
                  <Sparkles className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Escolhe uma categoria</h2>
              </div>

              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-full h-14 border-2 border-primary-200 rounded-2xl bg-gradient-to-r from-primary-50 to-white hover:from-primary-100 hover:to-primary-50 transition-all duration-200 text-lg font-medium shadow-lg">
                  <SelectValue placeholder="Toca para ver os nossos trabalhos..." />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-white border-2 border-primary-200 shadow-2xl rounded-2xl">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="py-4 px-6 hover:bg-primary-50 focus:bg-primary-100 cursor-pointer text-base font-medium border-b border-primary-100 last:border-0 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{category}</span>
                        <span className="bg-primary-200 text-primary-800 px-2 py-1 rounded-full text-xs font-bold">
                          {galleryItems.filter(item => item.category === category).length}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!activeCategory && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-600 mt-4 font-medium"
                >
                  ✨ Seleciona uma categoria para descobrir a nossa arte
                </motion.p>
              )}
            </div>
          </div>


          <div className="hidden lg:block">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-primary-100 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-full">
                  <Sparkles className="text-white h-4 w-4" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Filtrar por categoria</h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary-200'
                        : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-700 border border-primary-200'
                    }`}
                  >
                    {category}
                    <span className="ml-2 bg-white/20 text-xs px-2 py-1 rounded-full">
                      {galleryItems.filter(item => item.category === category).length}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Display */}
        {activeCategory ? (
          <div className="space-y-6">
            {/* Category Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full shadow-xl"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="font-semibold text-lg">
                  {filteredItems.length} design{filteredItems.length !== 1 ? 's' : ''} em {activeCategory}
                </span>
              </motion.div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openModal(item)}
                  className="cursor-pointer group"
                >
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white h-full relative rounded-2xl">
                    <CardContent className="p-0 relative">
                      <div className="aspect-square overflow-hidden">
                        {item.type === 'video' ? (
                          <div className="relative w-full h-full">
                            <video
                              src={item.src}
                              className="w-full h-full object-cover"
                              muted
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/95 backdrop-blur-sm rounded-full p-4">
                                <Play className="w-8 h-8 text-primary-600" fill="currentColor" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}

                        {/* Elegant overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                          <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 mb-2">
                            {item.title}
                          </h3>
                          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-1 rounded-full text-xs font-medium w-fit">
                            {item.category}
                          </div>
                        </div>

                        {/* Floating view icon */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg">
                            <ImageIcon size={16} className="text-primary-600" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Welcome State - Mobile First */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-8 md:py-8"
          >
            <div className="max-w-md mx-auto px-4">
              <motion.div
                className="bg-gradient-to-br from-primary-200 to-primary-300 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              >
                <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary-700" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Descobre a nossa arte
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Escolhe uma categoria acima para explorar os nossos designs únicos e inspira-te para a tua próxima visita.
              </p>
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl"
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        <GalleryModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
