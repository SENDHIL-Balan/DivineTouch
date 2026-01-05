import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-elegant py-3'
            : 'bg-foreground/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-14 md:h-16">
            {/* Left Navigation - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('services')}
                className={`font-sans text-sm tracking-wide-luxury uppercase transition-colors gold-underline ${
                  isScrolled ? 'text-foreground/80 hover:text-primary' : 'text-background/90 hover:text-primary'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className={`font-sans text-sm tracking-wide-luxury uppercase transition-colors gold-underline ${
                  isScrolled ? 'text-foreground/80 hover:text-primary' : 'text-background/90 hover:text-primary'
                }`}
              >
                Portfolio
              </button>
            </div>

            {/* Logo + Brand Name */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 md:absolute md:left-1/2 md:-translate-x-1/2"
            >
              <div
                className={`relative rounded-full overflow-hidden border-2 transition-all duration-500 ${
                  isScrolled 
                    ? 'w-10 h-10 md:w-12 md:h-12 border-primary/30' 
                    : 'w-11 h-11 md:w-14 md:h-14 border-background/40'
                }`}
              >
                <img
                  src="/assets/logo/logo.png"
                  alt="Divine Touch Logo"
                  className={`w-full h-full object-contain transition-all duration-500 ${
                    isScrolled ? '' : 'invert brightness-0' // White logo on dark header
                  }`}
                />
              </div>
              <span
                className={`font-allura text-2xl md:text-3xl transition-colors duration-500 ${
                  isScrolled ? 'text-foreground' : 'text-background'
                }`}
              >
                Divine Touch
              </span>
            </button>

            {/* Right Navigation - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('pricing')}
                className={`font-sans text-sm tracking-wide-luxury uppercase transition-colors gold-underline ${
                  isScrolled ? 'text-foreground/80 hover:text-primary' : 'text-background/90 hover:text-primary'
                }`}
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className={`font-sans text-sm tracking-wide-luxury uppercase transition-colors gold-underline ${
                  isScrolled ? 'text-foreground/80 hover:text-primary' : 'text-background/90 hover:text-primary'
                }`}
              >
                Book Now
              </button>
              <a
                href="tel:+918015295196"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-primary hover:text-primary/80' : 'text-background/90 hover:text-background'
                }`}
              >
                <Phone className="w-5 h-5" />
                <span className="font-sans">+91 80152 95196</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu 
                className={`w-6 h-6 transition-colors duration-300 ${
                  isScrolled ? 'text-foreground' : 'text-background'
                }`} 
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div 
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-background shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <span className="font-serif text-lg text-foreground">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/80 hover:bg-muted active:scale-95 transition-all"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <nav className="px-4 py-3">
              <div className="space-y-1">
                {['services', 'portfolio', 'pricing', 'testimonials', 'booking', 'faq', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="flex items-center w-full text-left py-3.5 px-4 font-sans text-base text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors active:scale-[0.98]"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1).replace('booking', 'Book Appointment')}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <a
                  href="tel:+918015295196"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-primary text-primary-foreground font-sans text-sm rounded-lg active:scale-[0.98] transition-transform"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 80152 95196</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;