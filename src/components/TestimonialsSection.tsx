import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Kavya Dharshni',
    event: 'Bridal Makeup',
    text: 'Absolutely stunning work! My bridal makeup was flawless and lasted throughout my wedding day. Divine Touch truly made me feel like a princess.',
    rating: 5,
  },
  {
    name: 'SriDevi',
    event: 'Reception Makeup',
    text: 'The attention to detail was incredible. The team understood exactly what I wanted and delivered beyond my expectations.',
    rating: 5,
  },
  {
    name: 'Suvetha',
    event: 'Engagement Makeup',
    text: 'Such a wonderful experience! The makeup artist was so talented and made me feel so comfortable. Will definitely come back for my wedding.',
    rating: 5,
  },
  {
    name: 'Soundarya',
    event: 'Bridal Makeup',
    text: 'Divine Touch exceeded all my expectations. The bridal look was exactly what I dreamed of. Thank you for making my day so special!',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isUserInteracting = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const SPEED = 0.5; // Adjust speed here (higher = faster)

  const animate = () => {
    if (!scrollRef.current || isUserInteracting.current) return;

    scrollRef.current.scrollLeft += SPEED;

    // Seamless loop
    if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
      scrollRef.current.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    stopAnimation();
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const handleUserStart = () => {
    isUserInteracting.current = true;
    stopAnimation();

    // Clear any pending resume
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleUserEnd = () => {
    isUserInteracting.current = false;

    // Resume auto-scroll after 3 seconds of no interaction
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isUserInteracting.current && isVisible) {
        startAnimation();
      }
    }, 3000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startAnimation();
        } else {
          setIsVisible(false);
          stopAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      stopAnimation();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Touch & mouse interaction handlers
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleUserStart, { passive: true });
    container.addEventListener('touchend', handleUserEnd);
    container.addEventListener('touchcancel', handleUserEnd);
    container.addEventListener('mousedown', handleUserStart);
    container.addEventListener('mouseup', handleUserEnd);
    container.addEventListener('mouseleave', handleUserEnd);

    return () => {
      container.removeEventListener('touchstart', handleUserStart);
      container.removeEventListener('touchend', handleUserEnd);
      container.removeEventListener('touchcancel', handleUserEnd);
      container.removeEventListener('mousedown', handleUserStart);
      container.removeEventListener('mouseup', handleUserEnd);
      container.removeEventListener('mouseleave', handleUserEnd);
    };
  }, [isVisible]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-12 md:py-20 bg-champagne/30 grain-texture relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className={`font-sans text-xs tracking-luxury uppercase text-primary mb-3 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What They Say
          </p>
          <h2
            className={`font-serif text-2xl md:text-4xl text-foreground transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Client Testimonials
          </h2>
          <div
            className={`w-16 h-0.5 gradient-gold mx-auto mt-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />
        </div>

        {/* Moving Testimonials */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-80 md:w-96 snap-start bg-background/90 backdrop-blur-sm p-8 rounded-sm border border-border/50 shadow-lg transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6" />

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'fill-primary text-primary'
                        : 'text-muted/30'
                    }`}
                  />
                ))}
              </div>

              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </p>

              <div className="border-t border-border/30 pt-6">
                <p className="font-serif text-xl text-foreground">
                  {testimonial.name}
                </p>
                <p className="font-sans text-sm text-primary uppercase tracking-wider mt-1">
                  {testimonial.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;