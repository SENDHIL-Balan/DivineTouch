import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles, Crown, Star, Zap, Rocket, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packages = [
  {
    name: 'Essential Bridal',
    price: '₹9999',
    description: 'Perfect for intimate ceremonies',
    icon: Sparkles,
    features: [
      'Bridal Makeup',
      'Basic Hairstyling',
      'Touch-up Kit',
      'Free Trial Session',
      '5-6 Hours Coverage',
    ],
    popular: false,
    highlight: 'BEST VALUE',
    glowColor: 'from-blue-400/40 via-indigo-500/50 to-purple-400/40',
  },
  {
    name: 'Premium Bridal',
    price: '₹19,999',
    description: 'Complete bridal transformation',
    icon: Crown,
    features: [
      'HD Bridal Makeup',
      'Premium Hairstyling',
      'Draping Assistance',
      'Touch-up Kit',
      'Free Trial Session',
      'All-Day Coverage',
      'Family Makeup (2 persons)',
    ],
    popular: true,
    highlight: 'MOST POPULAR',
    glowColor: 'from-amber-400/40 via-amber-500/50 to-amber-400/40',
  }
];

const addOns = [
  { name: 'Additional Family Makeup', price: '₹2,500/person', icon: Gift },
  { name: 'Reception Look', price: '₹8,000', icon: Zap },
  { name: 'Mehendi/Sangeet Makeup', price: '₹6,000', icon: Sparkles },
  { name: 'Engagement Makeup', price: '₹7,000', icon: Star },
  { name: 'Pre-Wedding Shoot', price: '₹4,000', icon: Rocket },
  { name: 'Baby shower', price: '₹5,000', icon: Gift },
];

