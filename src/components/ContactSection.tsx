import { useEffect, useRef, useState } from 'react';
import { Phone, Instagram, Mail, MapPin, Clock, MessageSquare, Sparkles } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+91 80152 95196',
    href: 'https://wa.me/918015295196',
    description: 'Quick chat & booking',
    color: 'from-green-500/10 to-green-500/5',
    hoverColor: 'hover:bg-green-500/5',
    actionText: 'Chat Now',
    actionIcon: MessageSquare,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@divine_touch____',
    href: 'https://instagram.com/divine_touch____',
    description: 'Portfolio & updates',
    color: 'from-pink-500/10 to-pink-500/5',
    hoverColor: 'hover:bg-pink-500/5',
    actionText: 'Follow Us',
    actionIcon: Sparkles,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'makeover.divinetouch@gmail.com',
    href: 'mailto:makeover.divinetouch@gmail.com',
    description: 'Detailed inquiries',
    color: 'from-blue-500/10 to-blue-500/5',
    hoverColor: 'hover:bg-blue-500/5',
    actionText: 'Send Email',
    actionIcon: Mail,
  },
];

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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

  const getWorkingHours = () => {
    const now = new Date();
    const hours = now.getHours();
    const isWorkingHours = hours >= 9 && hours < 21; // 9 AM to 9 PM
    
    return {
      isOpen: isWorkingHours,
      message: isWorkingHours 
        ? 'Available now for consultations' 
        : 'Will respond within 12 hours'
    };
  };

  const workingHours = getWorkingHours();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 md:py-20 bg-cream relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className={`font-sans text-xs tracking-luxury uppercase text-primary mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Get In Touch
          </p>
          <h2
            className={`font-serif text-2xl md:text-4xl lg:text-5xl text-foreground transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Let's Create Your Dream Look
          </h2>
          <div
            className={`w-16 h-0.5 gradient-gold mx-auto mt-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
          
          {/* Subtitle */}
          <p className={`font-sans text-sm md:text-base text-muted-foreground mt-6 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Connect with us for bridal consultations, bookings, or any questions about our services
          </p>
        </div>

        {/* Status Banner */}
        <div className={`max-w-2xl mx-auto mb-10 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className={`flex items-center justify-center gap-3 p-4 rounded-lg border ${
            workingHours.isOpen 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              workingHours.isOpen ? 'bg-green-500' : 'bg-amber-500'
            }`}></div>
            <Clock className="w-4 h-4" />
            <span className="font-sans text-sm font-medium">
              {workingHours.message}
            </span>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12">
          {contactInfo.map((contact, index) => (
            <div
              key={contact.label}
              className={`relative group transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${200 + index * 100}ms`,
                transform: hoveredCard === contact.label ? 'translateY(-8px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredCard(contact.label)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className={`
                relative overflow-hidden rounded-xl 
                bg-gradient-to-br ${contact.color}
                border border-border/30 
                group-hover:border-primary/40
                transition-all duration-500
                h-full
                ${contact.hoverColor}
              `}>
                {/* Animated border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Card Content */}
                <div className="relative p-6 lg:p-8 h-full flex flex-col">
                  {/* Icon with glow effect */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className={`
                      relative w-16 h-16 rounded-full 
                      bg-gradient-to-br from-background to-background/80 
                      flex items-center justify-center 
                      border border-border/30
                      group-hover:border-primary/50
                      transition-all duration-500
                      mx-auto
                    `}>
                      <contact.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="text-center mb-6 flex-1">
                    <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">
                      {contact.label}
                    </p>
                    <p className="font-serif text-lg lg:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {contact.value}
                    </p>
                    <p className="font-sans text-sm text-muted-foreground">
                      {contact.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-sans text-sm font-medium hover:bg-primary/90 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 active:scale-95 w-full"
                    onClick={(e) => {
                      if (contact.label === 'WhatsApp') {
                        // Send custom WhatsApp message
                        const message = `Hi, I'm interested in booking a bridal makeup appointment. Could you please share more details?`;
                        e.currentTarget.href = `https://wa.me/918015295196?text=${encodeURIComponent(message)}`;
                      }
                    }}
                  >
                    <contact.actionIcon className="w-4 h-4" />
                    {contact.actionText}
                  </a>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Service Areas Information */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-background/30 backdrop-blur-sm rounded-xl p-6 border border-border/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground mb-3">Service Areas</h3>
                <ul className="font-sans text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Chennai (Certain areas)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Cuddalore (All areas)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Pondicherry (Certain areas)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 transition-all duration-700 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="font-sans text-sm text-muted-foreground mb-4">
            Prefer to book directly?
          </p>
          <a
            href="https://wa.me/918015295196?text=Hi%2C%20I%20would%20like%20to%20book%20a%20bridal%20appointment%20urgently."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 gradient-gold text-primary-foreground font-sans text-sm font-medium uppercase tracking-wider rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-5 h-5" />
            Book Urgent Appointment
            <Sparkles className="w-5 h-5" />
          </a>
          <p className="font-sans text-xs text-muted-foreground mt-4">
            WhatsApp is the fastest way to get confirmed appointments
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;