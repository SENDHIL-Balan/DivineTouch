import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero/hero-main.jpg"
          alt="Luxury Bridal Makeup"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto pt-14 md:pt-0">
        {/* Main Headline */}
        <h1
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-background font-medium leading-tight mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
        >
          Experience Beauty Redefined
        </h1>

        {/* Supporting Text */}
        <p
          className={`font-sans text-sm md:text-base text-background/90 max-w-md mx-auto leading-relaxed mb-6 md:mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Transform your special day with premium bridal makeup artistry, crafted to enhance your natural beauty.
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={scrollToBooking}
            className="inline-block px-8 py-4 gradient-gold text-primary-foreground font-sans text-sm uppercase tracking-wide-luxury rounded-sm shadow-gold hover:shadow-elegant transition-all duration-300 active:scale-95"
          >
            Book Your Bridal Slot
          </button>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-5 h-8 rounded-full border-2 border-background/40 flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-background/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
