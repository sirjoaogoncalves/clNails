import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Palette, ChevronLeft, ChevronRight } from 'lucide-react';

// 5 Trending colors selection
const trendingColors = [
  {
    id: 40,
    number: 59,
    name: "verniz térmico bordeaux",
    hex: "#800020",
    quente: "#e59084",
    category: "Vernizes térmicos"
  },
  {
    id: 39,
    number: 19,
    name: "vermelho ferrari",
    hex: "#EF0000",
    category: "Vermelhos"
  },
  {
    id: 8,
    number: 58,
    name: "azul pastel",
    hex: "#cdf7f5",
    category: "Azuis e turquesa"
  },
  {
    id: 18,
    number: 24,
    name: "lilás suave",
    hex: "#dd96dd",
    category: "Roxos & Lilás"
  },
  {
    id: 23,
    number: 3,
    name: "rosa leitoso",
    hex: "#FFDBEB",
    category: "Rosas & Corais"
  }
];

// Nail SVG Component - Reused from ColorPalettePage
const NailPreview = ({ colorData, size = "large" }) => {
  const isThermal = colorData.quente !== undefined;
  const gradientId = `trending-gradient-${colorData.id}`;

  const darkerColor = adjustColor(colorData.hex, -20);
  const lighterColor = adjustColor(colorData.hex, 15);

  const quenteColor = isThermal
    ? colorData.quente.startsWith("#")
      ? colorData.quente
      : `#${colorData.quente}`
    : "";

  function adjustColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, r + Math.floor((r * percent) / 100)));
    g = Math.max(0, Math.min(255, g + Math.floor((g * percent) / 100)));
    b = Math.max(0, Math.min(255, b + Math.floor((b * percent) / 100)));

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  const svgSize = size === "large" ? "180px" : "120px";

  return (
    <div className="flex justify-center">
      <svg
        height={svgSize}
        width={svgSize}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 483.2 483.2"
        xmlSpace="preserve"
        className="drop-shadow-lg"
      >
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
        <g>
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
          <path
            style={{ fill: isThermal ? `url(#${gradientId})` : colorData.hex }}
            d="M296.8,144c0,80-24.8,69.6-54.4,69.6c-30.4,0-54.4,9.6-54.4-69.6S212.8,0,242.4,0 C272.8,0,296.8,64,296.8,144z"
          />
          <path
            style={{ fill: isThermal ? "none" : darkerColor }}
            d="M242.4,0c30.4,0,54.4,64.8,54.4,144s-24.8,69.6-54.4,69.6"
          />
          <path
            style={{ fill: isThermal ? "none" : lighterColor }}
            d="M205.6,65.6c-4.8,24-4,44,1.6,45.6c6.4,1.6,15.2-16,20.8-40c4.8-24,4-44-1.6-45.6 C220,23.2,211.2,41.6,205.6,65.6z"
          />
        </g>
      </svg>
    </div>
  );
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const slideVariants = {
  enter: { x: 100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 }
};

const ColorPaletteTeaser = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Auto-carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % trendingColors.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const nextColor = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % trendingColors.length);
  };

  const prevColor = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + trendingColors.length) % trendingColors.length);
  };

  const goToColor = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentColor = trendingColors[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden" ref={sectionRef}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-200/40 -z-10 transform -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary-100/50 -z-10 transform translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 right-20 w-20 h-20 rounded-full bg-primary-300/30 -z-10"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
            Cores em tendência
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-6">
            Descobre as 5 cores mais populares do momento. De térmicos únicos a clássicos vibrantes.
          </p>
        </motion.div>

        {/* Color Carousel */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          {/* Mobile Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevColor}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 group"
            >
              <ChevronLeft className="h-6 w-6 text-primary-600 group-hover:text-primary-700" />
            </button>

            <button
              onClick={nextColor}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 group"
            >
              <ChevronRight className="h-6 w-6 text-primary-600 group-hover:text-primary-700" />
            </button>

            {/* Color Display Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mx-12 relative overflow-hidden">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{ backgroundColor: currentColor.hex }}
              />

              <div className="relative z-10">
                {/* Nail Preview */}
                <motion.div
                  key={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="mb-8"
                >
                  <NailPreview colorData={currentColor} size="large" />
                </motion.div>

                {/* Color Information */}
                <motion.div
                  key={`info-${currentIndex}`}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                  className="text-center"
                >
                  {/* Category Badge */}
                  <div className="inline-block mb-4">
                    <span
                      className="px-4 py-2 rounded-full text-white font-medium text-sm shadow-md"
                      style={{ backgroundColor: currentColor.hex }}
                    >
                      {currentColor.category}
                    </span>
                  </div>

                  {/* Color Name */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 capitalize">
                    {currentColor.name}
                  </h3>

                  {/* Color Number */}
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg mb-4">
                    <span className="font-mono text-primary-700 font-semibold">
                      Nº {currentColor.number}
                    </span>
                  </div>

                  {/* Special Info for Thermal */}
                  {currentColor.quente && (
                    <p className="text-gray-600 text-sm max-w-md mx-auto">
                      Verniz térmico que muda de cor com a temperatura
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Color Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {trendingColors.map((color, index) => (
              <button
                key={color.id}
                onClick={() => goToColor(index)}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-primary-600 scale-125'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
                style={{
                  backgroundColor: index === currentIndex ? color.hex : 'transparent'
                }}
              />
            ))}
          </div>

          {/* Mobile Color Swatches */}
          <div className="mt-12 grid grid-cols-5 gap-3 md:hidden">
            {trendingColors.map((color, index) => (
              <motion.button
                key={color.id}
                onClick={() => goToColor(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square rounded-xl border-3 transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-primary-600 shadow-lg'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                <span className="sr-only">{color.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link to="/colors">
            <Button className="group bg-primary hover:bg-primary-700 text-white px-8 py-4 h-auto text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Palette className="h-5 w-5 mr-2" />
              <span className="mr-2">Ver todas as 60+ cores</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ColorPaletteTeaser;
