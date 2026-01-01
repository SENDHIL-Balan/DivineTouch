import { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, ChevronRight } from 'lucide-react';

type SubCategory = {
  id: string;
  title: string;
  folder: string;
  count:number
};

type PortfolioCategory = {
  id: string;
  title: string;
  folder: string;
  count?: number;
  subCategories?: SubCategory[];
};

const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'bridal',
    title: 'Bridal Makeup',
    folder: '/assets/portfolio/bridal/',
    subCategories: [
      { id: 'hindu', title: 'Hindu Bridal', folder: '/assets/portfolio/bridal/hindu', count: 1 },
      { id: 'muslim', title: 'Muslim Bridal', folder: '/assets/portfolio/bridal/muslim', count: 1 },
      { id: 'christian', title: 'Christian Bridal', folder: '/assets/portfolio/bridal/christian', count: 3 },
      { id: 'north-indian', title: 'North Indian Bridal', folder: '/assets/portfolio/bridal/north-indian', count: 1 },
    ],
  },
  { id: 'reception', title: 'Reception Makeup', folder: '/assets/portfolio/reception', count: 3 },
  { id: 'engagement', title: 'Engagement Makeup', folder: '/assets/portfolio/engagement', count: 1 },
  { id: 'baby-shower', title: 'Baby Shower Makeup', folder: '/assets/portfolio/baby-shower', count: 1 },
  { id: 'party-makeup', title: 'Party Makeup', folder: '/assets/portfolio/party-makeup', count: 3 },
  { id: 'nail-art', title: 'Nail Art', folder: '/assets/portfolio/nail-art', count: 4 },
  { id: 'hair-styling', title: 'Hair Styling', folder: '/assets/portfolio/hair-styling', count: 1 },
  { id: 'saree-draping', title: 'Saree Draping', folder: '/assets/portfolio/saree-draping', count: 2 },
  { id: 'hd-makeup', title: 'HD Makeup', folder: '/assets/portfolio/hd-makeup', count: 1 },
  { id: 'before-after', title: 'Before & After', folder: '/assets/portfolio/before-after', count: 3 },
];

// Generate gallery images from folder (NO default count)
const getGalleryImages = (folder: string, count: number) => {
  if (!count || count <= 0) return [];

  return Array.from({ length: count }, (_, i) => ({
    src: `${folder}/${i + 1}.jpg`,
    alt: `Portfolio image ${i + 1}`,
  }));
};


const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [lightboxImage, setLightboxImage] =
    useState<string | null>(null);
  
    const imageCount =
    selectedSubCategory?.count ??
    selectedCategory?.count ??
    0;


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

  const handleCategoryClick = (category: PortfolioCategory) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    // Scroll to top of section
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubCategoryClick = (subCat: SubCategory) => {
    setSelectedSubCategory(subCat);
  };

  const handleBack = () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(null);
    }
  };

  // Breadcrumb navigation
  const renderBreadcrumb = () => {
    if (!selectedCategory) return null;

    return (
      <div className="flex items-center justify-center gap-2 mb-6 text-sm">
        <button
          onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); }}
          className="font-sans text-muted-foreground hover:text-primary transition-colors"
        >
          Portfolio
        </button>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        {selectedSubCategory ? (
          <>
            <button
              onClick={() => setSelectedSubCategory(null)}
              className="font-sans text-muted-foreground hover:text-primary transition-colors"
            >
              {selectedCategory.title}
            </button>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-sans text-foreground">{selectedSubCategory.title}</span>
          </>
        ) : (
          <span className="font-sans text-foreground">{selectedCategory.title}</span>
        )}
      </div>
    );
  };

  const renderMainCategories = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
  {portfolioCategories.map((category) => (
    <button
      key={category.id}
      onClick={() => handleCategoryClick(category)}
      className="group relative rounded-lg overflow-hidden bg-secondary aspect-[4/5]"
    >
      {/* Image */}
      <img
        src={`${category.folder}/cover.jpg`}
        alt={category.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <h3 className="font-serif text-lg text-white">
          {category.title}
        </h3>

        {category.subCategories && (
          <p className="text-xs text-white/80 mt-1">
            {category.subCategories.length} Categories
          </p>
        )}
      </div>
    </button>
  ))}
</div>
  );

  const renderSubCategories = () => {
  if (!selectedCategory?.subCategories) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {selectedCategory.subCategories.map((subCat) => (
        <button
          key={subCat.id}
          onClick={() => handleSubCategoryClick(subCat)}
          className="group relative rounded-lg overflow-hidden bg-secondary aspect-[3/4]"
        >
          {/* Image */}
          <img
            src={`${subCat.folder}/cover.jpg`}
            alt={subCat.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Text */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
            <h3 className="font-serif text-base text-white">
              {subCat.title}
            </h3>
          </div>
        </button>
      ))}
    </div>
  );
};


  const renderGallery = () => {
    
  const folder = selectedSubCategory?.folder || selectedCategory?.folder;
  const imageCount =
    selectedSubCategory?.count ??
    selectedCategory?.count ??
    0;

  if (!folder || imageCount === 0) return null;

  const images = Array.from({ length: imageCount }, (_, i) => ({
    src: `${folder}/${i + 1}.jpg`,
    alt: `Portfolio image ${i + 1}`,
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => setLightboxImage(image.src)}
          className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
};

  const showGallery = selectedCategory && (!selectedCategory.subCategories || selectedSubCategory);
  const showSubCategories = selectedCategory?.subCategories && !selectedSubCategory;

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-12 md:py-20 bg-background grain-texture relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          {selectedCategory && (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-sans text-sm uppercase tracking-wide">Back</span>
            </button>
          )}
          
          {/* Breadcrumb */}
          {renderBreadcrumb()}
          
          {!selectedCategory && (
            <>
              <p
                className={`font-sans text-xs tracking-luxury uppercase text-primary mb-3 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Our Work
              </p>
              <h2
                className={`font-serif text-2xl md:text-4xl text-foreground transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Bridal Portfolio
              </h2>
              <div
                className={`w-16 h-0.5 gradient-gold mx-auto mt-4 transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              />
            </>
          )}
          
          {selectedCategory && !selectedSubCategory && selectedCategory.subCategories && (
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              {selectedCategory.title}
            </h2>
          )}
          
          {selectedSubCategory && (
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              {selectedSubCategory.title}
            </h2>
          )}
        </div>

        {/* Content */}
        {!selectedCategory && renderMainCategories()}
        {showSubCategories && renderSubCategories()}
        {showGallery && renderGallery()}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Portfolio fullscreen"
            className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
