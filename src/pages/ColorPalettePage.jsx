import React, { useState, useEffect, useRef } from "react";
import { Card } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Palette, Sparkles, X, ChevronDown, Search, Flame } from "lucide-react";

const colorData = {
  "Nudes & Neutros": [
    { id: 1, number: 2, name: "branco", hex: "#FFFFFF" },
    { id: 2, number: 1, name: "branco leitoso", hex: "#F5F5F5" },
    { id: 6, number: 4, name: "bege claro", hex: "#F5F0DC" },
    { id: 12, number: 5, name: "bege creme", hex: "#F3E5AB" },
    { id: 18, number: 6, name: "nude rosa", hex: "#E8B8B1" },
    { id: 21, number: 9, name: "nude pêssego", hex: "#F6B380" },
    { id: 24, number: 12, name: "cinza pérola", hex: "#CCB4A7" },
    { id: 33, number: 10, name: "rosa terra", hex: "#D68568" },
    { id: 35, number: 41, name: "nude caramelo", hex: "#C8856A" },
    { id: 38, number: 13, name: "nude acinzentado", hex: "#B6866A" },
    { id: 30, number: 49, name: "nude rosa acizentado", hex: "#C8AD7F" },
    { id: 43, number: 11, name: "nude chocolate", hex: "#925419" },
  ],
  "Rosas & Corais": [
    { id: 3, number: 54, name: "rosa pastel", hex: "#ffeef2" },
    { id: 11, number: 3, name: "rosa leitoso", hex: "#FFDBEB" },
    { id: 13, number: 57, name: "lilás pastel", hex: "#FFD1DC" },
    { id: 14, number: 42, name: "rosa quartzo efeito areado", hex: "#F7CAC9" },
    { id: 19, number: 7, name: "rosa claro", hex: "#FFA9B8" },
    { id: 26, number: 8, name: "nude rosa quente", hex: "#E6A39A" },
    { id: 28, number: 50, name: "salmão pastel", hex: "#FF9295" },
    { id: 45, number: 46, name: "rosa choque", hex: "#Ff0031" },
  ],
  "Vermelhos": [
    { id: 39, number: 37, name: "vermelho brilhante", hex: "#FF3030" },
    { id: 42, number: 45, name: "vermelho néon", hex: "#FF1f1f" },
    { id: 46, number: 20, name: "vermelho coral", hex: "#FF0000" },
    { id: 49, number: 21, name: "vermelho rubi", hex: "#F00000" },
    { id: 50, number: 19, name: "vermelho ferrari", hex: "#EF0000" },
    { id: 52, number: 18, name: "vermelho cereja", hex: "#DD0000" },
    { id: 55, number: 17, name: "vermelho", hex: "#CE0000" },
    { id: 51, number: 22, name: "vermelho rosé", hex: "#981B2F" },
    { id: 56, number: 47, name: "vermelho bordeaux", hex: "#9B111E" },
    { id: 57, number: 16, name: "vermelho terra", hex: "#7C1010" },
  ],
  "Azuis & Turquesa": [
    { id: 7, number: 26, name: "azul transparente", hex: "#e0f2f6" },
    { id: 8, number: 58, name: "azul pastel", hex: "#cdf7f5" },
    { id: 29, number: 27, name: "azul bebé", hex: "#a4aed9" },
    { id: 34, number: 29, name: "azul", hex: "#1dc5ef" },
    { id: 31, number: 28, name: "azul turquesa", hex: "#40E0D0" },
    { id: 36, number: 30, name: "azul turquesa oceano", hex: "#18d39e" },
    { id: 60, number: 40, name: "azul marinho", hex: "#00001f" },
  ],
  "Verdes & Lima": [
    { id: 15, number: 56, name: "verde água pastel", hex: "#acf1ac" },
    { id: 16, number: 55, name: "verde pastel", hex: "#cedf74" },
    { id: 23, number: 32, name: "verde lima", hex: "#75ff36" },
    { id: 25, number: 31, name: "verde", hex: "#53ff53" },
    { id: 44, number: 38, name: "verde brilhante", hex: "#008040" },
    { id: 48, number: 43, name: "verde floresta", hex: "#0f6b3d" },
    { id: 47, number: 48, name: "verde tropa", hex: "#4B5320" },
  ],
  "Roxos & Lilás": [
    { id: 20, number: 23, name: "lavanda", hex: "#eaa7ea" },
    { id: 27, number: 24, name: "lilás suave", hex: "#dd96dd" },
    { id: 41, number: 25, name: "cinza rato", hex: "#686070" },
    { id: 54, number: 44, name: "roxo metalizado", hex: "#612e39" },
  ],
  "Amarelos & Laranja": [
    { id: 4, number: 51, name: "amarelo pastel", hex: "#FDFD96" },
    { id: 5, number: 53, name: "amarelo", hex: "#fdfd8e" },
    { id: 9, number: 33, name: "amarelo limão", hex: "#FFFF45" },
    { id: 17, number: 52, name: "amarelo alaranjado", hex: "#FFbc62" },
  ],
  "Metálicos & Brilhantes": [
    { id: 10, number: 35, name: "gliter prateado", hex: "#E6E8FA" },
    { id: 22, number: 34, name: "prateado brilhante", hex: "#C0C0C0" },
    { id: 32, number: 36, name: "dourado brilhante", hex: "#D4AF37" },
  ],
  "Castanhos & Escuros": [
    { id: 58, number: 14, name: "castanho chocolate", hex: "#4A2511" },
    { id: 59, number: 15, name: "castanho cremoso", hex: "#451510" },
    { id: 61, number: 39, name: "preto", hex: "#000000" },
  ],
  "Vernizes Térmicos": [
    {
      id: 40,
      number: 59,
      name: "bordeaux → rosa nude",
      hex: "#800020",
      quente: "#e59084",
      description: "bordeaux (frio) + rosa nude (quente)"
    },
    {
      id: 37,
      number: 61,
      name: "roxo → bege",
      hex: "#631446",
      quente: "#ffeef2",
      description: "roxo (frio) + bege (quente)"
    },
    {
      id: 53,
      number: 60,
      name: "roxo vivo → roxo claro",
      hex: "#550055",
      quente: "#ff008a",
      description: "roxo vivo (frio) + roxo claro (quente)"
    },
  ]
};

