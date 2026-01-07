import { useEffect, useRef, useState } from 'react';
import { Sparkles, Crown, Heart, Star, Baby, Palette, Gem, Scissors, Hand, Shirt } from 'lucide-react';

const services = [
  {
    icon: Crown,
    title: 'Bridal Makeup',
    description: 'Your perfect bridal look for the most special day of your life.',
  },
  {
    icon: Sparkles,
    title: 'Reception Makeup',
    description: 'Glamorous evening look to shine at your reception celebration.',
  },
  {
    icon: Heart,
    title: 'Pre & Post Wedding Makeup',
    description: 'Radiant looks for all your pre and post wedding ceremonies.',
  },
  {
    icon: Star,
    title: 'Engagement Makeup',
    description: 'Elegant and romantic makeup for your engagement day.',
  },
  {
    icon: Baby,
    title: 'Baby Shower Makeup',
    description: 'Soft, glowing makeup to celebrate motherhood beautifully.',
  },
  {
    icon: Gem,
    title: 'Half Saree Ceremony Makeup',
    description: 'Traditional yet modern looks for coming-of-age celebrations.',
  },
  {
    icon: Palette,
    title: 'HD Makeup',
    description: 'Flawless, camera-ready finish with HD techniques.',
  },
  {
    icon: Hand,
    title: 'Nail Art',
    description: 'Beautiful nail designs to complement your bridal look.',
  },
  {
    icon: Scissors,
    title: 'Hair Styling',
    description: 'Elegant hairstyles from traditional to contemporary.',
  },
  {
    icon: Shirt,
    title: 'Saree Draping',
    description: 'Expert saree draping in multiple regional styles.',
  },
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate cards sequentially with random assembly effect
          services.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedCards(prev => [...prev, index]);
            }, 100 + index * 80); // Staggered delay
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate random starting positions
  const getCardStyle = (index: number) => {
    if (!animatedCards.includes(index)) {
      // Start from random positions
      const directions = [
        { x: '-100px', y: '-50px' }, // top-left
        { x: '100px', y: '-50px' },  // top-right
        { x: '-100px', y: '50px' },  // bottom-left
        { x: '100px', y: '50px' },   // bottom-right
      ];
      const direction = directions[Math.floor(Math.random() * directions.length)];
      
      return {
        transform: `translate(${direction.x}, ${direction.y}) rotate(${Math.random() * 30 - 15}deg)`,
        opacity: 0,
        scale: 0.8,
      };
    }
    
    return {
      transform: 'translate(0, 0) rotate(0deg)',
      opacity: 1,
      scale: 1,
    };
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-cream/30 via-cream to-cream/30 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease'
          }}
        >
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/10 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-primary font-medium">
              What We Offer
            </p>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light mb-4">
            Our <span className="font-medium italic text-primary/90">Services</span>
          </h2>
          
          <div 
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto"
            style={{
              width: isVisible ? '6rem' : '0',
              transition: 'width 0.8s ease 0.3s'
            }}
          />
        </div>

        {/* Services Grid with assembly animation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const isAnimated = animatedCards.includes(index);
            
            return (
              <div
                key={service.title}
                ref={el => cardRefs.current[index] = el}
                className="group relative bg-gradient-to-br from-background/90 via-background/80 to-background/90 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-border/30 hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
                style={{
                  ...getCardStyle(index),
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: `${index * 80}ms`,
                  transformOrigin: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 transition-all duration-500" />
                
                {/* Icon with animation */}
                <div 
                  className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-3 md:mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300"
                  style={{
                    transform: isAnimated ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${100 + index * 50}ms`,
                  }}
                >
                  <service.icon 
                    className="w-5 h-5 md:w-6 md:h-6 text-primary/90 group-hover:text-primary transition-colors duration-300" 
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotate(12deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotate(0deg)';
                    }}
                    style={{ transition: 'transform 0.3s ease' }}
                  />
                </div>
                
                {/* Title */}
                <h3 
                  className="font-serif text-sm md:text-base text-foreground font-medium mb-2 relative inline-block"
                  style={{
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    transitionDelay: `${200 + index * 50}ms`,
                  }}
                >
                  <span className="relative">
                    {service.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500" />
                  </span>
                </h3>
                
                {/* Description */}
                <p 
                  className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2"
                  style={{
                    opacity: isAnimated ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    transitionDelay: `${300 + index * 50}ms`,
                  }}
                >
                  {service.description}
                </p>
                
                {/* Decorative corner accent */}
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
              </div>
            );
          })}
        </div>

        {/* Highlight Note */}
        <div
          className="text-center mt-10 md:mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 1s, transform 0.5s ease 1s',
          }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm px-5 py-3 rounded-full border border-primary/10">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <p className="font-sans text-sm text-primary font-medium">
              Complete Bridal Grooming Services Available
            </p>
          </div>
        </div>
      </div>

      {/* Add CSS animation for pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;