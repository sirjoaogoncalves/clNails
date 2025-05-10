import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Image as ImageIcon, Filter, X } from 'lucide-react';

// Import images and video
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


const galleryItems = [
  { id: 1,  src: image1,  title: 'Baby Boomer (Cor 1 E 3) Formato Amendoado',  category: 'Baby Boomer' },
  { id: 2,  src: image2,  title: 'Baby Boomer (Cor 1 E 3) Formato Bicudo',  category: 'Baby Boomer' },
  { id: 3,  src: image3,  title: 'Baby Boomer (Cor 1 E 3) Formato Quadrado, Com Os Cantos Arredondados',  category: 'Baby Boomer' },
  { id: 4,  src: image4,  title: 'Baby Boomer Vários Tons (51, 58, 57. 50 E 56) Formato Bailarina',  category: 'Baby Boomer' },
  { id: 5,  src: image5,  title: 'Cor 10 Formato Bicudo',  category: 'Cor' },
  { id: 6,  src: image6,  title: 'Cor 14 Formato Quadrado',  category: 'Cor' },
  { id: 7,  src: image7,  title: 'Cor 14 Verniz De Gel',  category: 'Verniz de Gel' },
  { id: 8,  src: image8,  title: 'Cor 18 Formato Bicudo',  category: 'Cor' },
  { id: 9,  src: image9,  title: 'Cor 19 Formato Amendoado',  category: 'Cor' },
  { id: 10, src: image10, title: 'Cor 1 Com Desenhos Formato Quadrado',  category: 'Cor' },
  { id: 11, src: image11, title: 'Cor 1 Com Pó De Sereia Nos Anelares Formato Bicudo',  category: 'Cor' },
  { id: 12, src: image12, title: 'Cor 1 Formato Amendoado',  category: 'Cor' },
  { id: 13, src: image13, title: 'Cor 1 Verniz De Gel',  category: 'Cor' },
  { id: 14, src: image14, title: 'Cor 20 Formato Bicudo',  category: 'Cor' },
  { id: 15, src: image15, title: 'Cor 21 Verniz De Gel',  category: 'Cor' },
  { id: 16, src: image16, title: 'Cor 23 + 12 Dedo Do Meio E Anelar Com Nail Art Formato Bicudo',  category: 'Nail Art' },
  { id: 17, src: image17, title: 'Cor 24 + Cor 35 Nos Anelares Formato Quadrado',  category: 'Cor' },
  { id: 18, src: image18, title: 'Cor 24 Formato Bailarina',  category: 'Cor' },
  { id: 19, src: image19, title: 'Cor 25 Formato Amendoado',  category: 'Cor' },
  { id: 20, src: image20, title: 'Cor 27 Formato Amendoado',  category: 'Cor' },
  { id: 21, src: image21, title: 'Cor 3 Formato Amendoado E Formato Quadrado (Duas Mãos Diferentes)',  category: 'Cor' },
  { id: 22, src: image22, title: 'Cor 3 Formato Amendoado',  category: 'Cor' },
  { id: 23, src: image23, title: 'Cor 3 Pedicure Verniz De Gel',  category: 'Pedicure' },
  { id: 24, src: image24, title: 'Cor 48 + 12 Com Desenhos No Dedo Do Meio E No Anelar Formato Bicudo',  category: 'Nail Art' },
  { id: 25, src: image25, title: 'Cor 4 Formato Quadrado',  category: 'Cor' },
  { id: 26, src: image26, title: 'Cor 51 Formato Amendoado',  category: 'Cor' },
  { id: 27, src: image27, title: 'Cor 54 Formato Amendoado',  category: 'Cor' },
  { id: 28, src: image28, title: 'Cor 58 Formato Amendoado',  category: 'Cor' },
  { id: 29, src: image29, title: 'Cor 7 Formato Amendoado',  category: 'Cor' },
  { id: 30, src: image30, title: 'Cor Natural Do Gel Com Flores Anelar E Indicador Formato Amendoado',  category: 'Nail Art' },
  { id: 31, src: image31, title: 'Mix Nudes (4, 5, 7, 8 E 10) Formato Bailarina',  category: 'Nude' },
  { id: 32, src: image32, title: 'Unha Francesa Cor 2 E 4 Formato Bailarina',  category: 'Francesa' },
  { id: 33,  src: video1,  title: 'Verniz Térmico (Cor 59) Formato Amendoado',  category: 'Verniz Térmico', type: 'video' },
];

const categories = ['Todos', ...new Set(galleryItems.map(item => item.category))];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.5
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  }
};

// Modal component for viewing larger images/videos
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
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-lg bg-white"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 bg-white/80 text-gray-800 rounded-full p-2 hover:bg-white transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="relative">
          {item?.type === 'video' ? (
            <video src={item?.src} controls className="w-full h-auto max-h-[80vh] object-contain" />
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

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

  useEffect(() => {
    // Set up smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const filteredItems = activeCategory === 'Todos'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-gradient-to-b from-primary-50 to-white py-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-100 -z-10 transform translate-x-1/3 -translate-y-1/3 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-100 -z-10 transform -translate-x-1/3 translate-y-1/3 opacity-50"></div>
      <div className="absolute top-1/3 left-10 w-20 h-20 rounded-full bg-primary-200 -z-10 opacity-30"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-primary-200 -z-10 opacity-20"></div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 relative inline-block">
            A Nossa Galeria
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
            Explore a nossa coleção de designs de unhas artísticos e deixe-se inspirar para a sua próxima visita.
          </p>
        </motion.div>

        {/* Filtro de Categorias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mb-12"
        >
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="text-primary" />
              <h2 className="text-lg font-medium">Filtrar por categoria</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grelha da Galeria */}
        <motion.div
          ref={galleryRef}
          variants={staggerContainer}
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                whileHover="hover"
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => openModal(item)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-white h-full">
                  <CardContent className="p-0 relative group">
                    <div className="aspect-square overflow-hidden">
                      {item.type === 'video' ? (
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-medium text-white text-lg">{item.title}</h3>
                          <p className="text-white/80 text-sm">{item.category}</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 p-3 m-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <ImageIcon size={16} className="text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-lg shadow mt-8"
          >
            <p className="text-gray-500 mb-4">Nenhum design encontrado nesta categoria.</p>
            <button
              onClick={() => setActiveCategory('Todos')}
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              Ver todos os designs
            </button>
          </motion.div>
        )}
      </div>

      <GalleryModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default GalleryPage;