const categories = Object.keys(colorData);

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

// Color Modal Component
const ColorModal = ({ color, isOpen, onClose }) => {
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

  const isThermal = color?.quente !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full p-3 hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Color Preview */}
        <div className="h-64 relative">
          {isThermal ? (
            <div className="h-full flex">
              <div
                className="flex-1 flex items-center justify-center relative"
                style={{ backgroundColor: color.hex }}
              >
                <div className="text-white font-bold text-sm bg-black/30 px-3 py-1 rounded-full">
                  Frio
                </div>
              </div>
              <div
                className="flex-1 flex items-center justify-center relative"
                style={{ backgroundColor: color.quente }}
              >
                <div className="text-gray-800 font-bold text-sm bg-white/70 px-3 py-1 rounded-full">
                  Quente
                </div>
              </div>
            </div>
          ) : (
            <div
              className="h-full w-full"
              style={{ backgroundColor: color?.hex }}
            ></div>
          )}

          {isThermal && (
            <div className="absolute top-4 left-4">
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                <Flame className="w-4 h-4 mr-1" />
                Térmico
              </div>
            </div>
          )}
        </div>

        {/* Color Info */}
        <div className="p-6 bg-gradient-to-br from-primary-50 to-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{color?.name}</h3>
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-lg font-bold mb-4">
              Nº {color?.number}
            </div>

            {isThermal && (
              <p className="text-gray-600 text-sm mb-4">{color?.description}</p>
            )}

            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="bg-white p-3 rounded-xl border border-primary-100">
                <span className="font-medium text-gray-600">Cor Principal:</span>
                <span className="ml-2 font-mono font-bold">{color?.hex}</span>
              </div>

              {isThermal && (
                <div className="bg-white p-3 rounded-xl border border-primary-100">
                  <span className="font-medium text-gray-600">Cor Quente:</span>
                  <span className="ml-2 font-mono font-bold">{color?.quente}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ColorPalettePage = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const headerRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const filteredColors = activeCategory
    ? colorData[activeCategory].filter(color =>
        color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.number.toString().includes(searchTerm)
      )
    : [];

  const openModal = (color) => {
    setSelectedColor(color);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedColor(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-gradient-to-b from-primary-50 via-white to-primary-50 py-8 md:py-16 overflow-hidden min-h-screen">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 -z-10 transform translate-x-1/3 -translate-y-1/3 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-primary-200 to-primary-300 -z-10 transform -translate-x-1/3 translate-y-1/3 opacity-40"></div>
      <div className="absolute top-1/3 left-4 md:left-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-200 -z-10 opacity-30"></div>
      <div className="absolute bottom-1/4 right-4 md:right-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-200 -z-10 opacity-20"></div>

      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900 relative inline-block">
            Nossa paleta de cores
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 px-4">
            Descobre a nossa vasta gama de cores de verniz.
          </p>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-primary-100 mx-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-full">
                  <Palette className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Escolhe uma família de cores</h2>
              </div>

              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-full h-14 border-2 border-primary-200 rounded-2xl bg-gradient-to-r from-primary-50 to-white hover:from-primary-100 hover:to-primary-50 transition-all duration-200 text-lg font-medium shadow-lg">
                  <SelectValue placeholder="Toca para escolher uma família de cores..." />
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
                          {colorData[category].length}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop Pills */}
          <div className="hidden lg:block">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-primary-100 max-w-6xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-full">
                  <Palette className="text-white h-4 w-4" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Escolhe uma família de cores</h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary-200'
                        : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-700 border border-primary-200'
                    }`}
                  >
                    {category}
                    <span className="ml-2 bg-white/20 text-xs px-2 py-1 rounded-full">
                      {colorData[category].length}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar (when category is selected) */}
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Pesquisar por nome ou número..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-primary-200 rounded-2xl bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
              />
            </div>
          </motion.div>
        )}

        {/* Colors Display */}
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
                <Palette className="w-4 h-4 mr-2" />
                <span className="font-semibold text-lg">
                  {filteredColors.length} cor{filteredColors.length !== 1 ? 'es' : ''} em {activeCategory}
                </span>
              </motion.div>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredColors.map((color, index) => {
                const isThermal = color.quente !== undefined;
                const gradientId = `thermal-gradient-${color.id}`;

                // Helper function to adjust colors for variations
                function adjustColor(hex, percent) {
                  let r = parseInt(hex.slice(1, 3), 16);
                  let g = parseInt(hex.slice(3, 5), 16);
                  let b = parseInt(hex.slice(5, 7), 16);

                  r = Math.max(0, Math.min(255, r + Math.floor((r * percent) / 100)));
                  g = Math.max(0, Math.min(255, g + Math.floor((g * percent) / 100)));
                  b = Math.max(0, Math.min(255, b + Math.floor((b * percent) / 100)));

                  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
                }

                const darkerColor = adjustColor(color.hex, -20);
                const lighterColor = adjustColor(color.hex, 15);
                const quenteColor = isThermal ? (color.quente.startsWith("#") ? color.quente : `#${color.quente}`) : "";

                return (
                  <div
                    key={color.id}
                    onClick={() => openModal(color)}
                    className="cursor-pointer group"
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white relative rounded-2xl">
                      <div className="aspect-square p-3">
                        {/* Nail Polish SVG */}
                        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <svg
                            height="100%"
                            width="100%"
                            viewBox="0 0 483.2 483.2"
                            className="max-h-28 md:max-h-32 drop-shadow-md"
                          >
                            <defs>
                              {isThermal && (
                                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor={color.hex} />
                                  <stop offset="50%" stopColor={color.hex} />
                                  <stop offset="50%" stopColor={quenteColor} />
                                  <stop offset="100%" stopColor={quenteColor} />
                                </linearGradient>
                              )}
                            </defs>

                            {/* Hand/Finger */}
                            <path
                              style={{ fill: "#F7C3A9" }}
                              d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-42.4-426.4-95.2-426.4s-95.2,190.4-95.2,426.4 c0,12.8,0,27.2,0,35.2H336.8z"
                            />
                            <path
                              style={{ fill: "#E09370" }}
                              d="M336.8,481.6c0-8,0-22.4,0-35.2c0-236-56.8-426.4-94.4-426.4s-68,190.4-68,426.4 c0,12.8,0,27.2,0,35.2H336.8z"
                            />
                            <path
                              style={{ fill: "#EFAC86" }}
                              d="M240.8,20.8c-40,9.6-69.6,192.8-65.6,425.6c0,12.8,0,27.2,0,35.2h67.2L240.8,20.8z"
                            />
                            <path
                              style={{ fill: "#CC7954" }}
                              d="M336.8,483.2c0-11.2,0-23.2,0-36c0-236-42.4-427.2-95.2-427.2"
                            />

                            {/* Nail Polish - Main Color */}
                            <path
                              style={{ fill: isThermal ? `url(#${gradientId})` : color.hex }}
                              d="M296.8,144c0,80-24.8,69.6-54.4,69.6c-30.4,0-54.4,9.6-54.4-69.6S212.8,0,242.4,0 C272.8,0,296.8,64,296.8,144z"
                            />

                            {/* Nail Polish - Shadow (only for non-thermal) */}
                            {!isThermal && (
                              <path
                                style={{ fill: darkerColor }}
                                d="M242.4,0c30.4,0,54.4,64.8,54.4,144s-24.8,69.6-54.4,69.6"
                              />
                            )}

                            {/* Nail Polish - Highlight (only for non-thermal) */}
                            {!isThermal && (
                              <path
                                style={{ fill: lighterColor }}
                                d="M205.6,65.6c-4.8,24-4,44,1.6,45.6c6.4,1.6,15.2-16,20.8-40c4.8-24,4-44-1.6-45.6 C220,23.2,211.2,41.6,205.6,65.6z"
                              />
                            )}
                          </svg>
                        </div>

                        {/* Thermal indicator */}
                        {isThermal && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-orange-500 text-white p-1 rounded-full">
                              <Flame className="w-3 h-3" />
                            </div>
                          </div>
                        )}

                        <div className="mt-3 text-center">
                          <h3 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1">
                            {color.name}
                          </h3>
                          <div className="inline-flex items-center bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-bold">
                            Nº {color.number}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Welcome State */
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
                <Palette className="w-10 h-10 md:w-12 md:h-12 text-primary-700" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Descobre a nossa paleta
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Escolhe uma família de cores acima para explorar todas as nossas opções e encontrar a cor perfeita para ti.
              </p>
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl"
                >
                  🎨
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        <ColorModal
          color={selectedColor}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </AnimatePresence>
    </div>
  );
};

export default ColorPalettePage;
