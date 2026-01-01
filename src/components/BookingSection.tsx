import { useEffect, useRef, useState } from 'react';
import { Calendar, MessageCircle, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/client';
import { toast } from 'sonner';

const services = [
  'Bridal Makeup',
  'Reception Makeup',
  'Pre & Post Wedding Makeup',
  'Engagement Makeup',
  'Baby Shower Makeup',
  'Half Saree Ceremony Makeup',
  'HD Makeup',
  'Nail Art',
  'Hair Styling',
  'Saree Draping',
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BookingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    year: '',
    month: '',
    date: '',
  });

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1, currentYear + 2];
  
  const selectedYear = formData.year ? parseInt(formData.year) : currentYear;
  const daysInMonth = formData.month 
    ? new Date(selectedYear, months.indexOf(formData.month) + 1, 0).getDate() 
    : 31;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service || !formData.year || !formData.month || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-booking-email', {
        body: {
          clientName: formData.name,
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.service,
          year: formData.year,
          month: formData.month,
          date: formData.date,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', service: '', year: '', month: '', date: '' });
      toast.success('Booking request sent successfully!');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to send booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-12 md:py-20 bg-foreground grain-texture relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          {/* Icon */}
          <div
            className={`w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <Calendar className="w-6 h-6 text-primary" />
          </div>

          {/* Heading */}
          <h2
            className={`font-serif text-2xl md:text-4xl text-primary-foreground mb-4 text-center transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Book Your Appointment
          </h2>

          {/* Description */}
          <p
            className={`font-sans text-sm text-primary-foreground/70 text-center max-w-md mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Schedule your bridal consultation today. Fill in your details and we'll confirm your appointment.
          </p>

          {isSuccess ? (
            <div className="text-center py-8 animate-fade-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-primary-foreground mb-3">
                Booking Request Received!
              </h3>
              <p className="font-sans text-sm text-primary-foreground/70 mb-6">
                We'll contact you shortly to confirm your appointment.
              </p>
              <Button
                onClick={() => setIsSuccess(false)}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                Book Another Appointment
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={`space-y-4 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-primary-foreground/80 text-sm">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="h-12 bg-background/10 border-primary/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-primary-foreground/80 text-sm">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-12 bg-background/10 border-primary/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-primary-foreground/80 text-sm">
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="h-12 bg-background/10 border-primary/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary"
                />
              </div>

              {/* Service */}
              <div className="space-y-1.5">
                <Label className="text-primary-foreground/80 text-sm">Service Type *</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger className="h-12 bg-background/10 border-primary/20 text-primary-foreground focus:border-primary">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection - Year, Month, Date */}
              <div className="space-y-1.5">
                <Label className="text-primary-foreground/80 text-sm">Preferred Date *</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Select
                    value={formData.year}
                    onValueChange={(value) => setFormData({ ...formData, year: value, month: '', date: '' })}
                  >
                    <SelectTrigger className="h-12 bg-background/10 border-primary/20 text-primary-foreground focus:border-primary">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.month}
                    onValueChange={(value) => setFormData({ ...formData, month: value, date: '' })}
                    disabled={!formData.year}
                  >
                    <SelectTrigger className="h-12 bg-background/10 border-primary/20 text-primary-foreground focus:border-primary disabled:opacity-50">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month.slice(0, 3)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.date}
                    onValueChange={(value) => setFormData({ ...formData, date: value })}
                    disabled={!formData.month}
                  >
                    <SelectTrigger className="h-12 bg-background/10 border-primary/20 text-primary-foreground focus:border-primary disabled:opacity-50">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: daysInMonth }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 gradient-gold text-primary-foreground font-sans text-sm uppercase tracking-wide-luxury shadow-gold hover:shadow-elegant transition-all duration-500 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Submit Booking Request
                    </>
                  )}
                </Button>

                <a
                  href="https://wa.me/918015295196?text=Hi%2C%20I%20would%20like%20to%20book%20a%20bridal%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 inline-flex items-center justify-center gap-2 border border-primary/30 text-primary font-sans text-sm uppercase tracking-wide rounded-sm hover:bg-primary/10 transition-all duration-300 active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