const PricingSection = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const addOnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-animate-id');
            if (id) {
              setVisibleElements(prev => new Set([...prev, id]));
            }
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px' // Triggers slightly before viewport
      }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animate-id]');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleBookClick = (packageName: string, price: string) => {
    const message = `Hi Divine Touch Team, I'm interested in booking the ${packageName} package (${price}) for my wedding. Could you please share more details and availability?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918015295196?text=${encodedMessage}`, '_blank');
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-champagne/20 via-champagne/10 to-champagne/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Appears first */}
        <div className="text-center mb-16 md:mb-20">
          <div 
            data-animate-id="header-badge"
            className={`inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/10 mb-6 transition-all duration-700 ease-out ${
              visibleElements.has('header-badge') 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary font-medium">
              Investment in Beauty
            </p>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          
          <h2 
            data-animate-id="title"
            className={`font-serif text-4xl md:text-6xl text-foreground font-light mb-6 transition-all duration-800 ease-out delay-100 ${
              visibleElements.has('title') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            Choose Your <span className="font-medium italic text-primary/90">Perfect</span> Package
          </h2>
          
          <div 
            data-animate-id="underline"
            className={`w-32 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto transition-all duration-900 ease-out delay-200 ${
              visibleElements.has('underline') 
                ? 'opacity-100 scale-x-100' 
                : 'opacity-0 scale-x-0'
            }`}
          />
        </div>

        {/* Main Pricing Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20"
        >
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            const isPremium = pkg.popular;
            const cardId = `card-${index}`;
            const isCardVisible = visibleElements.has(cardId);
            const entranceDelay = index * 200;

            return (
              <div
                key={pkg.name}
                data-animate-id={cardId}
                className={`relative transition-all duration-1000 ease-out ${
                  isCardVisible 
                    ? 'opacity-100 translate-y-0' 
                    : `opacity-0 ${index === 0 ? '-translate-x-20' : 'translate-x-20'}`
                }`}
                style={{ transitionDelay: `${entranceDelay}ms` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Card glow appears on scroll */}
                <div 
                  className={`absolute -inset-4 ${pkg.glowColor} rounded-2xl blur-xl transition-all duration-1000 ease-out ${
                    isCardVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${entranceDelay + 100}ms` }}
                />

                {/* Highlight Badge */}
                <div 
                  data-animate-id={`badge-${index}`}
                  className={`absolute -top-5 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 ease-out ${
                    visibleElements.has(`badge-${index}`)
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-10 scale-95'
                  }`}
                  style={{ transitionDelay: `${entranceDelay + 300}ms` }}
                >
                  <div className={`
                    px-6 py-3 rounded-full text-sm uppercase tracking-widest font-sans font-bold backdrop-blur-sm
                    relative overflow-hidden
                    ${isPremium 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/50' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/50'
                    }
                  `}>
                    <span className="relative z-10">{pkg.highlight}</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`
                  relative rounded-2xl border-2 overflow-hidden h-full
                  bg-gradient-to-br ${isPremium 
                    ? 'from-amber-50 via-background to-amber-50/90 border-amber-300/60 shadow-xl shadow-amber-500/20' 
                    : 'from-blue-50 via-background to-indigo-50/90 border-blue-300/60 shadow-xl shadow-blue-500/20'
                  }
                  pt-12 pb-8 transition-all duration-300 ease-out backdrop-blur-sm
                `}>
                  <div className="p-8 relative">
                    {/* Icon */}
                    <div 
                      data-animate-id={`icon-${index}`}
                      className={`text-center mb-8 transition-all duration-700 ease-out ${
                        visibleElements.has(`icon-${index}`)
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-10 scale-90'
                      }`}
                      style={{ transitionDelay: `${entranceDelay + 400}ms` }}
                    >
                      <div className={`
                        relative mx-auto rounded-full flex items-center justify-center mb-6
                        w-20 h-20
                        ${isPremium 
                          ? 'bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-300 shadow-lg shadow-amber-400/30' 
                          : 'bg-gradient-to-br from-blue-100 to-indigo-50 border-2 border-blue-300 shadow-lg shadow-blue-400/30'
                        }
                      `}>
                        <Icon className={`w-10 h-10 ${isPremium ? 'text-amber-600' : 'text-blue-600'}`} />
                      </div>
                      
                      <h3 className={`font-serif text-2xl md:text-3xl mb-3 ${isPremium ? 'text-amber-700' : 'text-blue-700'}`}>
                        {pkg.name}
                      </h3>
                      <p className={`font-sans text-sm ${isPremium ? 'text-amber-600/80' : 'text-blue-600/80'}`}>
                        {pkg.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div 
                      data-animate-id={`price-${index}`}
                      className={`text-center mb-10 transition-all duration-700 ease-out ${
                        visibleElements.has(`price-${index}`)
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-8 scale-95'
                      }`}
                      style={{ transitionDelay: `${entranceDelay + 500}ms` }}
                    >
                      <span className={`
                        font-serif block relative text-4xl md:text-6xl
                        ${isPremium 
                          ? 'bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent' 
                          : 'bg-gradient-to-b from-blue-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent'
                        }
                      `}>
                        {pkg.price}
                      </span>
                    </div>

                    {/* Features - Staggered */}
                    <ul className="space-y-4 mb-10">
                      {pkg.features.map((feature, i) => {
                        const featureId = `feature-${index}-${i}`;
                        const isFeatureVisible = visibleElements.has(featureId);
                        
                        return (
                          <li 
                            key={i}
                            data-animate-id={featureId}
                            className={`flex items-start gap-3 transition-all duration-500 ease-out ${
                              isFeatureVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-4'
                            }`}
                            style={{ transitionDelay: `${entranceDelay + 600 + (i * 60)}ms` }}
                          >
                            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isPremium ? 'text-amber-600' : 'text-blue-600'}`} />
                            <span className={`font-sans text-sm ${isPremium ? 'text-amber-700/90' : 'text-blue-700/90'}`}>
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Button */}
                    <div 
                      data-animate-id={`button-${index}`}
                      className={`transition-all duration-700 ease-out ${
                        visibleElements.has(`button-${index}`)
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${entranceDelay + 1000}ms` }}
                    >
                      <Button
                        onClick={() => handleBookClick(pkg.name, pkg.price)}
                        className={`
                          w-full h-14 font-sans text-sm uppercase tracking-widest font-bold
                          relative overflow-hidden transition-all duration-300 ease-out
                          ${isPremium 
                            ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/60' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60'
                          }
                          hover:scale-105 active:scale-95
                        `}
                      >
                        <span className="relative flex items-center justify-center gap-2">
                          <span>Book This Package</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div 
          ref={addOnsRef}
          data-animate-id="addons-title"
          className={`max-w-5xl mx-auto transition-all duration-700 ease-out mb-12 ${
            visibleElements.has('addons-title')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl text-foreground mb-4">Enhance Your Experience</h3>
            <p className="font-sans text-sm text-muted-foreground max-w-2xl mx-auto">
              Customize your bridal journey with these exclusive add-ons
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              const addonId = `addon-${index}`;
              const isAddonVisible = visibleElements.has(addonId);
              
              return (
                <div
                  key={index}
                  data-animate-id={addonId}
                  className={`
                    flex items-center justify-between p-6 bg-gradient-to-br from-background/90 via-background/80 to-background/90 
                    backdrop-blur-sm rounded-xl border border-border/30
                    transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/40 hover:shadow-lg
                    ${isAddonVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                    }
                  `}
                  style={{ transitionDelay: `${200 + (index * 80)}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="font-sans text-sm font-medium text-foreground">
                      {addon.name}
                    </span>
                  </div>
                  <span className="font-serif text-base text-primary font-bold">
                    {addon.price}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Notes */}
        <div 
          data-animate-id="footer-notes"
          className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
            visibleElements.has('footer-notes')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="inline-flex flex-col items-center gap-4 bg-background/50 backdrop-blur-sm px-8 py-6 rounded-2xl border border-border/30 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
              <p className="font-sans text-sm text-muted-foreground">
                * All packages include premium international brand products.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150 flex-shrink-0" />
              <p className="font-sans text-sm text-muted-foreground">
                * Travel charges will be applied based on the service location.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300 flex-shrink-0" />
              <p className="font-sans text-sm text-muted-foreground">
                * Contact us for customized quotes and special requests.
              </p>
            </div>
          </div>
        </div>
      </div>

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

export default PricingSection;