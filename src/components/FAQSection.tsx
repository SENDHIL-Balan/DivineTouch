import { useState, useEffect, useRef } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How far in advance should I book my bridal makeup?',
    answer: 'We recommend booking at least 2 months maximum in advance for bridal makeup, especially during wedding season (October-February). This ensures availability and allows time for a trial session.',
  },
  {
    question: 'Do you offer bridal makeup trials?',
    answer: 'Yes, we highly recommend a trial session before your wedding day. This helps us understand your preferences, skin type, and create your perfect bridal look. Trial sessions are available upon booking.',
  },
  {
    question: 'What makeup brands do you use?',
    answer: 'We use only premium, high-end brands that are long-lasting and camera-ready. Our kit includes international brands known for their quality and skin-friendly formulations.',
  },
  {
    question: 'How long does bridal makeup last?',
    answer: 'Our bridal makeup is designed to last 6-12 hours with proper setting techniques. We use professional-grade products and setting sprays to ensure your look stays flawless throughout your special day.',
  },
  {
    question: 'Do you travel for destination weddings?',
    answer: 'Yes, we provide services for destination weddings across Chennai & Cuddalore. Travel and accommodation charges apply. Please contact us for a customized quote based on your wedding location.',
  },
  {
    question: 'What services are included in the bridal package?',
    answer: 'Our comprehensive bridal package includes makeup, hairstyling, saree draping, and touch-up kit. We also offer additional services like nail art and grooming treatments. Contact us for detailed package information.',
  },
  {
    question: 'Can you recreate a specific makeup look?',
    answer: 'Absolutely! Share your inspiration photos during consultation, and we\'ll work with you to create a look that matches your vision while complementing your features and outfit.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'For any cancellation or rescheduling requests, please contact us directly on WhatsApp',
  },
];

const FAQSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactCtaRef = useRef<HTMLParagraphElement>(null);
  
  // Track which items have animated
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate header elements sequentially
            if (headerRef.current) {
              const headerElements = headerRef.current.children;
              Array.from(headerElements).forEach((el, index) => {
                setTimeout(() => {
                  (el as HTMLElement).style.transform = 'translateY(0)';
                  (el as HTMLElement).style.opacity = '1';
                }, index * 150);
              });
            }

            // Animate FAQ items with staggered delays
            faqItemsRef.current.forEach((item, index) => {
              if (item) {
                setTimeout(() => {
                  item.style.transform = 'translateX(0) translateY(0)';
                  item.style.opacity = '1';
                  setAnimatedItems(prev => [...prev, index]);
                }, 300 + (index * 100));
              }
            });

            // Animate contact CTA
            if (contactCtaRef.current) {
              setTimeout(() => {
                contactCtaRef.current!.style.transform = 'translateY(0)';
                contactCtaRef.current!.style.opacity = '1';
              }, 300 + (faqs.length * 100));
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger when 50px from bottom of viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Reset initial styles when component mounts
  useEffect(() => {
    // Set initial states for header
    if (headerRef.current) {
      const headerElements = headerRef.current.children;
      Array.from(headerElements).forEach((el, index) => {
        (el as HTMLElement).style.transform = 'translateY(20px)';
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      });
    }

    // Set initial states for FAQ items
    faqItemsRef.current.forEach((item, index) => {
      if (item) {
        const direction = index % 4;
        let initialTransform = '';
        
        switch(direction) {
          case 0: // Left
            initialTransform = 'translateX(-50px)';
            break;
          case 1: // Right
            initialTransform = 'translateX(50px)';
            break;
          case 2: // Top
            initialTransform = 'translateY(-30px)';
            break;
          case 3: // Bottom
            initialTransform = 'translateY(30px)';
            break;
        }

        item.style.transform = initialTransform;
        item.style.opacity = '0';
        item.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out, border-color 0.3s ease, box-shadow 0.3s ease';
        item.style.transitionDelay = `${300 + (index * 100)}ms`;
      }
    });

    // Set initial state for contact CTA
    if (contactCtaRef.current) {
      contactCtaRef.current.style.transform = 'translateY(20px)';
      contactCtaRef.current.style.opacity = '0';
      contactCtaRef.current.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      contactCtaRef.current.style.transitionDelay = `${300 + (faqs.length * 100)}ms`;
    }
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="py-12 md:py-20 bg-ivory overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10">
          <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
            <HelpCircle className="w-6 h-6 text-primary transition-transform duration-300 hover:rotate-12" />
          </div>
          <p className="font-sans text-xs tracking-luxury uppercase text-primary mb-3">
            Questions & Answers
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 gradient-gold mx-auto mt-4" />
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                ref={el => faqItemsRef.current[index] = el}
                className={`
                  bg-white border border-gray-200 rounded-sm px-4 md:px-6
                  hover:border-primary/30 hover:shadow-sm
                  data-[state=open]:border-primary/50 data-[state=open]:shadow-sm
                  ${hasAnimated ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <AccordionTrigger 
                  className="
                    text-left font-serif text-sm md:text-base text-gray-800 
                    hover:text-primary py-4 data-[state=open]:text-primary
                    transition-all duration-300
                    group
                  "
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent 
                  className="
                    font-sans text-sm text-gray-600 leading-relaxed pb-4
                    transition-all duration-300 ease-in-out
                    data-[state=open]:animate-accordion-down 
                    data-[state=closed]:animate-accordion-up
                  "
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <p 
          ref={contactCtaRef}
          className="
            text-center font-sans text-sm text-gray-600 mt-8
            ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          "
        >
          Have more questions?{' '}
          <a
            href="https://wa.me/918015295196"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-primary hover:underline
              relative
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-primary
              after:transition-all after:duration-300
              hover:after:w-full
            "
          >
            Contact us on WhatsApp
          </a>
        </p>
      </div>

      {/* Add custom animations */}
      <style>{`        
        @keyframes accordion-down {
          from {
            height: 0;
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            height: var(--radix-accordion-content-height);
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes accordion-up {
          from {
            height: var(--radix-accordion-content-height);
            opacity: 1;
            transform: translateY(0);
          }
          to {
            height: 0;
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        
        .animate-accordion-down {
          animation: accordion-down 0.3s ease-out;
        }
        
        .animate-accordion-up {
          animation: accordion-up 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;