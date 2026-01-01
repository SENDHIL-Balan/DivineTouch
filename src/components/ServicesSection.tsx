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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-12 md:py-20 bg-cream grain-texture relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className={`font-sans text-xs tracking-luxury uppercase text-primary mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What We Offer
          </p>
          <h2
            className={`font-serif text-2xl md:text-4xl text-foreground transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Our Services
          </h2>
          <div
            className={`w-16 h-0.5 gradient-gold mx-auto mt-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
        </div>

        {/* Services Grid - Compact for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group bg-background/80 backdrop-blur-sm p-4 md:p-6 rounded-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-gold ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 50}ms` }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <service.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-serif text-sm md:text-base text-foreground mb-1.5 md:mb-2 gold-underline inline-block">
                {service.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Note */}
        <p
          className={`text-center font-sans text-xs md:text-sm text-primary mt-8 md:mt-10 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <Sparkles className="w-4 h-4 inline-block mr-2 -mt-0.5" />
          Complete Bridal Grooming Services Available
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
