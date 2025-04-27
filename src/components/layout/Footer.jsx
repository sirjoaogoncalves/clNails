import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinkVariants = {
  hover: {
    x: 5,
    transition: { duration: 0.2 }
  }
};

const iconContainerVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 }
  }
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-100 transform translate-x-1/3 -translate-y-1/3 opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-100 transform -translate-x-1/3 translate-y-1/3 opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Informação de Contacto */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-5 text-gray-900 flex items-center">
              <Mail className="h-5 w-5 text-primary mr-2" />
              Contacte-nos
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center group">
                <div className="bg-primary-50 p-2 rounded-full mr-3 group-hover:bg-primary-100 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-700">(+351) 918628094</span>
              </li>
              <li className="flex items-center group">
                <div className="bg-primary-50 p-2 rounded-full mr-3 group-hover:bg-primary-100 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-700">naildesigner.cl@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-5 text-gray-900 flex items-center">
              <Clock className="h-5 w-5 text-primary mr-2" />
              Horário
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary-50 p-2 rounded-full mr-3 mt-0.5">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-gray-700 mb-1">Segunda a Sábado: <span className="font-medium">9h - 19h30</span></p>
                  <p className="text-gray-700">Domingo: <span className="font-medium">Encerrado</span></p>
                </div>
              </li>
            </ul>
          </div>

          {/* Links Rápidos e Redes Sociais */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-5 text-gray-900 flex items-center">
              <Heart className="h-5 w-5 text-primary mr-2" />
              Ligue-se Connosco
            </h3>
            <div className="flex space-x-4 mb-6">
              <motion.a 
                href="https://instagram.com/naildesigner.cl" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                whileHover="hover"
                variants={iconContainerVariants}
                className="bg-primary-50 p-3 rounded-full hover:bg-primary-100 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </motion.a>
              <motion.a 
                href="https://www.facebook.com/profile.php?id=61572996493192" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                whileHover="hover"
                variants={iconContainerVariants}
                className="bg-primary-50 p-3 rounded-full hover:bg-primary-100 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </motion.a>
            </div>
            <div className="space-y-3">
              <motion.div whileHover="hover" variants={footerLinkVariants}>
                <Link to="/services" className="block text-gray-700 hover:text-primary transition-colors duration-300 py-1">
                  → Serviços
                </Link>
              </motion.div>
              <motion.div whileHover="hover" variants={footerLinkVariants}>
                <Link to="/gallery" className="block text-gray-700 hover:text-primary transition-colors duration-300 py-1">
                  → Galeria
                </Link>
              </motion.div>
              <motion.div whileHover="hover" variants={footerLinkVariants}>
                <Link to="/contact" className="block text-gray-700 hover:text-primary transition-colors duration-300 py-1">
                  → Contacto
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Direitos de Autor */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} CL Nail Designer. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
