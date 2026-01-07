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

  useEffect(() => {
    if (isVisible) {
      // Stagger animations for cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
          }, index * 150);
        }
      });

      // Animate header elements
      if (headerRef.current) {
        const elements = headerRef.current.children;
        Array.from(elements).forEach((el, index) => {
          setTimeout(() => {
            (el as HTMLElement).style.transform = 'translateY(0)';
            (el as HTMLElement).style.opacity = '1';
          }, index * 100);
        });
      }

      // Animate CTA button
      if (ctaRef.current) {
        setTimeout(() => {
          ctaRef.current!.style.transform = 'scale(1)';
          ctaRef.current!.style.opacity = '1';
        }, 600);
      }

      // Animate quick action buttons
      quickActionsRef.current.forEach((btn, index) => {
        if (btn) {
          setTimeout(() => {
            btn.style.transform = 'translateY(0)';
            btn.style.opacity = '1';
          }, 700 + (index * 50));
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
      className="py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header with animation */}
        <div 
          ref={headerRef}
          className="text-center mb-8 md:mb-12"
        >
          <p 
            className="text-xs font-medium tracking-wider text-amber-600 mb-2 transform -translate-y-4 opacity-0 transition-all duration-500"
            style={{ transitionDelay: '100ms' }}
          >
            GET IN TOUCH
          </p>
          
          <h2 
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 transform -translate-y-4 opacity-0 transition-all duration-500"
            style={{ transitionDelay: '200ms' }}
          >
            Let's Create Your Dream Look
          </h2>
          
          <div 
            className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-3 transform scale-x-0 opacity-0 transition-all duration-500"
            style={{ transitionDelay: '300ms' }}
          />
          
          <p 
            className="text-gray-600 text-sm md:text-base max-w-xl mx-auto transform -translate-y-4 opacity-0 transition-all duration-500"
            style={{ transitionDelay: '400ms' }}
          >
            Connect with us for bridal consultations, bookings, or any questions about our services
          </p>
        </div>

        {/* Status Banner with animation */}
        <div className="mb-6 md:mb-8 max-w-md mx-auto">
          <div 
            className={`flex items-center gap-3 p-3 rounded-lg border transform -translate-y-2 opacity-0 transition-all duration-500 ${workingHours.isOpen ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}
            style={{ 
              transitionDelay: '500ms',
              animation: isVisible ? 'slideUp 0.5s ease-out forwards' : 'none'
            }}
          >
            <div className={`w-2 h-2 rounded-full ${workingHours.isOpen ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">
              {workingHours.message}
            </span>
          </div>
        </div>

        {/* Contact Cards - Stack on Mobile with animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
          {contactInfo.map((contact, index) => (
            <div
              key={contact.label}
              className="w-full"
            >
              <div
                ref={el => cardsRef.current[index] = el}
                className={`
                  bg-white rounded-xl
                  border ${contact.borderColor}
                  p-4 md:p-5
                  h-full
                  flex flex-col
                  transform translate-y-8 opacity-0
                  transition-all duration-500 ease-out
                  hover:scale-[1.02]
                  hover:shadow-lg
                  active:scale-[0.98]
                `}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transitionProperty: 'transform, opacity, box-shadow, scale'
                }}
              >
                {/* Icon and Label */}
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className={`w-10 h-10 rounded-full ${contact.color} flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110`}
                  >
                    <contact.icon className={`w-5 h-5 transition-transform duration-300 hover:scale-110 ${
                      contact.label === 'WhatsApp' ? 'text-green-600' :
                      contact.label === 'Instagram' ? 'text-pink-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {contact.label}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {contact.description}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-3 flex-1">
                  <p className="text-gray-900 font-medium text-sm md:text-base break-words">
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
                    transform transition-all duration-300
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    hover:shadow-md
                    ${contact.label === 'WhatsApp' ? 'bg-green-500 hover:bg-green-600 text-white' :
                      contact.label === 'Instagram' ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white' :
                      'bg-blue-500 hover:bg-blue-600 text-white'}
                  `}
                >
                  <contact.actionIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  {contact.actionText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Service Areas with animation */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-10">
          <div 
            className="bg-white rounded-xl p-4 md:p-5 border border-gray-200 transform translate-y-4 opacity-0 transition-all duration-500"
            style={{ 
              transitionDelay: '650ms',
              animation: isVisible ? 'slideUp 0.5s ease-out 650ms forwards' : 'none'
            }}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Service Areas
                </h3>
                <ul className="space-y-2">
                  {['Chennai (Certain areas)', 'Cuddalore (All areas)', 'Pondicherry (Certain areas)'].map((area, index) => (
                    <li 
                      key={index} 
                      className="flex items-center gap-2 transform translate-x-4 opacity-0 transition-all duration-500"
                      style={{ 
                        transitionDelay: `${750 + (index * 100)}ms`,
                        animation: isVisible ? 'slideInRight 0.5s ease-out forwards' : 'none',
                        animationDelay: `${750 + (index * 100)}ms`
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Call to Action with animation */}
        <div className="text-center">
          <div className="mb-4">
            <p 
              className="text-gray-700 font-medium text-base md:text-lg mb-1 transform translate-y-2 opacity-0 transition-all duration-500"
              style={{ 
                transitionDelay: '1050ms',
                animation: isVisible ? 'slideUp 0.5s ease-out 1050ms forwards' : 'none'
              }}
            >
              Ready to book your appointment?
            </p>
            <p 
              className="text-gray-500 text-xs md:text-sm transform translate-y-2 opacity-0 transition-all duration-500"
              style={{ 
                transitionDelay: '1150ms',
                animation: isVisible ? 'slideUp 0.5s ease-out 1150ms forwards' : 'none'
              }}
            >
              Click below to message us directly on WhatsApp
            </p>
          </div>
          
          <button
            ref={ctaRef}
            onClick={handleDirectBooking}
            className="
              inline-flex items-center justify-center gap-3
              px-6 py-4
              bg-gradient-to-r from-green-500 to-green-600
              text-white font-bold text-base
              rounded-xl
              shadow-lg
              transform scale-95 opacity-0
              transition-all duration-500
              hover:shadow-xl
              hover:scale-[1.02]
              active:scale-[0.98]
              w-full max-w-sm
              mx-auto
              animate-pulse-slow
            "
            style={{ 
              transitionDelay: '1250ms',
              animation: isVisible ? 'scaleIn 0.5s ease-out 1250ms forwards' : 'none'
            }}
          >
            <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            Book Appointment on WhatsApp
            <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          </button>
          
          <p 
            className="text-gray-500 text-xs mt-3 transform translate-y-2 opacity-0 transition-all duration-500"
            style={{ 
              transitionDelay: '1350ms',
              animation: isVisible ? 'slideUp 0.5s ease-out 1350ms forwards' : 'none'
            }}
          >
            Fastest response time - Usually within minutes
          </p>
        </div>

        {/* Quick Action Buttons with animation */}
        <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
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
                bg-white border border-gray-300 text-gray-700 rounded-lg py-3 text-sm font-medium
                transform translate-y-4 opacity-0
                transition-all duration-300
                hover:bg-gray-50
                hover:border-amber-300
                hover:text-amber-700
                hover:scale-[1.02]
                active:scale-[0.98]
              "
              style={{
                transitionDelay: `${1400 + (index * 50)}ms`,
                animation: isVisible ? 'slideUp 0.3s ease-out forwards' : 'none',
                animationDelay: `${1400 + (index * 50)}ms`
              }}
            >
              {action.text}
            </button>
          ))}
        </div>

        {/* Contact Note with animation */}
        <div 
          className="mt-6 md:mt-8 text-center transform translate-y-2 opacity-0 transition-all duration-500"
          style={{ 
            transitionDelay: '1600ms',
            animation: isVisible ? 'slideUp 0.5s ease-out 1600ms forwards' : 'none'
          }}
        >
          <p className="text-gray-400 text-xs">
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
        
        @keyframes slideInRight {
          from {
            transform: translateX(20px);
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;