import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingSection from '@/components/BookingSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Divine Touch – Premium Bridal Makeover | Professional Bridal Makeup Artist</title>
        <meta
          name="description"
          content="Divine Touch offers luxury bridal makeover services including bridal makeup, reception makeup, HD makeup, and more. Book your bridal appointment today. Contact: +91 80152 95196"
        />
        <meta
          name="keywords"
          content="bridal makeup, wedding makeup, bridal makeover, reception makeup, HD makeup, engagement makeup, professional makeup artist, luxury bridal studio"
        />
        <meta property="og:title" content="Divine Touch – Premium Bridal Makeover" />
        <meta
          property="og:description"
          content="Experience beauty redefined with our premium bridal makeup services. Professional artists, flawless results."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="canonical" href="https://divinetouch.com" />
      </Helmet>

      <main className="min-h-screen bg-background overflow-x-hidden">
        <Header />
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <PricingSection />
        <TestimonialsSection />
        <BookingSection />
        <FAQSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
};

export default Index;
