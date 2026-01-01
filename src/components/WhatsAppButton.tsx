import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918015295196?text=Hi%2C%20I%20would%20like%20to%20book%20a%20bridal%20appointment"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full gradient-gold flex items-center justify-center shadow-gold hover:shadow-elegant transition-all duration-300 hover:scale-110 active:scale-95 pulse-gold"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-primary-foreground" />
    </a>
  );
};

export default WhatsAppButton;
