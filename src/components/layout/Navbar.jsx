import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';

// Importar a imagem do logotipo
import logoImage from '/cnail.png';

const navLinkVariants = {
  initial: { y: -5, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  hover: { y: -2, transition: { duration: 0.2 } }
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.3 }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

// Portal component for the mobile menu
const MobileMenuPortal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  // Create a portal directly to the body to avoid nesting issues
  return ReactDOM.createPortal(
    children,
    document.body
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/services', label: 'Serviços' },
    { path: '/gallery', label: 'Galeria' },
    { path: '/colors', label: 'Cores' },
    { path: '/about', label: 'Sobre' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle navigation click - just close mobile menu
  const handleNavClick = () => {
    setIsMenuOpen(false); // Close mobile menu
  };

  const MobileMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            onClick={() => setIsMenuOpen(false)}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl p-6 overflow-y-auto"
            style={{ zIndex: 9999 }}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <img src={logoImage} alt="CL Nail Designer" className="h-10" />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Fechar menu"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <X size={24} />
              </Button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center text-gray-800 hover:bg-primary-50 hover:text-primary font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                      isActive(link.path) ? 'bg-primary-50 text-primary' : ''
                    }`}
                    onClick={handleNavClick}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        className="ml-2 w-1.5 h-1.5 rounded-full bg-primary"
                        layoutId="mobileDot"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                className="pt-4 mt-4 border-t border-gray-100"
              >
                <Link to="/contact" onClick={handleNavClick}>
                  <Button className="bg-primary hover:bg-primary-700 w-full rounded-full shadow-md">
                    Contacte-nos
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Social Links in Mobile Menu */}
            <div className="mt-auto pt-8 border-t border-gray-100 mt-8">
              <p className="text-sm text-gray-600 mb-4">Siga-nos nas redes sociais</p>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-primary-50 p-2 rounded-full">
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-primary-50 p-2 rounded-full">
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
      }`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={handleNavClick}>
            <motion.img
              src={logoImage}
              alt="CL Nail Designer"
              className="h-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={navLinkVariants}
                custom={index}
                className="relative"
              >
                <Link
                  to={link.path}
                  className={`text-gray-800 hover:text-primary font-medium transition-colors duration-300 py-2 ${
                    isActive(link.path) ? 'text-primary' : ''
                  }`}
                  onClick={handleNavClick}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="activeNavIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={navLinkVariants}
              custom={5}
            >
              <Link to="/contact" onClick={handleNavClick}>
                <Button className="bg-primary hover:bg-primary-700 rounded-full shadow-sm transition-all duration-300">
                  Contacte-nos
                </Button>
              </Link>
            </motion.div>
          </nav>

          {/* Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Menu"
            className="md:hidden flex items-center justify-center"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </header>

      {/* Render the mobile menu via portal to ensure it's outside the header */}
      <MobileMenuPortal isOpen={isMenuOpen}>
        <MobileMenu />
      </MobileMenuPortal>
    </>
  );
};

export default Navbar;
