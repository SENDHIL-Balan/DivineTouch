import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Kavya dharshni',
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

  // Auto-scroll effect - vertical on mobile concepts but horizontal here
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.3;

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    const handleTouch = () => cancelAnimationFrame(animationId);
    const handleTouchEnd = () => {
      scrollPosition = scrollContainer.scrollLeft;
      animationId = requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener('touchstart', handleTouch);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    scrollContainer.addEventListener('mouseenter', handleTouch);
    scrollContainer.addEventListener('mouseleave', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('touchstart', handleTouch);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('mouseenter', handleTouch);
      scrollContainer.removeEventListener('mouseleave', handleTouchEnd);
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-12 md:py-20 bg-champagne/30 grain-texture relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p
            className={`font-sans text-xs tracking-luxury uppercase text-primary mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What They Say
          </p>
          <h2
            className={`font-serif text-2xl md:text-4xl text-foreground transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Client Testimonials
          </h2>
          <div
            className={`w-16 h-0.5 gradient-gold mx-auto mt-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
        </div>

        {/* Testimonials Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-72 md:w-80 bg-background/90 backdrop-blur-sm p-6 rounded-sm border border-border/50 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + (index % 4) * 80}ms` }}
            >
              <Quote className="w-6 h-6 text-primary/30 mb-3" />
              
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                "{testimonial.text}"
              </p>

              <div className="border-t border-border/50 pt-3">
                <p className="font-serif text-base text-foreground">{testimonial.name}</p>
                <p className="font-sans text-xs text-primary uppercase tracking-wide">
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
