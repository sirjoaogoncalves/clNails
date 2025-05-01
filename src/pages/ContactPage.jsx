import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Phone, Mail, Clock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

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
      staggerChildren: 0.15
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
      stiffness: 100
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.3 }
  }
};

const ContactPage = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });
  
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
            Contacte-nos
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Estamos disponíveis para responder às suas questões e ajudá-la a agendar o seu serviço.
          </p>
        </motion.div>
        
        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          {/* Phone Card */}
          <motion.a 
            href="tel:+351918628094" 
            variants={cardVariants} 
            whileHover="hover" 
            className="block mt-6"
          >
            <Card className="bg-white border-0 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Telefone</h3>
                    <p className="text-gray-700">(+351) 918628094</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.a>
          
          {/* Email Card */}
          <motion.a 
            href="mailto:naildesigner.cl@gmail.com" 
            variants={cardVariants} 
            whileHover="hover" 
            className="block mt-6"
          >
            <Card className="bg-white border-0 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email</h3>
                    <p className="text-gray-700">naildesigner.cl@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.a>
          
          {/* Hours Card */}
          <motion.div 
            variants={cardVariants} 
            whileHover="hover" 
            className="block mt-6"
          >
            <Card className="bg-white border-0 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Horário de Funcionamento</h3>
                    <p className="text-gray-700">Segunda a Sábado: 9h - 19h30</p>
                    <p className="text-gray-700">Domingo: Encerrado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
