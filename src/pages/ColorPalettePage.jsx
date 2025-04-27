import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/card';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Palette, Sparkles, Info } from 'lucide-react';

// Dados das cores
const colorData = [
  {
    id: 1,
    name: 'Vermelho Clássico',
    hex: '#E63946',
  },
  {
    id: 2,
    name: 'Rosa Bebé',
    hex: '#FFC4D6',
  },
  {
    id: 3,
    name: 'Nude',
    hex: '#E6BEAE',
  },
  {
    id: 4,
    name: 'Borgonha',
    hex: '#800020',
  },
  {
    id: 5,
    name: 'Branco Pérola',
    hex: '#F5F5F5',
  },
  {
    id: 6,
    name: 'Preto',
    hex: '#1A1A1A',
  },
  {
    id: 7,
    name: 'Azul Marinho',
    hex: '#003366',
  },
  {
    id: 8,
    name: 'Coral',
    hex: '#FF7F50',
  },
  {
    id: 9,
    name: 'Roxo',
    hex: '#800080',
  },
  {
    id: 10,
    name: 'Verde Esmeralda',
    hex: '#2E8B57',
  },
  {
    id: 11,
    name: 'Dourado',
    hex: '#D4AF37',
  },
  {
    id: 12,
    name: 'Prata',
    hex: '#C0C0C0',
  },
  {
    id: 13,
    name: 'Turquesa',
    hex: '#40E0D0',
  },
  {
    id: 14,
    name: 'Lavanda',
    hex: '#B57EDC',
  },
  {
    id: 15,
    name: 'Vinho',
    hex: '#722F37',
  },
  {
    id: 16,
    name: 'Cinza',
    hex: '#808080',
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerGrid = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemFade = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 15, duration: 0.4 }
  }
};

// Hand mockup component
// Nail bottle SVG that changes color based on hover
const HandNailsPreview = ({ color }) => {
  // Generate darker and lighter variations of the base color
  const darkerColor = adjustColor(color, -20);
  const lighterColor = adjustColor(color, 15);
  
  // Helper function to adjust colors
  function adjustColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, r + Math.floor(r * percent / 100)));
    g = Math.max(0, Math.min(255, g + Math.floor(g * percent / 100)));
    b = Math.max(0, Math.min(255, b + Math.floor(b * percent / 100)));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  return (
    <div className="flex justify-center py-2">
      <svg height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 483.2 483.2" xmlSpace="preserve" fill="#000000" className="drop-shadow-md">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path style={{fill: "#F7C3A9"}} d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-42.4-426.4-95.2-426.4s-95.2,190.4-95.2,426.4 c0,12.8,0,27.2,0,35.2H336.8z"></path>
          <path style={{fill: "#E09370"}} d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-56.8-426.4-94.4-426.4s-68,190.4-68,426.4 c0,12.8,0,27.2,0,35.2H336.8z"></path>
          <path style={{fill: "#EFAC86"}} d="M240.8,20.8c-40,9.6-69.6,192.8-65.6,425.6c0,12.8,0,27.2,0,35.2h67.2L240.8,20.8z"></path>
          <path style={{fill: "#CC7954"}} d="M336.8,483.2c0-11.2,0-23.2,0-36c0-236-42.4-427.2-95.2-427.2"></path>
          <path style={{fill: color}} d="M296.8,144c0,80-24.8,69.6-54.4,69.6c-30.4,0-54.4,9.6-54.4-69.6S212.8,0,242.4,0 C272.8,0,296.8,64,296.8,144z"></path>
          <path style={{fill: darkerColor}} d="M242.4,0c30.4,0,54.4,64.8,54.4,144s-24.8,69.6-54.4,69.6"></path>
          <path style={{fill: lighterColor}} d="M205.6,65.6c-4.8,24-4,44,1.6,45.6c6.4,1.6,15.2-16,20.8-40c4.8-24,4-44-1.6-45.6 C220,23.2,211.2,41.6,205.6,65.6z"></path>
        </g>
      </svg>
    </div>
  );
};

