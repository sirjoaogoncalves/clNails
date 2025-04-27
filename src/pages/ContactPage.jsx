import React, { useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
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
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Numa implementação real, aqui seria tratado o envio do formulário
    alert('Formulário enviado! Num ambiente de produção, isto enviaria a sua mensagem.');
  };

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
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulário de Contacto */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-2 bg-primary"></div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl text-gray-900">Envie-nos uma Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entraremos em contacto consigo o mais brevemente possível.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        Nome
                      </label>
                      <Input 
                        id="firstName" 
                        placeholder="O seu nome" 
                        required 
                        className="border-gray-200 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Apelido
                      </label>
                      <Input 
                        id="lastName" 
                        placeholder="O seu apelido" 
                        required 
                        className="border-gray-200 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="O seu endereço de email" 
                      required 
                      className="border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Número de Telefone
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="O seu número de telefone" 
                      className="border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensagem
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Diga-nos o que procura..." 
                      className="min-h-[150px] border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-700 text-white rounded-full shadow-md group transition-all duration-300"
                  >
                    <span className="flex items-center justify-center">
                      Enviar Mensagem
                      <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Informações de Contacto */}
          <motion.div
            ref={infoRef}
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
            variants={fadeInRight}
            className="flex flex-col space-y-6"
          >
            <motion.div variants={staggerContainer}>
                            
              <motion.div variants={cardVariants} whileHover="hover" className="mt-6">
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
              </motion.div>
              
              <motion.div variants={cardVariants} whileHover="hover" className="mt-6">
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
              </motion.div>
              
              <motion.div variants={cardVariants} whileHover="hover" className="mt-6">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
