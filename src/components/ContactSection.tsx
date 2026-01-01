import { useEffect, useRef, useState } from 'react';
import { Phone, Instagram, Mail } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+91 80152 95196',
    href: 'https://wa.me/918015295196',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@divine_touch____',
    href: 'https://instagram.com/divine_touch____',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'makeover.divinetouch@gmail.com',
    href: 'mailto:makeover.divinetouch@gmail.com',
  },
];

const ContactSection = () => {
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
      id="contact"
      ref={sectionRef}
      className="py-12 md:py-20 bg-cream grain-texture relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p
            className={`font-sans text-xs tracking-luxury uppercase text-primary mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Get In Touch
          </p>
          <h2
            className={`font-serif text-2xl md:text-4xl text-foreground transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Contact Us
          </h2>
          <div
            className={`w-16 h-0.5 gradient-gold mx-auto mt-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {contactInfo.map((contact, index) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-background/80 backdrop-blur-sm p-6 rounded-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-gold text-center active:scale-[0.98] ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <contact.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
                {contact.label}
              </p>
              <p className="font-serif text-sm md:text-base text-foreground group-hover:text-primary transition-colors break-all">
                {contact.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
