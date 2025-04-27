
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "../ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Star, Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sara Silva",
    comment: "Adoro as minhas unhas! A atenção ao detalhe e o serviço foram extraordinários. Vou definitivamente voltar!",
    rating: 5,
    image: "/src/assets/images/client-1.jpg"
  },
  {
    id: 2,
    name: "Mariana Costa",
    comment: "As técnicas são verdadeiras artistas. O meu design de unhas recebeu tantos elogios. Este é agora o meu salão de eleição!",
    rating: 5,
    image: "/src/assets/images/client-2.jpg"
  },
  {
    id: 3,
    name: "Ana Rodrigues",
    comment: "Ótimo ambiente, equipa simpática e resultados incríveis. Deram-se ao trabalho de garantir que as minhas unhas ficavam perfeitas.",
    rating: 5,
    image: "/src/assets/images/client-3.jpg"
  },
  {
    id: 4,
    name: "Joana Santos",
    comment: "Já fui a muitos salões de unhas, mas o CL Nail Designer é, de longe, o melhor. Equipa limpa, profissional e talentosa!",
    rating: 5,
    image: "/src/assets/images/client-4.jpg"
  },
  {
    id: 5,
    name: "Inês Ferreira",
    comment: "Os designs de nail art são incríveis! São super criativos e a qualidade dura semanas. Recomendo vivamente!",
    rating: 5,
    image: "/src/assets/images/client-5.jpg"
  }
];

const TestimonialsSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Handle carousel API
  useEffect(() => {
    if (!api) return;
    
    const scrollHandler = () => {
      const slideIndex = api.selectedScrollSnap();
      setActiveIndex(slideIndex);
    };
    
    api.on("select", scrollHandler);
    
    return () => {
      api.off("select", scrollHandler);
    };
  }, [api]);

  // Auto-slide effect
  useEffect(() => {
    if (isHovering || !api) return;
    
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % testimonials.length;
      setActiveIndex(nextIndex);
      api.scrollTo(nextIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering, activeIndex, api]);

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorações de fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 -z-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary-200"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-primary-200"></div>
        <div className="absolute bottom-20 left-40 w-48 h-48 rounded-full bg-primary-200"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 relative"
        >
          <Quote className="absolute text-primary-200 h-20 w-20 -top-10 left-1/2 transform -translate-x-1/2 -z-10 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O Que Dizem Os Nossos Clientes</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Não acredite apenas na nossa palavra. Veja o que os nossos clientes têm a dizer sobre as suas experiências connosco.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="w-full">
              {testimonials.map((testimonial) => (
                <CarouselItem 
                  key={testimonial.id} 
                  className="w-full flex-none"
                  style={{ width: '100%' }}
                >
                  <Card className="h-full bg-gradient from-gray-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-1">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex mb-6 justify-between items-start">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                          ))}
                        </div>
                        <Quote className="h-8 w-8 text-primary-200" />
                      </div>
                      <p className="text-gray-700 italic mb-6 flex-grow text-lg leading-relaxed md:text-xl">"{testimonial.comment}"</p>
                      <div className="flex items-center mt-4">
                        {/* Fallback para imagem do cliente - círculo com as iniciais se não houver imagem */}
                        <div className="flex-shrink-0 h-14 w-14 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 text-xl">
                          {testimonial.name.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                          <p className="text-gray-500">Cliente satisfeita</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Indicadores de slide */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-primary w-8' : 'bg-gray-300 w-2 hover:bg-primary-300'
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  if (api) {
                    api.scrollTo(index);
                  }
                }}
                aria-label={`Ver testemunho ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
