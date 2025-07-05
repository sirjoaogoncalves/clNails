import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "../ui/button";
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';

// Import logo image
import logoImage from '/cl_designer_branco.png';

// Animation variants - optimized for performance with GPU acceleration
const navLinkVariants = {
  initial: {
    y: -5,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Mobile menu animation variants with stagger effect
const mobileMenuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Stagger animation for mobile menu items
const mobileItemVariants = {
  closed: {
    opacity: 0,
    x: 20
  },
  open: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

// Portal component for mobile menu - prevents z-index issues
const MobileMenuPortal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  // Render mobile menu in document body to avoid stacking context issues
  return ReactDOM.createPortal(children, document.body);
};

// Separate component for desktop navigation - improves readability
const DesktopNavigation = ({ navLinks, isActive, handleNavClick }) => (
  <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" role="navigation">
    {navLinks.map((link, index) => (
      <motion.div
        key={link.path}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={navLinkVariants}
        className="relative"
      >
        <Link
          to={link.path}
          className={`relative text-gray-800 hover:text-primary font-medium transition-all duration-300 py-2 px-1 group ${
            isActive(link.path) ? 'text-primary' : ''
          }`}
          onClick={handleNavClick}
          aria-current={isActive(link.path) ? 'page' : undefined}
        >
          {link.label}
          {/* Active indicator with smooth layout animation */}
          {isActive(link.path) && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
              layoutId="activeNavIndicator"
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            />
          )}
          {/* Hover indicator */}
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            style={{ display: isActive(link.path) ? 'none' : 'block' }}
          />
        </Link>
      </motion.div>
    ))}

    {/* Contact button with enhanced styling */}
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={navLinkVariants}
      whileTap={{ scale: 0.95 }}
    >
      <Link to="/contact" onClick={handleNavClick}>
        <Button className="bg-primary hover:bg-primary-700 text-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2 font-medium">
          Contacta-nos
        </Button>
      </Link>
    </motion.div>
  </nav>
);

// Mobile menu component - separated for better maintainability
const MobileMenu = ({ isMenuOpen, setIsMenuOpen, navLinks, isActive, handleNavClick }) => (
  <AnimatePresence mode="wait">
    {isMenuOpen && (
      <>
        {/* Backdrop with blur effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          style={{ zIndex: 9998 }}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile menu panel */}
        <motion.aside
          className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
          style={{ zIndex: 9999 }}
          variants={mobileMenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="p-6">
            {/* Header with logo and close button */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <Link to="/" onClick={handleNavClick} className="flex items-center">
                <img
                  src={logoImage}
                  alt="CL Nail Designer"
                  className="h-[80px] w-auto"
                  loading="lazy"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fechar menu"
                className="text-gray-700 hover:text-primary hover:bg-primary-50 transition-all duration-200 rounded-full"
              >
                <X size={24} />
              </Button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-2" role="navigation">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  custom={index}
                >
                  <Link
                    to={link.path}
                    className={`group flex items-center justify-between text-gray-800 hover:bg-primary-50 hover:text-primary font-medium py-4 px-4 rounded-xl transition-all duration-300 ${
                      isActive(link.path) ? 'bg-primary-50 text-primary shadow-sm' : ''
                    }`}
                    onClick={handleNavClick}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                  >
                    <span className="flex items-center">
                      {link.label}
                      {isActive(link.path) && (
                        <motion.div
                          className="ml-2 w-2 h-2 rounded-full bg-primary"
                          layoutId="mobileDot"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isActive(link.path) ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                      }`}
                    />
                  </Link>
                </motion.div>
              ))}

              {/* Contact button in mobile menu */}
              <motion.div
                variants={mobileItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                custom={navLinks.length}
                className="pt-6 mt-6 border-t border-gray-100"
              >
                <Link to="/contact" onClick={handleNavClick}>
                  <Button className="bg-primary hover:bg-primary-700 text-white w-full rounded-xl shadow-md hover:shadow-lg transition-all duration-300 py-3 font-medium">
                    Contacta-nos
                  </Button>
                </Link>
              </motion.div>
            </nav>

            {/* Social media links */}
            <motion.div
              variants={mobileItemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              custom={navLinks.length + 1}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <p className="text-sm text-gray-600 mb-4 font-medium">Segue as nossas redes sociais</p>
              <div className="flex space-x-3">
                <a
                  href="https://instagram.com/naildesigner.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-50 hover:bg-primary-100 p-3 rounded-xl transition-all duration-200 hover:shadow-md"
                  aria-label="Seguir no Instagram"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61572996493192"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-50 hover:bg-primary-100 p-3 rounded-xl transition-all duration-200 hover:shadow-md"
                  aria-label="Seguir no Facebook"
                >
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation links configuration - centralized for easier maintenance
  const navLinks = useMemo(() => [
    { path: '/services', label: 'Serviços' },
    { path: '/gallery', label: 'Galeria' },
    { path: '/colors', label: 'Cores' },
    { path: '/about', label: 'Sobre' }
  ], []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
  }, []);

  // Debounced scroll effect for better performance
  useEffect(() => {
    let timeoutId;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Body scroll lock when mobile menu is open - prevents background scrolling
  useEffect(() => {
    const body = document.body;
    const originalStyle = window.getComputedStyle(body).overflow;

    if (isMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = originalStyle;
    }

    return () => {
      body.style.overflow = originalStyle;
    };
  }, [isMenuOpen]);

  // Check if current route is active - memoized for performance
  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  // Navigation click handler - closes mobile menu and handles navigation
  const handleNavClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Toggle mobile menu with callback optimization
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-white shadow-sm'
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo section with enhanced hover effect */}
            <Link
              to="/"
              className="flex items-center group"
              onClick={handleNavClick}
              aria-label="CL Nail Designer - Página inicial"
            >
              <motion.img
                src={logoImage}
                alt="CL Nail Designer"
                className="h-[60px] lg:h-[80px] w-auto group-hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                loading="eager"
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation
              navLinks={navLinks}
              isActive={isActive}
              handleNavClick={handleNavClick}
            />

            {/* Mobile menu toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              className="lg:hidden flex items-center justify-center hover:bg-primary-50 transition-colors duration-200 rounded-full"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu portal - rendered outside header for proper z-index stacking */}
      <MobileMenuPortal isOpen={isMenuOpen}>
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navLinks={navLinks}
          isActive={isActive}
          handleNavClick={handleNavClick}
        />
      </MobileMenuPortal>
    </>
  );
};

export default Navbar;
