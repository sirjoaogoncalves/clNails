import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Clock, Scissors, Sparkles, Euro, Heart, Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const serviceCategories = [
  {
    id: 'manicures',
    name: 'Manicures',
    icon: <Sparkles className="h-5 w-5 mr-1" />,
    services: [
      {
        id: 1,
        title: 'Verniz de Gel',
        description: '',
        price: '10€',
        duration: '+- 1h',
        popular: false,
      },
      {
        id: 2,
        title: 'Aplicação de Gel',
        description: '',
        price: '20€',
        duration: '+- 2h',
        popular: true,
      },
      {
        id: 3,
        title: 'Manutenção de Gel',
        description: '',
        price: '15€',
        duration: '+- 2h',
        popular: false,
      },
    ]
  },
  {
    id: 'pedicures',
    name: 'Pedicures',
    icon:  <Sparkles className="h-5 w-5 mr-1" />,
    services: [
      {
        id: 5,
        title: 'Verniz de Gel',
        description: '',
        price: '10€',
        duration: '1h',
        popular: false,
      },
     ]
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 * (index % 4)
    }
  }),
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ServicesPage = () => {
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const footerRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const tabsInView = useInView(tabsRef, { once: true, amount: 0.1 });
  const footerInView = useInView(footerRef, { once: true, amount: 0.3 });
  
  // Set up smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-16">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-100 -z-10 transform translate-x-1/2 -translate-y-1/2 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-100 -z-10 transform -translate-x-1/2 translate-y-1/2 opacity-70"></div>
      <div className="absolute top-1/3 left-20 w-32 h-32 rounded-full bg-primary-100 -z-10 opacity-50"></div>
      <div className="absolute top-2/3 right-20 w-24 h-24 rounded-full bg-primary-100 -z-10 opacity-50"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 relative inline-block">
              Os Nossos Serviços
              <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
              Explore a nossa gama completa de serviços de cuidados de unhas concebidos para mimar e aperfeiçoar as suas mãos e pés.
            </p>
          </motion.div>

          <motion.div
            ref={tabsRef}
            initial="hidden"
            animate={tabsInView ? "visible" : "hidden"}
            variants={fadeIn}
            >
            <Tabs defaultValue="manicures" className="w-full">
                {/* Mobile view (scrollable) / Desktop view (centered) */}
                <div className="flex justify-center mb-12">
                <div className="w-full overflow-x-auto scrollbar-hide md:overflow-visible">
                    <TabsList className="min-w-max md:w-auto mx-auto  p-2 rounded-full  flex justify-center">
                    {serviceCategories.map((category) => (
                        <TabsTrigger 
                        key={category.id} 
                        value={category.id} 
                        className="px-6 py-3 mx-1 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 flex items-center whitespace-nowrap"
                        >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                        </TabsTrigger>
                    ))}
                    </TabsList>
                </div>
                </div>

                {/* Tab content */}
                {serviceCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-8 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {category.services.map((service, index) => (
                        <motion.div
                        key={service.id}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={cardVariants}
                        >
                        <Card 
                            className="h-full overflow-hidden transition-all duration-300 border-0 shadow-lg hover:shadow-xl bg-white"
                        >
                            <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                <CardTitle className="text-xl mb-1">{service.title}</CardTitle>
                                <CardDescription className="text-gray-700 text-base">
                                    {service.description}
                                </CardDescription>
                                </div>
                            </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="text-sm">{service.duration}</span>
                                </div>
                                <div className="flex items-center text-primary font-bold text-lg">
                                <Euro className="h-4 w-4 mr-1" />
                                <span>{service.price}</span>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        </motion.div>
                    ))}
                    </div>
                </TabsContent>
                ))}
            </Tabs>
          </motion.div>
                     
          <motion.div 
            ref={footerRef}
            initial="hidden"
            animate={footerInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mt-20"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -z-10 transform translate-x-1/3 -translate-y-1/3 opacity-50"></div>
              
              <h2 className="text-2xl font-semibold mb-8 text-center relative inline-flex items-center">
                <Star className="text-primary h-5 w-5 mr-2" />
                Informações Importantes
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-white to-primary-50 p-6 rounded-xl shadow-md"
                >
                  <h3 className="font-semibold text-lg mb-3 text-primary-600">Nota sobre Preços</h3>
                  <p className="text-gray-700">
                    Os preços mantêm-se fixos, independentemente:

                    do formato ou tamanho da unha;

                    da aplicação de extensão;

                    da inclusão (ou não) de nail art.

                    Não há variação de custo consoante as opções mencionadas.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-white to-primary-50 p-6 rounded-xl shadow-md"
                >
                  <h3 className="font-semibold text-lg mb-3 text-primary-600">Marcações</h3>
                  <p className="text-gray-700">
                    Recomendamos a marcação antecipada para garantir disponibilidade. Consulte a nossa política de cancelamento.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-white to-primary-50 p-6 rounded-xl shadow-md"
                >
                  <h3 className="font-semibold text-lg mb-3 text-primary-600">Cancelamentos</h3>
                  <p className="text-gray-700">
                    Por favor, avise com pelo menos 24 horas de antecedência em caso de cancelamento para evitar taxas.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
