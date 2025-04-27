
import React, { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Manicure Clássica",
    description: "A nossa manicure assinatura inclui modelagem de unhas, tratamento de cutículas, massagem às mãos e aplicação de verniz.",
    price: "30€",
    image: "/src/assets/images/service-classic.jpg",
  },
  {
    id: 2,
    title: "Verniz Gel",
    description: "Verniz de gel de longa duração que permanece brilhante e sem lascar até duas semanas.",
    price: "45€",
    image: "/src/assets/images/service-gel.jpg",
  },
  {
    id: 3,
    title: "Nail Art Design",
    description: "Expresse-se com desenhos personalizados criados pelos nossos talentosos artistas.",
    price: "A partir de 15€",
    image: "/src/assets/images/service-nailart.jpg",
  },
  {
    id: 4,
    title: "Pedicure Spa de Luxo",
    description: "Delicie-se com a nossa pedicure premium com esfoliação, máscara, massagem prolongada e verniz.",
    price: "65€",
    image: "/src/assets/images/service-pedicure.jpg",
  }
];

// Variante de animação para os cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: index => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const FeaturedServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Decorações de fundo */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-50 -z-10 transform translate-x-1/2 -translate-y-1/2 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-50 -z-10 transform -translate-x-1/2 translate-y-1/2 opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="relative z-10">Os Nossos Serviços</span>
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-6">
            Descubra a nossa gama de serviços de cuidados de unhas pensados para mimar e 
            aperfeiçoar as suas mãos e pés.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full group border-0 bg-white shadow-lg relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-600/0 via-primary-600/0 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex justify-between items-center text-xl">
                    <span>{service.title}</span>
                    <span className="text-primary font-bold">{service.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow relative z-10">
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
                <CardFooter className="mt-auto pt-4 relative z-10">
                  <Link to="/services" className="w-full">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white group-hover:bg-primary group-hover:text-white transition-all duration-300 rounded-full">
                      <span>Saber Mais</span>
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/services">
            <Button className="bg-primary hover:bg-primary-700 relative overflow-hidden group shadow-lg rounded-full">
              <span className="relative z-10 flex items-center text-white">
                Ver Todos os Serviços
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
