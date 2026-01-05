import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles, Crown, Star, Zap, Rocket, Gift, Award } from 'lucide-react';
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
    glowColor: 'from-blue-400/40 via-indigo-500/50 to-purple-400/40', // Blue/Purple glow
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
    glowColor: 'from-amber-400/40 via-amber-500/50 to-amber-400/40', // Amber glow
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
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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
      className="py-12 md:py-20 bg-champagne/30 relative overflow-hidden"
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Faster fade-in */}
        <div className="text-center mb-10 md:mb-14">
          <p className={`font-sans text-xs tracking-luxury uppercase text-primary mb-3 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            Investment in Beauty
          </p>
          <h2 className={`font-serif text-2xl md:text-4xl lg:text-5xl text-foreground transition-all duration-600 ease-out delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Bridal Packages
          </h2>
          <div className={`w-16 h-0.5 gradient-gold mx-auto mt-4 transition-all duration-500 ease-out delay-150 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
          <p className={`font-sans text-sm text-muted-foreground mt-4 max-w-2xl mx-auto transition-all duration-600 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Choose the perfect package for your special day. All packages include premium products and expert artistry.
          </p>
        </div>

        {/* Pricing Cards - Two cards centered */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            const isPremium = pkg.popular;
            const isEssential = !isPremium;
            
            return (
              <div
                key={pkg.name}
                className={`relative transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow effects for both packages */}
                <>
                  {/* Outer glow ring */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${pkg.glowColor} rounded-2xl blur-xl opacity-60 animate-premium-glow`}></div>
                  
                  {/* Pulsing inner glow */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl blur-lg animate-premium-pulse"></div>
                  
                  {/* Floating particles */}
                  <div className="absolute -inset-4 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1.5 h-1.5 rounded-full animate-premium-particle ${isPremium ? 'bg-amber-300' : 'bg-blue-300'}`}
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Corner accents */}
                  <div className={`absolute -top-2 -left-2 w-4 h-4 rounded-full blur-sm opacity-70 animate-pulse ${isPremium ? 'bg-gradient-to-br from-amber-400 to-amber-300' : 'bg-gradient-to-br from-blue-400 to-indigo-300'}`}></div>
                  <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm opacity-70 animate-pulse delay-300 ${isPremium ? 'bg-gradient-to-br from-amber-400 to-amber-300' : 'bg-gradient-to-br from-blue-400 to-indigo-300'}`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-4 h-4 rounded-full blur-sm opacity-70 animate-pulse delay-600 ${isPremium ? 'bg-gradient-to-br from-amber-400 to-amber-300' : 'bg-gradient-to-br from-blue-400 to-indigo-300'}`}></div>
                  <div className={`absolute -bottom-2 -right-2 w-4 h-4 rounded-full blur-sm opacity-70 animate-pulse delay-900 ${isPremium ? 'bg-gradient-to-br from-amber-400 to-amber-300' : 'bg-gradient-to-br from-blue-400 to-indigo-300'}`}></div>
                </>

                {/* Highlight Badge with glow */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
                  <div className={`
                    px-6 py-3 rounded-full text-xs uppercase tracking-widest font-sans font-bold backdrop-blur-sm
                    transition-all duration-300 ease-out relative overflow-hidden
                    ${isPremium 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/40' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/40'
                    }
                    ${hoveredCard === index ? 'scale-105 shadow-xl' : 'scale-100'}
                  `}>
                    <div className={`absolute inset-0 animate-premium-shine ${isPremium ? 'bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20' : 'bg-gradient-to-r from-blue-500/20 via-indigo-400/30 to-blue-500/20'}`}></div>
                    <div className={`absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isPremium ? 'bg-gradient-to-r from-amber-400/20 to-amber-300/20' : 'bg-gradient-to-r from-blue-400/20 to-indigo-300/20'}`}></div>
                    <span className="relative z-10">{pkg.highlight}</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`
                  relative rounded-2xl border-2 overflow-hidden h-full group
                  bg-gradient-to-br ${isPremium 
                    ? 'from-amber-50 via-background to-amber-50/90 border-amber-300/60 shadow-2xl shadow-amber-500/30' 
                    : 'from-blue-50 via-background to-indigo-50/90 border-blue-300/60 shadow-2xl shadow-blue-500/30'
                  }
                  pt-8 pb-6 transition-all duration-400 ease-out
                  ${hoveredCard === index ? (isPremium ? 'shadow-3xl shadow-amber-500/40 -translate-y-4 scale-105' : 'shadow-3xl shadow-blue-500/40 -translate-y-4 scale-105') : ''}
                `}>
                  {/* Animated border glow */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${pkg.glowColor} bg-clip-border -m-1 animate-premium-border`}></div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                  <div className="p-6 md:p-8 relative">
                    {/* Icon with glow effect */}
                    <div className="text-center mb-6">
                      <div className={`
                        relative mx-auto rounded-full flex items-center justify-center mb-4
                        w-20 h-20
                        transition-all duration-400 ease-out
                        ${isPremium 
                          ? 'bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-300 shadow-lg shadow-amber-400/30' 
                          : 'bg-gradient-to-br from-blue-100 to-indigo-50 border-2 border-blue-300 shadow-lg shadow-blue-400/30'
                        }
                        group-hover:scale-110
                      `}>
                        <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isPremium ? 'bg-amber-300/20' : 'bg-blue-300/20'}`}></div>
                        <div className={`absolute -inset-2 blur-sm animate-pulse ${isPremium ? 'bg-gradient-to-r from-amber-400/10 to-amber-300/10' : 'bg-gradient-to-r from-blue-400/10 to-indigo-300/10'}`}></div>
                        <Icon className={`transition-transform duration-400 ease-out group-hover:scale-110 ${isPremium ? 'w-10 h-10 text-amber-600 drop-shadow-sm' : 'w-10 h-10 text-blue-600 drop-shadow-sm'}`} />
                      </div>
                      
                      <h3 className={`font-serif mb-2 transition-colors duration-300 relative ${isPremium ? 'text-2xl md:text-3xl text-amber-700' : 'text-2xl md:text-3xl text-blue-700'}`}>
                        {pkg.name}
                        <Sparkles className={`absolute -top-2 -right-4 w-4 h-4 animate-sparkle ${isPremium ? 'text-amber-500' : 'text-blue-500'}`} />
                      </h3>
                      <p className={`font-sans text-sm ${isPremium ? 'text-amber-600/80' : 'text-blue-600/80'}`}>
                        {pkg.description}
                      </p>
                    </div>

                    {/* Price with glowing effect */}
                    <div className="text-center mb-8 relative">
                      <div className={`inline-block transition-all duration-400 ease-out group-hover:scale-110 animate-premium-price`}>
                        <span className={`
                          font-serif block relative
                          ${isPremium 
                            ? 'text-4xl md:text-6xl bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent drop-shadow-sm' 
                            : 'text-4xl md:text-6xl bg-gradient-to-b from-blue-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent drop-shadow-sm'
                          }
                        `}>
                          {pkg.price}
                          <div className={`absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isPremium ? 'bg-gradient-to-r from-amber-400/10 via-amber-300/15 to-amber-400/10' : 'bg-gradient-to-r from-blue-400/10 via-indigo-300/15 to-blue-400/10'}`}></div>
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li 
                          key={i}
                          className="flex items-start gap-3 group/feature"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(-12px)',
                            transition: `opacity 0.4s ease-out ${150 + i * 40}ms, transform 0.4s ease-out ${150 + i * 40}ms`
                          }}
                        >
                          <div className="relative">
                            <div className={`absolute inset-0 rounded-full scale-0 group-hover/feature:scale-100 transition-transform duration-300 ${isPremium ? 'bg-amber-300/20' : 'bg-blue-300/20'}`}></div>
                            <Check className={`relative w-5 h-5 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/feature:scale-110 ${isPremium ? 'text-amber-600 drop-shadow-sm' : 'text-blue-600 drop-shadow-sm'}`} />
                          </div>
                          <span className={`font-sans text-sm transition-colors duration-300 ${isPremium ? 'text-amber-700/90' : 'text-blue-700/90'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Button with enhanced glow */}
                    <Button
                      onClick={() => handleBookClick(pkg.name, pkg.price)}
                      className={`
                        w-full h-14 font-sans text-sm uppercase tracking-widest font-bold
                        relative overflow-hidden transition-all duration-300 ease-out group/button
                        ${isPremium 
                          ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-xl shadow-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/60 animate-premium-button' 
                          : 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/60 animate-premium-button'
                        }
                        hover:scale-105 active:scale-98
                      `}
                    >
                      {/* Button shine effect */}
                      <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-500 ease-out"></span>
                      
                      {/* Button glow effect */}
                      <>
                        <div className={`absolute -inset-1 rounded-lg blur-sm opacity-0 group-hover/button:opacity-100 transition-opacity duration-500 ${isPremium ? 'bg-gradient-to-r from-amber-400/30 to-amber-300/30' : 'bg-gradient-to-r from-blue-400/30 to-indigo-300/30'}`}></div>
                        <Sparkles className={`absolute -top-1 -left-1 w-3 h-3 text-white/70 animate-sparkle ${isPremium ? '' : 'text-blue-200'}`} />
                        <Sparkles className={`absolute -top-1 -right-1 w-3 h-3 text-white/70 animate-sparkle delay-300 ${isPremium ? '' : 'text-blue-200'}`} />
                      </>
                      
                      <span className="relative flex items-center justify-center gap-2">
                        <span>Book This Package</span>
                        <svg className="w-4 h-4 opacity-0 group-hover/button:opacity-100 translate-x-0 group-hover/button:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons - Faster entrance */}
        <div className={`max-w-4xl mx-auto transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '400ms' }}>
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl text-foreground mb-3">Additional Services</h3>
            <p className="font-sans text-sm text-muted-foreground max-w-2xl mx-auto">
              Customize your experience with these premium add-ons
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between p-5 bg-background/80 backdrop-blur-sm rounded-xl border border-border/30
                    transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-md
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: `${500 + index * 60}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-sans text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                      {addon.name}
                    </span>
                  </div>
                  <span className="font-serif text-sm text-primary font-bold transition-transform duration-300 group-hover:scale-110">
                    {addon.price}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className={`mt-12 text-center transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-flex flex-col items-center gap-4 bg-background/50 backdrop-blur-sm px-8 py-6 rounded-2xl border border-border/30 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <p className="font-sans text-sm text-muted-foreground">* All packages include premium international brand products.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
              <p className="font-sans text-sm text-muted-foreground">* Travel charges will be applied based on the service location.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
              <p className="font-sans text-sm text-muted-foreground">* Contact us for customized quotes and special requests.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations for glowing effects */}
      <style>{`
        @keyframes premiumGlow {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.02);
          }
        }
        
        @keyframes premiumPulse {
          0%, 100% { 
            opacity: 0.2;
          }
          50% { 
            opacity: 0.4;
          }
        }
        
        @keyframes premiumParticle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes premiumBorder {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        @keyframes premiumPrice {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes premiumButton {
          0%, 100% {
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 15px 35px rgba(59, 130, 246, 0.6);
          }
        }
        
        @keyframes premiumButtonAmber {
          0%, 100% {
            box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
          }
          50% {
            box-shadow: 0 15px 35px rgba(245, 158, 11, 0.6);
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }
        
        @keyframes premiumShine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
        
        .animate-premium-glow {
          animation: premiumGlow 3s ease-in-out infinite;
        }
        
        .animate-premium-pulse {
          animation: premiumPulse 2s ease-in-out infinite;
        }
        
        .animate-premium-particle {
          animation: premiumParticle 3s ease-in-out infinite;
        }
        
        .animate-premium-border {
          animation: premiumBorder 2s ease-in-out infinite;
        }
        
        .animate-premium-price {
          animation: premiumPrice 3s ease-in-out infinite;
        }
        
        .animate-premium-button {
          animation: premiumButton 2s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-premium-shine {
          animation: premiumShine 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;