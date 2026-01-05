import { useState } from 'react';
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
  return (
    <section id="faq" className="py-12 md:py-20 bg-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header - NO ANIMATIONS */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <p className="font-sans text-xs tracking-luxury uppercase text-primary mb-3">
            Questions & Answers
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 gradient-gold mx-auto mt-4" />
        </div>

        {/* FAQ Accordion - SIMPLE & FAST */}
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-gray-200 rounded-sm px-4 md:px-6"
              >
                <AccordionTrigger className="text-left font-serif text-sm md:text-base text-gray-800 hover:text-primary py-4 data-[state=open]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-gray-600 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <p className="text-center font-sans text-sm text-gray-600 mt-8">
          Have more questions?{' '}
          <a
            href="https://wa.me/918015295196"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Contact us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQSection;