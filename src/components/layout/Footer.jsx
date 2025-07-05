import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Clock, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants for footer elements
const footerSectionVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const footerLinkVariants = {
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const iconContainerVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Reusable components for better maintainability
const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-gray-100 p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <h3 className="text-lg lg:text-xl font-semibold mb-6 text-gray-900 flex items-center gap-3">
    <div className="bg-primary-100 p-2 rounded-xl">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    {title}
  </h3>
);

const ContactInfo = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-4 group">
    <div className="bg-primary-50 p-3 rounded-xl group-hover:bg-primary-100 transition-all duration-300">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

const SocialLink = ({ href, icon: Icon, label, platform }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover="hover"
    variants={iconContainerVariants}
    className="group relative bg-primary-50 hover:bg-primary-100 p-3 lg:p-4 rounded-xl transition-all duration-300 hover:shadow-lg"
  >
    <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
    {/* Tooltip */}
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
      {platform}
    </div>
  </motion.a>
);

const QuickLink = ({ to, children }) => (
  <motion.div whileHover="hover" variants={footerLinkVariants}>
    <Link
      to={to}
      className="group flex items-center justify-between text-gray-700 hover:text-primary transition-all duration-300 py-3 px-4 hover:bg-primary-50 rounded-xl"
    >
      <span className="font-medium">{children}</span>
      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
    </Link>
  </motion.div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-primary-50 to-white pt-16 lg:pt-20 pb-8 overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-100 transform translate-x-1/3 -translate-y-1/3 opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-100 transform -translate-x-1/3 translate-y-1/3 opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {/* Contact Information */}
          <motion.div
            variants={footerSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
          >
            <SectionCard>
              <SectionHeader icon={Mail} title="Contacta-nos" />

              <div className="space-y-4">
                <ContactInfo icon={Mail}>
                  <span className="text-gray-700">naildesigner.cl@gmail.com</span>
                </ContactInfo>
              </div>
            </SectionCard>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            variants={footerSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
          >
            <SectionCard>
              <SectionHeader icon={Clock} title="Horário" />

              <div className="space-y-4">
                <ContactInfo icon={Clock}>
                  <div>
                    <p className="text-gray-700 mb-1">Segunda a Sábado: <span className="font-medium">9h - 19h30</span></p>
                    <p className="text-gray-700">Domingo: <span className="font-medium">Encerrado</span></p>
                  </div>
                </ContactInfo>
              </div>
            </SectionCard>
          </motion.div>

          {/* Quick Links & Social Media */}
          <motion.div
            variants={footerSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={2}
          >
            <SectionCard>
              <SectionHeader icon={Heart} title="Redes sociais" />

              {/* Social Media Links */}
              <div className="flex space-x-4">
                <SocialLink
                  href="https://instagram.com/naildesigner.cl"
                  icon={Instagram}
                  label="Seguir no Instagram"
                  platform="Instagram"
                />
                <SocialLink
                  href="https://www.facebook.com/profile.php?id=61572996493192"
                  icon={Facebook}
                  label="Seguir no Facebook"
                  platform="Facebook"
                />
              </div>
            </SectionCard>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={footerSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={3}
          className="border-t border-gray-200 pt-6 text-center text-gray-600 text-sm"
        >
          <p>© {currentYear} CL Designer. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
