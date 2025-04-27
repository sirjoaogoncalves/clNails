import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Image, Filter, X } from 'lucide-react';

// Itens de exemplo para a galeria
const galleryItems = [
  { id: 1, image: '/gallery-1.jpg', title: 'Francesinha com Design', category: 'Francesinha' },
  { id: 2, image: '/gallery-2.jpg', title: 'Design Arte Floral', category: 'Nail Art' },
  { id: 3, image: '/gallery-3.jpg', title: 'Degradê Ombré', category: 'Ombré' },
  { id: 4, image: '/gallery-4.jpg', title: 'Unhas de Acento com Pedras', category: 'Pedras' },
  { id: 5, image: '/gallery-5.jpg', title: 'Arte Minimalista', category: 'Minimalista' },
  { id: 6, image: '/gallery-6.jpg', title: 'Design Sazonal', category: 'Sazonal' },
  { id: 7, image: '/gallery-7.jpg', title: 'Efeito Mármore', category: 'Mármore' },
  { id: 8, image: '/gallery-8.jpg', title: 'Padrões Geométricos', category: 'Geométrico' },
  { id: 9, image: '/gallery-9.jpg', title: 'Acento com Glitter', category: 'Glitter' },
  { id: 10, image: '/gallery-10.jpg', title: 'Acabamento Mate', category: 'Mate' },
  { id: 11, image: '/gallery-11.jpg', title: 'Efeito Cromado', category: 'Cromado' },
  { id: 12, image: '/gallery-12.jpg', title: 'Estampado Animal', category: 'Estampado Animal' },
];

const categories = ['Todos', 'Francesinha', 'Nail Art', 'Ombré', 'Pedras', 'Minimalista', 'Sazonal', 'Mármore', 'Geométrico', 'Glitter', 'Mate', 'Cromado', 'Estampado Animal'];

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

// Modal component for viewing larger images
const ImageModal = ({ item, isOpen, onClose }) => {
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
          <img 
            src={item?.image} 
            alt={item?.title} 
            className="w-full h-auto max-h-[80vh] object-contain"
          />
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
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-medium text-white text-lg">{item.title}</h3>
                          <p className="text-white/80 text-sm">{item.category}</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 p-3 m-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Image size={16} className="text-primary" />
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
      
      <ImageModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default GalleryPage;
