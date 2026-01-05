const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918015295196?text=Hi%2C%20I%20would%20like%20to%20book%20a%20bridal%20appointment"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-5 right-5 z-40
        w-10 h-10
        flex items-center justify-center
        animate-heartbeat
        transition-all duration-300
        hover:scale-110
        hover:shadow-lg hover:shadow-green-500/30
      "
    >
      <img
        src="/icons/whatsapp.png"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
};

export default WhatsAppButton;