// Mobile version of the same SVG (smaller)
const MobileNailPreview = ({ color }) => {
  // Generate darker and lighter variations of the base color
  const darkerColor = adjustColor(color, -20);
  const lighterColor = adjustColor(color, 15);
  
  // Helper function to adjust colors
  function adjustColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, r + Math.floor(r * percent / 100)));
    g = Math.max(0, Math.min(255, g + Math.floor(g * percent / 100)));
    b = Math.max(0, Math.min(255, b + Math.floor(b * percent / 100)));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  return (
    <div className="flex justify-center py-2 sm:hidden">
      <svg height="120px" width="120px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 483.2 483.2" xmlSpace="preserve" fill="#000000" className="drop-shadow-md">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path style={{fill: "#F7C3A9"}} d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-42.4-426.4-95.2-426.4s-95.2,190.4-95.2,426.4 c0,12.8,0,27.2,0,35.2H336.8z"></path>
          <path style={{fill: "#E09370"}} d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-56.8-426.4-94.4-426.4s-68,190.4-68,426.4 c0,12.8,0,27.2,0,35.2H336.8z"></path>
          <path style={{fill: "#EFAC86"}} d="M240.8,20.8c-40,9.6-69.6,192.8-65.6,425.6c0,12.8,0,27.2,0,35.2h67.2L240.8,20.8z"></path>
          <path style={{fill: "#CC7954"}} d="M336.8,483.2c0-11.2,0-23.2,0-36c0-236-42.4-427.2-95.2-427.2"></path>
          <path style={{fill: color}} d="M296.8,144c0,80-24.8,69.6-54.4,69.6c-30.4,0-54.4,9.6-54.4-69.6S212.8,0,242.4,0 C272.8,0,296.8,64,296.8,144z"></path>
          <path style={{fill: darkerColor}} d="M242.4,0c30.4,0,54.4,64.8,54.4,144s-24.8,69.6-54.4,69.6"></path>
          <path style={{fill: lighterColor}} d="M205.6,65.6c-4.8,24-4,44,1.6,45.6c6.4,1.6,15.2-16,20.8-40c4.8-24,4-44-1.6-45.6 C220,23.2,211.2,41.6,205.6,65.6z"></path>
        </g>
      </svg>
    </div>
  );
};

// Componente de cor com popup e mockup de mão
const ColorSwatch = ({ color, index }) => {
  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <motion.div 
      className="relative"
      variants={itemFade}
      custom={index}
      whileHover={{ 
        scale: 1.05,
        zIndex: 20, 
        transition: { duration: 0.2 } 
      }}
    >
      <Card 
        className="cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300 h-24 sm:h-20 overflow-hidden rounded-xl"
        style={{ backgroundColor: color.hex }}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        onClick={() => setShowPopup(!showPopup)}
      >
        <div className="absolute inset-0 flex items-end p-2">
          <div className="w-full bg-white/90 py-1 px-2 rounded-md text-xs font-medium text-center truncate">
            {color.name}
          </div>
        </div>
        
        <div className="absolute top-2 right-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/80">
            <Sparkles size={12} className="text-gray-700" />
          </div>
        </div>
      </Card>

      {/* Popup with dynamic hand mockup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-72 bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100">
              {/* Desktop Hand Mockup (hidden on mobile) */}
              <div className="hidden sm:block">
                <HandNailsPreview color={color.hex} />
              </div>
              
              {/* Mobile-friendly nail preview (visible only on mobile) */}
              <MobileNailPreview color={color.hex} />
              
              <div className="text-center mt-2">
                <h3 className="font-bold text-lg">{color.name}</h3>
                <div className="inline-block mt-1 font-mono text-sm bg-gray-100 px-2 py-1 rounded-md mb-2">
                  {color.hex}
                </div>
              </div>
              
              {/* Pointer arrow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-md"></div>
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-700">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.hex }}></div>
                  <span>Pré-visualização</span>
                </div>
                <span className="text-primary-600 font-medium">Acabamento Brilhante</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ColorPalettePage = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const infoRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.3 });
  
  // Set up smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-primary-50 to-white py-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-100 -z-10 transform translate-x-1/3 -translate-y-1/3 opacity-60"></div>
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
          <div className="inline-flex items-center justify-center mb-4">
            <Palette className="text-primary h-8 w-8 mr-2" />
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 relative inline-block">
              Nossa Paleta de Cores
              <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
            Explore a nossa vasta gama de cores de verniz. Passe o cursor sobre uma cor para ver como fica nas unhas.
          </p>
        </motion.div>

        {/* Grelha de Cores */}
        <motion.div 
          ref={gridRef}
          variants={staggerGrid}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="bg-white p-8 rounded-2xl shadow-md mb-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
            {colorData.map((color, index) => (
              <ColorSwatch key={color.id} color={color} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          ref={infoRef}
          initial="hidden"
          animate={infoInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white p-8 rounded-2xl shadow-md border border-primary-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 -z-10 rounded-full opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
            
            <div className="flex items-start mb-4">
              <div className="bg-primary-100 p-2 rounded-full mr-4">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Sobre as Nossas Cores</h2>
                <p className="text-gray-700 leading-relaxed">
                  Se tem uma cor específica em mente que não vê aqui, contacte-nos. Podemos criar tons personalizados para atender às suas necessidades.
                </p>
              </div>
            </div> 
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ColorPalettePage;
