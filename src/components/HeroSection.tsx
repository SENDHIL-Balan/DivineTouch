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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero/hero-main.webp"
          alt="Luxury Bridal Makeup"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Randomly blinking sparkles - lightweight, pure CSS */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-primary/80 rounded-full sparkle sparkle-${i + 1}`}
          style={{
            top: `${10 + (i % 4) * 25}%`,
            left: `${5 + (i % 5) * 20}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Floating decorative elements */}
      <div className="absolute top-12 left-12 hidden lg:block animate-float-slow opacity-60">
        <div className="w-20 h-20 rounded-full bg-primary/5 backdrop-blur-md flex items-center justify-center border border-primary/10">
          <Sparkles className="w-8 h-8 text-primary/80" />
        </div>
      </div>

      <div className="absolute top-32 right-12 hidden lg:block animate-float-slower opacity-60">
        <div className="w-16 h-16 rounded-full bg-primary/5 backdrop-blur-md flex items-center justify-center border border-primary/10">
          <div className="w-3 h-3 rounded-full bg-primary/80 animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Top badge */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-3 bg-background/5 backdrop-blur-md px-6 py-3 rounded-full border border-background/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-sans text-sm uppercase tracking-widest text-background/90">
              Premium Bridal Makeover
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-background font-light leading-none mb-6 transition-all duration-1000 delay-200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.7)', letterSpacing: '-0.02em' }}
        >
          Experience Beauty
          <span className="block text-transparent bg-clip-text gradient-gold mt-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl sparkle-text">
            Redefined
          </span>
        </h1>

        {/* Supporting text */}
        <p
          className={`font-sans text-lg md:text-xl lg:text-2xl text-background/90 max-w-3xl mx-auto leading-relaxed mb-12 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Transform your special day with premium bridal makeup artistry, 
          crafted to enhance your natural beauty.
        </p>

        {/* Stats */}
        <div
          className={`flex justify-center items-center gap-12 md:gap-20 mb-16 transition-all duration-1000 delay-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { value: '150+', label: 'Happy Brides' },
            { value: '5+', label: 'Years Experience' },
          ].map((stat, index, array) => (
            <div key={index} className="relative text-center">
              <div className="font-serif text-4xl md:text-5xl text-background font-medium">
                {stat.value}
              </div>
              <div className="font-sans text-sm uppercase tracking-widest text-background/70 mt-2">
                {stat.label}
              </div>
              {index < array.length - 1 && (
                <div className="absolute right-[-24px] md:right-[-40px] top-1/2 -translate-y-1/2 w-px h-12 bg-background/20" />
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button
            onClick={scrollToBooking}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 gradient-gold text-primary-foreground font-sans text-base uppercase tracking-wider rounded-none shadow-2xl hover:shadow-gold/50 transition-all duration-500 hover:-translate-y-1 active:scale-98 min-w-[240px] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <span>Book Your Bridal Slot</span>
          </button>

          <button
            onClick={scrollToServices}
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent text-background font-sans text-base uppercase tracking-wider rounded-none border-2 border-background/40 hover:border-background/80 backdrop-blur-sm hover:bg-background/10 transition-all duration-500 hover:-translate-y-1 active:scale-98 min-w-[240px]"
          >
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>View Services</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 group"
        aria-label="Scroll to services"
      >
        <span className="font-sans text-sm text-background/60 uppercase tracking-widest group-hover:text-background/90 transition-colors duration-300">
          Explore
        </span>
        <div className="w-8 h-14 rounded-full border border-background/30 flex justify-center items-start pt-3 group-hover:border-background/60 transition-colors duration-300">
          <ChevronDown className="w-5 h-5 text-background/50 group-hover:text-background/80 animate-pulse" />
        </div>
      </button>

      {/* Fixed: Replaced <style jsx> with regular <style> to avoid TypeScript error */}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes sparkle-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; text-shadow: 0 0 20px #ffd700; }
        }
        .sparkle {
          pointer-events: none;
          animation: sparkle linear infinite;
        }
        .sparkle-text {
          animation: sparkle-text 4s ease-in-out infinite;
        }
        .sparkle-1 { animation-duration: 3s; }
        .sparkle-2 { animation-duration: 4.5s; }
        .sparkle-3 { animation-duration: 3.8s; }
        .sparkle-4 { animation-duration: 5s; }
        .sparkle-5 { animation-duration: 2.8s; }
        .sparkle-6 { animation-duration: 4.2s; }
        .sparkle-7 { animation-duration: 3.4s; }
        .sparkle-8 { animation-duration: 5.5s; }
        .sparkle-9 { animation-duration: 3.2s; }
        .sparkle-10 { animation-duration: 4.8s; }
        .sparkle-11 { animation-duration: 3.6s; }
        .sparkle-12 { animation-duration: 4.4s; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;