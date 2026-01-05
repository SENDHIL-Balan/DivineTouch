import { Phone, Heart, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground border-t border-primary/10 py-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
          {/* Brand/Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg text-primary-foreground mb-2">Divine Touch</h3>
            <div className="space-y-1">
              <a 
                href="https://wa.me/918015295196" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="font-sans text-sm">+91 80152 95196</span>
              </a>
              <a 
                href="https://instagram.com/divine_touch____" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-sans text-sm">@divine_touch____</span>
              </a>
            </div>
          </div>

          

          {/* Instagram Icon */}
          <a 
            href="https://instagram.com/divine_touch____" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-foreground hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Instagram @divine_touch____"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20 my-4"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-sans text-xs text-primary-foreground/60">
            © {currentYear} Divine Touch – Bridal Makeover. All rights reserved.
          </p>
          <p className="font-sans text-xs text-primary-foreground/40 mt-1 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 fill-red-500 text-red-500" /> for beautiful brides
          </p>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;