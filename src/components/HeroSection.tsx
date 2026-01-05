import { useEffect, useState } from 'react';
import { Calendar, Sparkles, ChevronDown } from 'lucide-react';

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

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero/hero-main.webp"
          alt="Luxury Bridal Makeup"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 left-8 hidden lg:block animate-float-slow">
        <div className="w-16 h-16 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center border border-primary/20">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
      </div>

      <div className="absolute top-8 right-8 hidden lg:block animate-float-slower">
        <div className="w-14 h-14 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-14 md:pt-0">
        {/* Decorative Top Text */}
        <div
          className={`mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full border border-background/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-sans text-xs uppercase tracking-widest text-background/90">
              Premium Bridal Makeover
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-background font-medium leading-tight mb-4 md:mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}
        >
          Experience Beauty
          <span className="block text-transparent bg-clip-text gradient-gold mt-2">
            Redefined
          </span>
        </h1>

        {/* Supporting Text */}
        <p
          className={`font-sans text-base md:text-lg text-background/90 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Transform your special day with premium bridal makeup artistry, 
          crafted to enhance your natural beauty.
        </p>

        {/* Stats Bar */}
        <div
          className={`flex flex-wrap justify-center gap-6 mb-8 md:mb-10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '150+', label: 'Happy Brides' },
            { value: '5+', label: 'Years Experience' },
            
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center px-4"
            >
              <div className="font-serif text-2xl md:text-3xl text-background font-bold">
                {stat.value}
              </div>
              <div className="font-sans text-xs uppercase tracking-widest text-background/70 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={scrollToBooking}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 gradient-gold text-primary-foreground font-sans text-sm uppercase tracking-wide-luxury rounded-sm shadow-gold hover:shadow-elegant transition-all duration-300 active:scale-95 min-w-[200px]"
          >
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Book Your Bridal Slot</span>
          </button>

          <button
            onClick={scrollToServices}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-background/20 backdrop-blur-sm text-background font-sans text-sm uppercase tracking-wide-luxury rounded-sm border border-background/30 hover:bg-background/30 hover:border-background/50 transition-all duration-300 active:scale-95 min-w-[200px]"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>View Services</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 group animate-bounce-slow"
        aria-label="Scroll to services"
      >
        <span className="font-sans text-xs text-background/70 uppercase tracking-widest group-hover:text-background transition-colors">
          Explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-background/40 flex justify-center pt-2 group-hover:border-background/60 transition-colors">
          <ChevronDown className="w-4 h-4 text-background/60 group-hover:text-background/80 animate-pulse" />
        </div>
      </button>

      {/* Add CSS animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;