import { useEffect, useRef, useState } from 'react';
import { Phone, Instagram, Mail, MapPin, Clock, MessageSquare, Sparkles } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+91 80152 95196',
    href: 'https://wa.me/918015295196',
    description: 'Quick chat & booking',
    color: 'from-green-50 to-green-100',
    borderColor: 'border-green-200',
    hoverColor: 'hover:bg-green-50',
    actionText: 'Chat Now',
    actionIcon: MessageSquare,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@divine_touch____',
    href: 'https://instagram.com/divine_touch____',
    description: 'Portfolio & updates',
    color: 'from-pink-50 to-rose-100',
    borderColor: 'border-pink-200',
    hoverColor: 'hover:bg-pink-50',
    actionText: 'Follow Us',
    actionIcon: Sparkles,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'makeover.divinetouch@gmail.com',
    href: 'mailto:makeover.divinetouch@gmail.com',
    description: 'Detailed inquiries',
    color: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    hoverColor: 'hover:bg-blue-50',
    actionText: 'Send Email',
    actionIcon: Mail,
  },
];

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const quickActionsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate header elements with staggered floating effect
      if (headerRef.current) {
        const elements = headerRef.current.children;
        Array.from(elements).forEach((el, index) => {
          setTimeout(() => {
            (el as HTMLElement).style.transform = 'translateY(0) rotateX(0)';
            (el as HTMLElement).style.opacity = '1';
          }, index * 150);
        });
      }

      // Stagger animations for cards with floating effect
      cardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
            card.style.filter = 'blur(0px)';
          }, 300 + (index * 200));
        }
      });

      // Animate CTA button with bounce effect
      if (ctaRef.current) {
        setTimeout(() => {
          ctaRef.current!.style.transform = 'scale(1) translateY(0)';
          ctaRef.current!.style.opacity = '1';
        }, 900);
      }

      // Animate quick action buttons with wave effect
      quickActionsRef.current.forEach((btn, index) => {
        if (btn) {
          setTimeout(() => {
            btn.style.transform = 'translateY(0) scale(1)';
            btn.style.opacity = '1';
          }, 1000 + (index * 100));
        }
      });
    }
  }, [isVisible]);

  const getWorkingHours = () => {
    const now = new Date();
    const hours = now.getHours();
    const isWorkingHours = hours >= 9 && hours < 21;

    return {
      isOpen: isWorkingHours,
      message: isWorkingHours
        ? 'Available now for consultations'
        : 'Will respond within 12 hours'
    };
  };

  const workingHours = getWorkingHours();

  // Handle WhatsApp click with proper message
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>, contact: typeof contactInfo[0]) => {
    if (contact.label === 'WhatsApp') {
      e.preventDefault();
      const message = `Hi, I'm interested in booking a bridal makeup appointment. Could you please share more details?`;
      window.open(`https://wa.me/918015295196?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  // Direct WhatsApp booking function
  const handleDirectBooking = () => {
    const message = `Hi, I would like to book a bridal appointment urgently. Please help me with the process.`;
    window.open(`https://wa.me/918015295196?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-10 md:py-16 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-amber-100/20 to-pink-100/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-green-100/20 to-blue-100/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with 3D flip animation */}
        <div 
          ref={headerRef}
          className="text-center mb-8 md:mb-12"
        >
          <p 
            className="text-xs font-medium tracking-wider text-amber-600 mb-2 transform -translate-y-4 opacity-0 transition-all duration-700 ease-out"
            style={{ 
              transitionDelay: '100ms',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(90deg)'
            }}
          >
            GET IN TOUCH
          </p>
          
          <h2 
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 transform -translate-y-4 opacity-0 transition-all duration-700 ease-out"
            style={{ 
              transitionDelay: '200ms',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(90deg)'
            }}
          >
            Let's Create Your Dream Look
          </h2>
          
          <div 
            className="w-12 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto mb-3 transform scale-x-0 opacity-0 transition-all duration-1000 ease-out origin-center"
            style={{ transitionDelay: '300ms' }}
          />
          
          <p 
            className="text-gray-600 text-sm md:text-base max-w-xl mx-auto transform -translate-y-4 opacity-0 transition-all duration-700 ease-out"
            style={{ 
              transitionDelay: '400ms',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(90deg)'
            }}
          >
            Connect with us for bridal consultations, bookings, or any questions about our services
          </p>
        </div>

        {/* Status Banner with glow animation */}
        <div className="mb-6 md:mb-8 max-w-md mx-auto">
          <div 
            className={`
              flex items-center gap-3 p-3 rounded-lg border transform -translate-y-2 opacity-0 transition-all duration-700 ease-out
              ${workingHours.isOpen 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
              }
            `}
            style={{ 
              transitionDelay: '500ms',
              animation: isVisible ? 'slideUpBounce 0.7s ease-out forwards 500ms' : 'none'
            }}
          >
            <div className={`w-3 h-3 rounded-full ${workingHours.isOpen ? 'bg-green-500 animate-ping' : 'bg-amber-500'} relative`}>
              <div className={`absolute inset-0 rounded-full ${workingHours.isOpen ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
            </div>
            <Clock className={`w-4 h-4 flex-shrink-0 ${workingHours.isOpen ? 'text-green-600' : 'text-amber-600'}`} />
            <span className="text-sm font-medium">
              {workingHours.message}
            </span>
          </div>
        </div>

        {/* Contact Cards with floating and glow effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
          {contactInfo.map((contact, index) => (
            <div
              key={contact.label}
              className="w-full"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                ref={el => cardsRef.current[index] = el}
                className={`
                  bg-white rounded-xl
                  border ${contact.borderColor}
                  p-4 md:p-5
                  h-full
                  flex flex-col
                  transform translate-y-8 scale-95 opacity-0 blur-sm
                  transition-all duration-700 ease-out
                  relative
                  overflow-hidden
                  group
                  ${hoveredCard === index ? 'shadow-2xl scale-[1.02]' : 'shadow-lg hover:shadow-xl'}
                  ${contact.label === 'WhatsApp' ? 'hover:shadow-green-200/50' :
                    contact.label === 'Instagram' ? 'hover:shadow-pink-200/50' :
                    'hover:shadow-blue-200/50'}
                `}
                style={{
                  transitionDelay: `${300 + (index * 200)}ms`,
                  transitionProperty: 'transform, opacity, box-shadow, scale, filter'
                }}
              >
                {/* Glow effect on hover */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  ${contact.label === 'WhatsApp' ? 'bg-gradient-to-br from-green-50/50 to-transparent' :
                    contact.label === 'Instagram' ? 'bg-gradient-to-br from-pink-50/50 to-transparent' :
                    'bg-gradient-to-br from-blue-50/50 to-transparent'}
                `} />
                
                {/* Icon and Label */}
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div 
                    className={`
                      w-10 h-10 rounded-full ${contact.color} 
                      flex items-center justify-center flex-shrink-0 
                      transition-all duration-500 group-hover:scale-110
                      ${hoveredCard === index ? 'shadow-md' : ''}
                    `}
                  >
                    <contact.icon 
                      className={`w-5 h-5 transition-all duration-500 group-hover:scale-125 ${
                        contact.label === 'WhatsApp' ? 'text-green-600 group-hover:text-green-700' :
                        contact.label === 'Instagram' ? 'text-pink-600 group-hover:text-pink-700' :
                        'text-blue-600 group-hover:text-blue-700'
                      }`} 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:scale-105 transition-transform duration-300">
                      {contact.label}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5 group-hover:text-gray-600 transition-colors duration-300">
                      {contact.description}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-3 flex-1 relative z-10">
                  <p className="text-gray-900 font-medium text-sm md:text-base break-words group-hover:translate-x-1 transition-transform duration-300">
                    {contact.value}
                  </p>
                </div>

                {/* Action Button */}
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleWhatsAppClick(e, contact)}
                  className={`
                    flex items-center justify-center gap-2
                    px-3 py-2.5 rounded-lg
                    text-sm font-medium
                    transform transition-all duration-500
                    relative z-10
                    group-hover:gap-3
                    overflow-hidden
                    ${contact.label === 'WhatsApp' ? 
                      'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25' :
                      contact.label === 'Instagram' ? 
                      'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-pink-500/25' :
                      'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                    }
                  `}
                >
                  {/* Button shine effect */}
                  <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/50 group-hover:animate-shine transition-all duration-700" />
                  
                  <contact.actionIcon className="w-4 h-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                  <span className="relative transition-all duration-500 group-hover:tracking-wider">
                    {contact.actionText}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Service Areas with slide-in animation */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-10">
          <div 
            className="bg-gradient-to-br from-white to-amber-50/30 rounded-xl p-4 md:p-5 border border-amber-200 transform -translate-x-full opacity-0 transition-all duration-1000 ease-out"
            style={{ 
              transitionDelay: '800ms',
              animation: isVisible ? 'slideInRight 0.8s ease-out 800ms forwards' : 'none'
            }}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 flex items-center justify-center flex-shrink-0 transition-all duration-500 hover:scale-110 hover:rotate-12 group">
                <MapPin className="w-5 h-5 text-amber-600 transition-transform duration-500 group-hover:scale-125" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-3 transform transition-all duration-500 hover:translate-x-1">
                  Service Areas
                </h3>
                <ul className="space-y-2">
                  {['Chennai (Certain areas)', 'Cuddalore (All areas)', 'Pondicherry (Certain areas)'].map((area, index) => (
                    <li 
                      key={index} 
                      className="flex items-center gap-2 transform -translate-x-4 opacity-0 transition-all duration-700 ease-out"
                      style={{ 
                        transitionDelay: `${900 + (index * 150)}ms`,
                        animation: isVisible ? 'slideInRight 0.6s ease-out forwards' : 'none',
                        animationDelay: `${900 + (index * 150)}ms`
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex-shrink-0 animate-pulse" style={{ animationDelay: `${index * 200}ms` }} />
                      <span className="text-gray-700 text-sm md:text-base transition-all duration-300 hover:text-amber-700 hover:translate-x-1">
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Call to Action with pulse and glow */}
        <div className="text-center relative">
          <div className="mb-4">
            <p 
              className="text-gray-700 font-medium text-base md:text-lg mb-1 transform translate-y-2 opacity-0 transition-all duration-700 ease-out"
              style={{ 
                transitionDelay: '1150ms',
                animation: isVisible ? 'slideUpBounce 0.7s ease-out 1150ms forwards' : 'none'
              }}
            >
              Ready to book your appointment?
            </p>
            <p 
              className="text-gray-500 text-xs md:text-sm transform translate-y-2 opacity-0 transition-all duration-700 ease-out"
              style={{ 
                transitionDelay: '1250ms',
                animation: isVisible ? 'slideUpBounce 0.7s ease-out 1250ms forwards' : 'none'
              }}
            >
              Click below to message us directly on WhatsApp
            </p>
          </div>
          
          <div className="relative inline-block">
            {/* Outer glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse" />
            
            <button
              ref={ctaRef}
              onClick={handleDirectBooking}
              className="
                relative
                inline-flex items-center justify-center gap-3
                px-8 py-4
                bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
                text-white font-bold text-base md:text-lg
                rounded-full
                shadow-2xl
                transform scale-95 translate-y-4 opacity-0
                transition-all duration-700 ease-out
                hover:shadow-green-500/30
                hover:gap-4
                hover:scale-105
                active:scale-95
                w-full max-w-sm
                mx-auto
                group
                overflow-hidden
                z-10
              "
              style={{ 
                transitionDelay: '1350ms',
                animation: isVisible ? 'scaleInBounce 0.7s ease-out 1350ms forwards' : 'none'
              }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
              
              <MessageSquare className="w-5 h-5 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
              <span className="relative transition-all duration-500 group-hover:tracking-wider">
                Book Appointment on WhatsApp
              </span>
              <Sparkles className="w-5 h-5 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
            </button>
          </div>
          
          <p 
            className="text-gray-500 text-xs mt-3 transform translate-y-2 opacity-0 transition-all duration-700 ease-out"
            style={{ 
              transitionDelay: '1450ms',
              animation: isVisible ? 'slideUpBounce 0.7s ease-out 1450ms forwards' : 'none'
            }}
          >
            Fastest response time - Usually within minutes
          </p>
        </div>

        {/* Quick Action Buttons with wave animation */}
        <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-xl mx-auto">
          {[
            { text: 'Price List', message: "Hi, I need a price list for your bridal makeup packages" },
            { text: 'Availability', message: "Hi, I want to check your availability for next month" },
            { text: 'Ask Questions', message: "Hi, I have questions about your services" }
          ].map((action, index) => (
            <button
              key={index}
              ref={el => quickActionsRef.current[index] = el}
              onClick={() => {
                window.open(`https://wa.me/918015295196?text=${encodeURIComponent(action.message)}`, '_blank');
              }}
              className="
                bg-gradient-to-b from-white to-gray-50 
                border border-gray-300 text-gray-700 rounded-xl py-3 text-sm font-medium
                transform translate-y-4 scale-95 opacity-0
                transition-all duration-500 ease-out
                hover:from-amber-50 hover:to-amber-100
                hover:border-amber-300
                hover:text-amber-800
                hover:scale-105
                hover:shadow-lg
                active:scale-95
                relative
                overflow-hidden
                group
              "
              style={{
                transitionDelay: `${1500 + (index * 150)}ms`,
                animation: isVisible ? 'scaleInBounce 0.5s ease-out forwards' : 'none',
                animationDelay: `${1500 + (index * 150)}ms`
              }}
            >
              {/* Ripple effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="relative transition-all duration-300 group-hover:tracking-wide">
                {action.text}
              </span>
            </button>
          ))}
        </div>

        {/* Contact Note with fade-in animation */}
        <div 
          className="mt-6 md:mt-8 text-center transform translate-y-4 opacity-0 transition-all duration-1000 ease-out"
          style={{ 
            transitionDelay: '2000ms',
            animation: isVisible ? 'fadeInUp 1s ease-out 2000ms forwards' : 'none'
          }}
        >
          <p className="text-gray-400 text-xs inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Response time: 5-15 minutes during business hours (9 AM - 9 PM)
          </p>
        </div>
      </div>

      {/* Add custom animations to global styles */}
      <style >{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideUpBounce {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes scaleInBounce {
          0% {
            transform: scale(0.95) translateY(10px);
            opacity: 0;
          }
          50% {
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(10px) rotate(-1deg);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-shine {
          animation: shine 1.5s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        /* Smooth transitions for all elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;