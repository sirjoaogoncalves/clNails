
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Heart, Award, Clock, Smile } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.5
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  }
};

const AboutPage = () => {
  const headerRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.1 });
  
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
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 relative inline-block">
            Sobre a CL Nail Designer
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h1>
        </motion.div>
        
        {/* Secção de Introdução */}
        <div 
          ref={storyRef} 
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={fadeInLeft}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">A Nossa História</h2>
              <p className="text-gray-700 mb-4">
                A CL Nail Designer surgiu com a paixão pela arte do designer de unhas e do seu significado, pois são uma extensão da nossa personalidade, uma forma delicada de expressar quem somos. Desta forma, a CL Nail Designer foi fundada com um propósito simples, mas cheio de significado: levar a arte, o cuidado e a autoestima até si, no conforto da sua casa.

Com formação especializada e uma dedicação genuína ao bem-estar de cada pessoa, levamos até si as últimas tendências, técnicas de excelência e materiais de alta qualidade. Mais do que criar unhas bonitas, queremos criar momentos especiais — onde o cuidado, a confiança e o brilho interior se encontram.

A nossa história é feita de cada sorriso, de cada conversa partilhada, de cada toque de cor que se transforma em felicidade. E a sua história? Teremos todo o gosto em fazer parte dela.
              </p>
              <p className="text-gray-700">
                A nossa filosofia é simples: proporcionar um serviço excepcional num ambiente relaxante com resultados que fazem os nossos clientes sentirem-se confiantes e bonitos.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="relative"
            >
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary-200 rounded-lg opacity-30 transform rotate-3"></div>
              <div className="rounded-lg overflow-hidden shadow-xl relative z-10">
                <img 
                  src="/src/assets/images/cnail.png" 
                  alt="CL Nail Designer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Secção de Valores */}
        <motion.div 
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="bg-gray-50 py-16 px-4 mb-16 rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-center mb-12 text-gray-900">
            Os Nossos Valores
          </h2>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Paixão</h3>
                  <p className="text-gray-700">
                    Somos apaixonados pelo cuidados e design de unhas e colocamos o coração em cada detalhe. É essa paixão que nos move a evoluir, criar e entregar sempre o melhor a quem confia em nós.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Qualidade</h3>
                  <p className="text-gray-700">
                    Utilizamos apenas produtos e técnicas de qualidade para garantir resultados bonitos e duradouros.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Dedicação</h3>
                  <p className="text-gray-700">
                    Dedicamos tempo para compreender as suas preferências e oferecer um serviço personalizado.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smile className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Foco no Cliente</h3>
                  <p className="text-gray-700">
                    A sua satisfação é a nossa prioridade, e esforçamo-nos por exceder as suas expectativas em cada visita.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div> 
       </div>
    </div>
  );
};

export default AboutPage;
