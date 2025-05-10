import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

// Dados de serviços para o slider
const featuredServices = [
  {
    id: 1,
    title: "",
    image: "/src/assets/images/service-classic.jpg",
  },
  {
    id: 2,
    title: "",
    image: "/src/assets/images/service-gel.jpg",
  },
  {
    id: 3,
    title: "",
    image: "/src/assets/images/IMG_6808.jpeg",
  },
  {
    id: 4,
    title: "",
    image: "/src/assets/images/IMG_6808.jpeg",
  }
];

const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  // Handle carousel API
  useEffect(() => {
    if (!api) return;
    
    const scrollHandler = () => {
      const slideIndex = api.selectedScrollSnap();
      setActiveIndex(slideIndex);
    };
    
    api.on("select", scrollHandler);
    
    return () => {
      api.off("select", scrollHandler);
    };
  }, [api]);

  // Auto-slide effect
  useEffect(() => {
    if (isHovering || !api) return;
    
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % featuredServices.length;
      setActiveIndex(nextIndex);
      api.scrollTo(nextIndex);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovering, activeIndex, api]);

  return (
    <div className="overflow-hidden bg-gradient-to-r from-primary-50 to-primary-100" ref={ref}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Eleve o Seu <span className="text-primary bg-white px-2 py-1 rounded-lg shadow-sm">Estilo</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Experiencie cuidados e design de unhas premium na CL Nail Designer. 
              Onde a arte encontra o relaxamento para a manicure perfeita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button className="bg-primary hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white px-8 py-6 h-auto text-lg rounded-full">
                  Ver Os Nossos Serviços
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary-50 px-8 py-6 h-auto text-lg rounded-full transition-all duration-300">
                  Contacte-nos
                </Button>
              </Link>
            </div> 
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 md:order-2"
          >
            <div 
              className="relative rounded-xl overflow-hidden shadow-2xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Carousel 
                className="w-full"
                opts={{
                  align: "center",
                  loop: true,
                }}
                setApi={setApi}
              >
                <CarouselContent 
                  className="w-full"
                >
                  {featuredServices.map((service, index) => (
                    <CarouselItem 
                      key={service.id} 
                      className="w-full flex-none"
                      style={{ width: '100%' }}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                          <h3 className="text-white text-xl font-bold">{service.title}</h3>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Indicadores de slide */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                {featuredServices.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    onClick={() => {
                      setActiveIndex(index);
                      if (api) {
                        api.scrollTo(index);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decoração de fundo */}
      <div className="absolute top-0 right-0 -z-10 opacity-10">
        <svg width="400" height="400" viewBox="0 0 200 200">
          <path fill="#c4908f" d="M47.1,-57.7C59.2,-45,66.2,-28.7,70.4,-10.9C74.6,6.8,76,26,67.8,40.6C59.7,55.3,42,65.4,23.4,71.4C4.9,77.4,-14.5,79.3,-31.9,73C-49.4,66.6,-64.8,52,-71.9,33.8C-79,15.5,-77.9,-6.3,-69.9,-24.1C-61.9,-41.9,-47,-55.5,-31.2,-67.4C-15.5,-79.3,1.2,-89.5,16.3,-85.6C31.3,-81.7,45,-70.4,47.1,-57.7Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
