import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/card';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Palette, Sparkles, Info } from 'lucide-react';

// Dados das cores
const colorData = [
  // Whites
  {
    id: 1,
    number: 2,
    name: 'branco',
    hex: '#FFFFFF',
  },
  {
    id: 2,
    number: 1,
    name: 'branco leitoso',
    hex: '#F5F5F5',
  },
  // Very light pastels
  {
    id: 3,
    number: 54,
    name: 'rosa pastel',
    hex: '#ffeef2',
  },
  {
    id: 7,
    number: 26,
    name: 'azul transparente',
    hex: '#e0f2f6',
  },
  {
    id: 10,
    number: 35,
    name: 'gliter prateado',
    hex: '#E6E8FA',
  },
  {
    id: 8,
    number: 58,
    name: 'azul pastel',
    hex: '#cdf7f5',
  },
  {
    id: 11,
    number: 3,
    name: 'rosa leitoso',
    hex: '#FFDBEB',
  },
  {
    id: 13,
    number: 57,
    name: 'lilás pastel',
    hex: '#FFD1DC',
  },
  {
    id: 4,
    number: 51,
    name: 'amarelo pastel',
    hex: '#FDFD96',
  },
  {
    id: 5,
    number: 53,
    name: 'amarelo',
    hex: '#fdfd8e',
  },
  {
    id: 15,
    number: 56,
    name: 'verde água pastel',
    hex: '#acf1ac',
  },
  {
    id: 6,
    number: 4,
    name: 'bege claro',
    hex: '#F5F0DC',
  },
  // Light colors
  {
    id: 14,
    number: 42,
    name: 'rosa quartzo efeito areado',
    hex: '#F7CAC9',
  },
  {
    id: 16,
    number: 55,
    name: 'verde pastel',
    hex: '#cedf74',
  },
  {
    id: 12,
    number: 5,
    name: 'bege creme',
    hex: '#F3E5AB',
  },
  {
    id: 9,
    number: 33,
    name: 'amarelo limão',
    hex: '#FFFF45',
  },
  {
    id: 28,
    number: 50,
    name: 'salmão pastel',
    hex: '#FF9295',
  },
  {
    id: 19,
    number: 7,
    name: 'rosa claro',
    hex: '#FFA9B8',
  },
  {
    id: 18,
    number: 6,
    name: 'nude rosa',
    hex: '#E8B8B1',
  },
  {
    id: 17,
    number: 52,
    name: 'amarelo alaranjado',
    hex: '#FFbc62',
  },
  // Medium colors
  {
    id: 20,
    number: 23,
    name: 'lavanda',
    hex: '#eaa7ea',
  },
  {
    id: 27,
    number: 24,
    name: 'lilás suave',
    hex: '#dd96dd',
  },
  {
    id: 21,
    number: 9,
    name: 'nude pêssego',
    hex: '#F6B380',
  },
  {
    id: 24,
    number: 12,
    name: 'cinza pérola',
    hex: '#CCB4A7',
  },
  {
    id: 26,
    number: 8,
    name: 'nude rosa quente',
    hex: '#E6A39A',
  },
  {
    id: 29,
    number: 27,
    name: 'azul bebé',
    hex: '#a4aed9',
  },
  {
    id: 22,
    number: 34,
    name: 'prateado brilhante',
    hex: '#C0C0C0',
  },
  {
    id: 30,
    number: 49,
    name: 'nude rosa acizentado',
    hex: '#C8AD7F',
  },
  {
    id: 23,
    number: 32,
    name: 'verde lima',
    hex: '#75ff36',
  },
  {
    id: 25,
    number: 31,
    name: 'verde',
    hex: '#53ff53',
  },
  {
    id: 34,
    number: 29,
    name: 'azul',
    hex: '#1dc5ef',
  },
  {
    id: 31,
    number: 28,
    name: 'azul turquesa',
    hex: '#40E0D0',
  },
  {
    id: 36,
    number: 30,
    name: 'azul turquesa oceano',
    hex: '#18d39e',
  },
  {
    id: 33,
    number: 10,
    name: 'rosa terra',
    hex: '#D68568',
  },
  // Medium-dark colors
  {
    id: 35,
    number: 41,
    name: 'nude caramelo',
    hex: '#C8856A',
  },
  {
    id: 38,
    number: 13,
    name: 'nude acinzentado',
    hex: '#B6866A',
  },
  {
    id: 32,
    number: 36,
    name: 'dourado brilhante',
    hex: '#D4AF37',
  },
  {
    id: 41,
    number: 25,
    name: 'cinza rato',
    hex: '#686070',
  },
  // Reds (medium to dark)
  {
    id: 39,
    number: 37,
    name: 'vermelho brilhante',
    hex: '#FF3030',
  },
  {
    id: 42,
    number: 45,
    name: 'vermelho néon',
    hex: '#FF1f1f',
  },
  {
    id: 45,
    number: 46,
    name: 'rosa choque',
    hex: '#Ff0031',
  },
  {
    id: 46,
    number: 20,
    name: 'vermelho coral',
    hex: '#FF0000',
  },
  {
    id: 49,
    number: 21,
    name: 'vermelho rubi',
    hex: '#F00000',
  },
  {
    id: 50,
    number: 19,
    name: 'vermelho ferrari',
    hex: '#EF0000',
  },
  {
    id: 52,
    number: 18,
    name: 'vermelho cereja',
    hex: '#DD0000',
  },
  {
    id: 55,
    number: 17,
    name: 'vermelho',
    hex: '#CE0000',
  },
  {
    id: 51,
    number: 22,
    name: 'vermelho rosé',
    hex: '#981B2F',
  },
  {
    id: 56,
    number: 47,
    name: 'vermelho bordeaux',
    hex: '#9B111E',
  },
  {
    id: 57,
    number: 16,
    name: 'vermelho terra',
    hex: '#7C1010',
  },
  // Dark greens and browns
  {
    id: 44,
    number: 38,
    name: 'verde brilhante',
    hex: '#008040',
  },
  {
    id: 48,
    number: 43,
    name: 'verde floresta',
    hex: '#0f6b3d',
  },
  {
    id: 47,
    number: 48,
    name: 'verde tropa',
    hex: '#4B5320',
  },
  {
    id: 43,
    number: 11,
    name: 'nude chocolate',
    hex: '#925419',
  },
  {
    id: 54,
    number: 44,
    name: 'roxo metalizado',
    hex: '#612e39',
  },
  {
    id: 58,
    number: 14,
    name: 'castanho chocolate',
    hex: '#4A2511',
  },
  {
    id: 59,
    number: 15,
    name: 'castanho cremoso',
    hex: '#451510',
  },
  // Darkest colors
  {
    id: 60,
    number: 40,
    name: 'azul marinho',
    hex: '#00001f',
  },
  {
    id: 61,
    number: 39,
    name: 'preto',
    hex: '#000000',
  },
  // Thermal polishes (special category at the end as they change color)
  {
    id: 40,
    number: 59,
    name: 'verniz térmico - bordeaux (frio) + rosa nude (quente)',
    hex: '#800020',
    quente: '#e59084',
  },
  {
    id: 37,
    number: 61,
    name: 'verniz térmico - roxo (frio) + bege (quente)',
    hex: '#631446',
    quente: '#ffeef2',
  },
  {
    id: 53,
    number: 60,
    name: 'verniz térmico - roxo vivo (frio) + roxo claro (quente)',
    hex: '#550055',
    quente: '#ff008a',
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
const HandNailsPreview = ({ colorData }) => {
  // Check if this is a thermal polish
  const isThermal = colorData.quente !== undefined;
  const gradientId = `thermal-gradient-${colorData.id}`;
  
  // For regular polish, calculate variations
  const darkerColor = adjustColor(colorData.hex, -20);
  const lighterColor = adjustColor(colorData.hex, 15);
  
  // Ensure quente color has # prefix
  const quenteColor = isThermal ? 
    (colorData.quente.startsWith('#') ? colorData.quente : `#${colorData.quente}`) : 
    '';
  
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
        <defs>
          {isThermal && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colorData.hex} />
              <stop offset="50%" stopColor={colorData.hex} />
              <stop offset="50%" stopColor={quenteColor} />
              <stop offset="100%" stopColor={quenteColor} />
            </linearGradient>
          )}
        </defs>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path style={{fill: "#F7C3A9"}} d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-42.4-426.4-95.2-426.4s-95.2,190.4-95.2,426.4 c0,12.8,0,27.2,0,35.2H336.8z"></path>
          <path style={{fill: "#E09370"}} d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-56.8-426.4-94.4-426.4s-68,190.4-68,426.4 c0,12.8,0,27.2,0,35.2H336.8z"></path>
          <path style={{fill: "#EFAC86"}} d="M240.8,20.8c-40,9.6-69.6,192.8-65.6,425.6c0,12.8,0,27.2,0,35.2h67.2L240.8,20.8z"></path>
          <path style={{fill: "#CC7954"}} d="M336.8,483.2c0-11.2,0-23.2,0-36c0-236-42.4-427.2-95.2-427.2"></path>
          <path 
            style={{fill: isThermal ? `url(#${gradientId})` : colorData.hex}} 
            d="M296.8,144c0,80-24.8,69.6-54.4,69.6c-30.4,0-54.4,9.6-54.4-69.6S212.8,0,242.4,0 C272.8,0,296.8,64,296.8,144z"
          ></path>
          <path 
            style={{fill: isThermal ? 'none' : darkerColor}} 
            d="M242.4,0c30.4,0,54.4,64.8,54.4,144s-24.8,69.6-54.4,69.6"
          ></path>
          <path 
            style={{fill: isThermal ? 'none' : lighterColor}} 
            d="M205.6,65.6c-4.8,24-4,44,1.6,45.6c6.4,1.6,15.2-16,20.8-40c4.8-24,4-44-1.6-45.6 C220,23.2,211.2,41.6,205.6,65.6z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

// Mobile version of the same SVG (smaller)
const MobileNailPreview = ({ colorData }) => {
  // Check if this is a thermal polish
  const isThermal = colorData.quente !== undefined;
  const gradientId = `mobile-thermal-gradient-${colorData.id}`;
  
  // For regular polish, calculate variations
  const darkerColor = adjustColor(colorData.hex, -20);
  const lighterColor = adjustColor(colorData.hex, 15);
  
  // Ensure quente color has # prefix
  const quenteColor = isThermal ? 
    (colorData.quente.startsWith('#') ? colorData.quente : `#${colorData.quente}`) : 
    '';
  
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
        <defs>
          {isThermal && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colorData.hex} />
              <stop offset="50%" stopColor={colorData.hex} />
              <stop offset="50%" stopColor={quenteColor} />
              <stop offset="100%" stopColor={quenteColor} />
            </linearGradient>
          )}
        </defs>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path style={{fill: "#F7C3A9"}} d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-42.4-426.4-95.2-426.4s-95.2,190.4-95.2,426.4 c0,12.8,0,27.2,0,35.2H336.8z"></path>
          <path style={{fill: "#E09370"}} d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-56.8-426.4-94.4-426.4s-68,190.4-68,426.4 c0,12.8,0,27.2,0,35.2H336.8z"></path>
          <path style={{fill: "#EFAC86"}} d="M240.8,20.8c-40,9.6-69.6,192.8-65.6,425.6c0,12.8,0,27.2,0,35.2h67.2L240.8,20.8z"></path>
          <path style={{fill: "#CC7954"}} d="M336.8,483.2c0-11.2,0-23.2,0-36c0-236-42.4-427.2-95.2-427.2"></path>
          <path 
            style={{fill: isThermal ? `url(#${gradientId})` : colorData.hex}} 
            d="M296.8,144c0,80-24.8,69.6-54.4,69.6c-30.4,0-54.4,9.6-54.4-69.6S212.8,0,242.4,0 C272.8,0,296.8,64,296.8,144z"
          ></path>
          <path 
            style={{fill: isThermal ? 'none' : darkerColor}} 
            d="M242.4,0c30.4,0,54.4,64.8,54.4,144s-24.8,69.6-54.4,69.6"
          ></path>
          <path 
            style={{fill: isThermal ? 'none' : lighterColor}} 
            d="M205.6,65.6c-4.8,24-4,44,1.6,45.6c6.4,1.6,15.2-16,20.8-40c4.8-24,4-44-1.6-45.6 C220,23.2,211.2,41.6,205.6,65.6z"
          ></path>
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
                <HandNailsPreview colorData={color} />
              </div>
              
              {/* Mobile-friendly nail preview (visible only on mobile) */}
              <MobileNailPreview colorData={color} />
              
              <div className="text-center mt-2">
                <h3 className="font-bold text-lg">{color.name}</h3>
                <div className="inline-block mt-1 font-mono text-sm bg-gray-100 px-2 py-1 rounded-md mb-2">
                  {color.number}
                </div>
                
                {/* Show thermal info if applicable */}
                {color.quente && (
                  <div className="text-xs text-gray-600 mt-1">
                    Verniz térmico com efeito de mudança de cor
                  </div>
                )}
              </div>
              
              {/* Pointer arrow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-md"></div>
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
