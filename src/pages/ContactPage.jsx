import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Clock, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Enhanced animation variants with improved easing and performance
const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Stagger animation for cards with improved timing
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Enhanced card animations with better spring physics
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      mass: 1
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Background decoration animation variants
const decorationVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

// Floating animation for decorative elements
const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Enhanced ContactCard component with better accessibility and visual feedback
const ContactCard = ({
  icon: Icon,
  title,
  children,
  href = null,
  className = "",
  iconBgColor = "bg-primary-100",
  iconColor = "text-primary"
}) => {
  const CardWrapper = href ? motion.a : motion.div;
  const cardProps = href ? { href } : {};

  return (
    <CardWrapper
      {...cardProps}
      variants={cardVariants}
      whileHover="hover"
      className={`block group ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:border-primary/20">
        <CardContent className="p-6 lg:p-8">
          <div className="flex items-start space-x-4 lg:space-x-6">
            {/* Icon container with enhanced styling */}
            <div className={`${iconBgColor} p-4 rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-sm`}>
              <Icon className={`h-6 w-6 lg:h-7 lg:w-7 ${iconColor}`} />
            </div>

            {/* Content section with improved typography */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg lg:text-xl text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {title}
                </h3>
                {href && (
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                )}
              </div>
              <div className="text-gray-700 space-y-1">
                {children}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

// Social media link component with enhanced hover effects
const SocialMediaCard = ({ icon: Icon, href, platform, description }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={cardVariants}
    whileHover="hover"
    className="block group"
    whileTap={{ scale: 0.98 }}
  >
    <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:border-primary/20">
      <CardContent className="p-6 lg:p-8">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <div className="bg-primary-100 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-primary-200 transition-all duration-300 shadow-sm">
            <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg lg:text-xl text-gray-900 group-hover:text-primary transition-colors duration-300">
                {platform}
              </h3>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <p className="text-gray-600 text-sm lg:text-base">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.a>
);

const ContactPage = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const socialRef = useRef(null);

  // Enhanced useInView hooks with better threshold settings
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });
  const socialInView = useInView(socialRef, { once: true, amount: 0.2 });

  // Smooth scroll behavior setup with cleanup
  useEffect(() => {
    const originalBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = originalBehavior;
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-25 py-8 lg:py-12 overflow-hidden">
      {/* Enhanced decorative background elements with animations */}
      <motion.div
        className="absolute top-0 right-0 w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-primary-100 -z-10 transform translate-x-1/3 -translate-y-1/3 opacity-60"
        variants={decorationVariants}
        initial="hidden"
        animate="visible"
        style={{ filter: 'blur(40px)' }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-primary-100 -z-10 transform -translate-x-1/3 translate-y-1/3 opacity-40"
        variants={decorationVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        style={{ filter: 'blur(30px)' }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary-200 -z-10 opacity-30"
        animate={floatingAnimation}
        transition={{ delay: 0.5 }}
      />

      <motion.div
        className="absolute bottom-1/3 right-10 w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-primary-200 -z-10 opacity-20"
        animate={floatingAnimation}
        transition={{ delay: 1.2 }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary-300 -z-10 opacity-15 transform -translate-x-1/2 -translate-y-1/2"
        animate={floatingAnimation}
        transition={{ delay: 0.8 }}
      />

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Header section - preserving original title design */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16 lg:mb-20"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 relative inline-block">
            Contacte-nos
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-200 rounded-full z-0 transform -rotate-1"></span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Estamos disponíveis para responder às suas questões e ajudá-la a agendar o seu serviço.
          </p>
        </motion.div>

        {/* Contact information cards */}
        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-4xl mx-auto mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Email card with enhanced styling */}
            <ContactCard
              icon={Mail}
              title="Email"
              href="mailto:naildesigner.cl@gmail.com"
              className="lg:col-span-1"
            >
              <p className="text-base lg:text-lg font-medium text-primary">naildesigner.cl@gmail.com</p>
            </ContactCard>

            {/* Hours card with improved layout */}
            <ContactCard
              icon={Clock}
              title="Horário de funcionamento"
              iconBgColor="bg-sky-100"
              iconColor="text-sky-300"
              className="lg:col-span-1"
            >
                <div className="flex justify-between">
                  <span className="text-gray-700">Segunda a Sábado:</span>
                  <span className="font-semibold text-gray-900">9h - 19h30</span>
                </div>
            </ContactCard>
          </div>

        </motion.div>

        {/* Social media section */}
        <motion.div
          ref={socialRef}
          initial="hidden"
          animate={socialInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Siga-nos nas redes sociais
            </h2>
            <p className="text-gray-700 lg:text-lg">
              Acompanhe o nosso trabalho e inspire-se com as nossas criações
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <SocialMediaCard
              icon={Instagram}
              href="https://instagram.com/naildesigner.cl"
              platform="Instagram"
              description="Veja as nossas últimas criações e inspirações"
            />

            <SocialMediaCard
              icon={Facebook}
              href="https://www.facebook.com/profile.php?id=61572996493192"
              platform="Facebook"
              description="Fique por dentro das novidades e promoções"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
