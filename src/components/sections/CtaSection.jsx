import React, { useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const CtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Fundo com gradiente e efeito de sobreposição */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-600 -z-10"></div>
      
      {/* Padrão decorativo */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-24 h-24 rounded-full bg-white absolute top-12 left-12 opacity-20"></div>
          <div className="w-32 h-32 rounded-full bg-white absolute bottom-12 right-12 opacity-20"></div>
          <div className="w-16 h-16 rounded-full bg-white absolute top-1/2 left-1/3 opacity-20"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronta para Experimentar o <span className="relative inline-block">
                Nosso Serviço
                <span className="absolute bottom-1 left-0 right-0 h-1 bg-white rounded"></span>
              </span>?
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/90">
              Marque a sua consulta hoje e deixe que as nossas técnicas especialistas transformem as suas unhas em verdadeiras obras de arte.
            </p>
            
                       
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link to="/contact">
                <Button className="bg-white text-primary-600 hover:bg-white/90 px-8 py-6 h-auto text-lg rounded-full shadow-xl group">
                  <span>Contacte-nos Agora</span>
                </Button>
              </Link>
              
              <p className="mt-6 text-sm text-white/80">
                Resposta rápida garantida. Sem compromissos.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
