import React, { useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ArrowRight, Palette } from 'lucide-react';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100" ref={ref}>

      {/* Simple dynamic gradient background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(251, 246, 246, 0.4) 0%, transparent 50%), linear-gradient(45deg, rgba(247, 236, 236, 0.3) 0%, rgba(240, 220, 220, 0.2) 100%)",
              "radial-gradient(circle at 80% 20%, rgba(240, 220, 220, 0.4) 0%, transparent 50%), linear-gradient(135deg, rgba(251, 246, 246, 0.3) 0%, rgba(247, 236, 236, 0.2) 100%)",
              "radial-gradient(circle at 40% 80%, rgba(247, 236, 236, 0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(240, 220, 220, 0.3) 0%, rgba(251, 246, 246, 0.2) 100%)",
              "radial-gradient(circle at 60% 30%, rgba(251, 246, 246, 0.4) 0%, transparent 50%), linear-gradient(315deg, rgba(247, 236, 236, 0.3) 0%, rgba(240, 220, 220, 0.2) 100%)",
              "radial-gradient(circle at 20% 50%, rgba(251, 246, 246, 0.4) 0%, transparent 50%), linear-gradient(45deg, rgba(247, 236, 236, 0.3) 0%, rgba(240, 220, 220, 0.2) 100%)"
            ]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-200/30 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-300/20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/3 left-10 w-32 h-32 rounded-full bg-primary-100/50 -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-primary-200/40 -z-10"></div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-8 flex items-center min-h-screen">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-2"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Descobre a nossa{' '}
                <span className="relative inline-block">
                  <motion.span
                    className="relative z-10 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
                    style={{
                      background: "linear-gradient(90deg, #c4908f 0%, #c4908f 25%, #e6b5b4 50%, #c4908f 75%, #c4908f 100%)",
                      backgroundSize: "400% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 1.5
                    }}
                  >
                    Arte
                  </motion.span>
                  <motion.span
                    className="absolute bottom-2 left-0 right-0 h-3 bg-primary-300/60 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? "100%" : 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Onde cada unha se transforma com a tua personalidade.
              <br className="hidden md:block" />
              <span> </span>Explora a criatividade e elegância em cada detalhe.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8"
            >
              {[
                { icon: Palette, text: "60+ cores únicas" },
                { icon: ArrowRight, text: "Designs personalizados" },
                { icon: Palette, text: "Nail art exclusiva" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-primary-200/50 shadow-md"
                >
                  <item.icon className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700 font-medium text-sm md:text-base">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-1 md:gap-2 justify-center items-center"
            >
              <Link to="/gallery">
                <Button
                  className="group bg-primary hover:bg-primary-700 text-white px-8 py-4 h-auto text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <span className="mr-2">Ver galeria</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="w-1 h-3 bg-primary-500 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
