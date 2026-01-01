const Footer = () => {
  return (
    <footer className="py-6 bg-foreground border-t border-primary/10">
      <div className="container mx-auto px-4 text-center">
        <p className="font-sans text-xs md:text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Divine Touch – Bridal Makeover. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
