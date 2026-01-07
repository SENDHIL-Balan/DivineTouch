import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ArrowLeft, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, Maximize2, Download, Share2, Heart, Loader2 } from 'lucide-react';

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
      { id: 'north-indian', title: 'North Indian Bridal', folder: '/assets/portfolio/bridal/north-indian', count: 6 },
    ],
  },
  { id: 'reception', title: 'Reception Makeup', folder: '/assets/portfolio/reception', count: 3 },
  { id: 'engagement', title: 'Engagement Makeup', folder: '/assets/portfolio/engagement', count: 0 },
  { id: 'baby-shower', title: 'Baby Shower Makeup', folder: '/assets/portfolio/baby-shower', count: 1 },
  { id: 'party-makeup', title: 'Party Makeup', folder: '/assets/portfolio/party-makeup', count: 2 },
  { id: 'nail-art', title: 'Nail Art', folder: '/assets/portfolio/nail-art', count: 4 },
  { id: 'hair-styling', title: 'Hair Styling', folder: '/assets/portfolio/hair-styling', count: 1 },
  { id: 'saree-draping', title: 'Saree Draping', folder: '/assets/portfolio/saree-draping', count: 0 },
  { id: 'hd-makeup', title: 'HD Makeup', folder: '/assets/portfolio/hd-makeup', count: 1 },
  { id: 'before-after', title: 'Before & After', folder: '/assets/portfolio/before-after', count: 3 },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const subCategoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [imagePreloaded, setImagePreloaded] = useState<Set<string>>(new Set());

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

  // Animation for main categories on scroll
  useEffect(() => {
    if (!selectedCategory) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
              }, index * 100);
            }
          });
        },
        { threshold: 0.2 }
      );

      categoryRefs.current.forEach(ref => {
        if (ref) {
          observer.observe(ref);
        }
      });

      return () => observer.disconnect();
    }
  }, [selectedCategory]);

  // Animation for subcategories on scroll
  useEffect(() => {
    if (selectedCategory?.subCategories && !selectedSubCategory) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
              }, index * 80);
            }
          });
        },
        { threshold: 0.2 }
      );

      subCategoryRefs.current.forEach(ref => {
        if (ref) {
          observer.observe(ref);
        }
      });

      return () => observer.disconnect();
    }
  }, [selectedCategory, selectedSubCategory]);

  // Animation for gallery images on scroll
  useEffect(() => {
    const showGallery = selectedCategory && (!selectedCategory.subCategories || selectedSubCategory);
    if (showGallery) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
              }, index * 60);
            }
          });
        },
        { threshold: 0.2 }
      );

      imageRefs.current.forEach(ref => {
        if (ref) {
          observer.observe(ref);
        }
      });

      return () => observer.disconnect();
    }
  }, [selectedCategory, selectedSubCategory]);

  // Preload images for current gallery
  useEffect(() => {
    const preloadImages = () => {
      const folder = selectedSubCategory?.folder || selectedCategory?.folder;
      const imageCount = selectedSubCategory?.count ?? selectedCategory?.count ?? 0;
      
      if (!folder || imageCount === 0) return;

      for (let i = 1; i <= imageCount; i++) {
        const imgSrc = `${folder}/${i}.jpg`;
        if (!imagePreloaded.has(imgSrc)) {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => {
            setImagePreloaded(prev => new Set(prev).add(imgSrc));
          };
        }
      }
    };

    preloadImages();
  }, [selectedCategory, selectedSubCategory, imagePreloaded]);

  const handleCategoryClick = (category: PortfolioCategory) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    
    // Reset animations
    categoryRefs.current.forEach(ref => {
      if (ref) {
        ref.style.opacity = '0';
        ref.style.transform = 'translateY(30px) scale(0.95)';
        ref.style.transition = 'none';
      }
    });
    
    // Scroll to top of section
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsLoading(false);
    }, 300);
  };

  const handleSubCategoryClick = (subCat: SubCategory) => {
    setIsLoading(true);
    setSelectedSubCategory(subCat);
    
    // Reset animations
    subCategoryRefs.current.forEach(ref => {
      if (ref) {
        ref.style.opacity = '0';
        ref.style.transform = 'translateY(30px) scale(0.95)';
        ref.style.transition = 'none';
      }
    });
    
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleBack = () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(null);
    }
  };

  const getCurrentGalleryImages = () => {
    const folder = selectedSubCategory?.folder || selectedCategory?.folder;
    const imageCount = selectedSubCategory?.count ?? selectedCategory?.count ?? 0;
    
    if (!folder || imageCount === 0) return [];

    return Array.from({ length: imageCount }, (_, i) => ({
      src: `${folder}/${i + 1}.jpg`,
      alt: `Portfolio image ${i + 1}`,
      id: `${folder}-${i + 1}`,
    }));
  };

  const openLightbox = (imageSrc: string) => {
    const images = getCurrentGalleryImages();
    const index = images.findIndex(img => img.src === imageSrc);
    setCurrentImageIndex(index);
    setLightboxImage(imageSrc);
  };

  const nextImage = useCallback(() => {
    const images = getCurrentGalleryImages();
    if (images.length === 0) return;
    
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setLightboxImage(images[nextIndex].src);
  }, [currentImageIndex, getCurrentGalleryImages]);

  const prevImage = useCallback(() => {
    const images = getCurrentGalleryImages();
    if (images.length === 0) return;
    
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setLightboxImage(images[prevIndex].src);
  }, [currentImageIndex, getCurrentGalleryImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          setLightboxImage(null);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, prevImage, nextImage]);

  // Mouse drag for lightbox
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevImage();
      } else {
        nextImage();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - dragStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevImage();
      } else {
        nextImage();
      }
      setIsDragging(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      lightboxRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleLike = (imageId: string) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const downloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `divine-touch-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const shareImage = async () => {
    if (navigator.share && lightboxImage) {
      try {
        await navigator.share({
          title: 'Divine Touch Bridal Makeup',
          text: 'Check out this beautiful bridal makeup from Divine Touch!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing failed:', error);
      }
    }
  };

  // Breadcrumb navigation
  const renderBreadcrumb = () => {
    if (!selectedCategory) return null;

    return (
      <div className="flex items-center justify-center gap-2 mb-6 text-sm">
        <button
          onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); }}
          className="font-sans text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded hover:bg-primary/5"
        >
          Portfolio
        </button>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        {selectedSubCategory ? (
          <>
            <button
              onClick={() => setSelectedSubCategory(null)}
              className="font-sans text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded hover:bg-primary/5"
            >
              {selectedCategory.title}
            </button>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-sans text-foreground px-2 py-1 bg-primary/5 rounded">
              {selectedSubCategory.title}
            </span>
          </>
        ) : (
          <span className="font-sans text-foreground px-2 py-1 bg-primary/5 rounded">
            {selectedCategory.title}
          </span>
        )}
      </div>
    );
  };

  const renderMainCategories = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {portfolioCategories.map((category, index) => (
        <button
          key={category.id}
          ref={(el) => categoryRefs.current[index] = el}
          onClick={() => handleCategoryClick(category)}
          className="group relative rounded-lg overflow-hidden bg-secondary aspect-[4/5] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          onMouseEnter={() => setHoveredImage(category.id)}
          onMouseLeave={() => setHoveredImage(null)}
          style={{
            opacity: 0,
            transform: 'translateY(30px) scale(0.95)',
            transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <img
            src={`${category.folder}/cover.jpg`}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
            <h3 className="font-serif text-lg text-white mb-1">
              {category.title}
            </h3>
            {category.subCategories && (
              <p className="text-xs text-white/80 font-sans">
                {category.subCategories.length} categories • {category.count || 0} photos
              </p>
            )}
            {category.count !== undefined && !category.subCategories && (
              <p className="text-xs text-white/80 font-sans">
                {category.count} photos
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
        {selectedCategory.subCategories.map((subCat, index) => (
          <button
            key={subCat.id}
            ref={(el) => subCategoryRefs.current[index] = el}
            onClick={() => handleSubCategoryClick(subCat)}
            className="group relative rounded-lg overflow-hidden bg-secondary aspect-[3/4] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            onMouseEnter={() => setHoveredImage(subCat.id)}
            onMouseLeave={() => setHoveredImage(null)}
            style={{
              opacity: 0,
              transform: 'translateY(30px) scale(0.95)',
              transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <img
              src={`${subCat.folder}/cover.jpg`}
              alt={subCat.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
              <h3 className="font-serif text-base text-white mb-1">
                {subCat.title}
              </h3>
              <p className="text-xs text-white/80 font-sans">
                {subCat.count} photos
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderGallery = () => {
    const images = getCurrentGalleryImages();
    if (images.length === 0) return null;

    return (
      <>
        <div className="mb-6 text-center">
          <p className="font-sans text-sm text-muted-foreground">
            Click on any image to view in fullscreen • {images.length} photos
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => imageRefs.current[index] = el}
              className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{
                opacity: 0,
                transform: 'translateY(30px) scale(0.95)',
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <button
                onClick={() => openLightbox(image.src)}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
              
              {/* Image overlay buttons */}
              <div className={`absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ${hoveredImage === image.id ? 'scale-100' : 'scale-90'}`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(image.id);
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  title="Like this image"
                >
                  <Heart className={`w-5 h-5 ${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(image.src);
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  title="View fullscreen"
                >
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              </div>
              
              {/* Image number badge */}
              <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-sans px-2 py-1 rounded-full">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        {/* Gallery info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/5 px-6 py-3 rounded-full">
            <span className="font-sans text-sm text-muted-foreground">
              💖 {likedImages.size} liked photos
            </span>
            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full"></span>
            <span className="font-sans text-sm text-muted-foreground">
              📷 {images.length} total photos
            </span>
          </div>
        </div>
      </>
    );
  };

  const showGallery = selectedCategory && (!selectedCategory.subCategories || selectedSubCategory);
  const showSubCategories = selectedCategory?.subCategories && !selectedSubCategory;

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-12 md:py-20 bg-background relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="font-sans text-sm text-muted-foreground">Loading portfolio...</p>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          {selectedCategory && (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300 hover:gap-3 mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
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
                Portfolio
              </h2>
              <div
                className={`w-16 h-0.5 gradient-gold mx-auto mt-4 transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              />
              <p className="font-sans text-sm text-muted-foreground mt-4 max-w-2xl mx-auto">
                Explore our collection of beautiful bridal transformations and makeup artistry.
              </p>
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

      {/* Enhanced Lightbox */}
      {lightboxImage && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-foreground/95 flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Top controls */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(null);
                }}
              >
                <X className="w-5 h-5" />
              </button>
              <span className="font-sans text-sm text-white/80">
                {currentImageIndex + 1} / {getCurrentGalleryImages().length}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(getCurrentGalleryImages()[currentImageIndex].id);
                }}
                title="Like"
              >
                <Heart className={`w-5 h-5 ${likedImages.has(getCurrentGalleryImages()[currentImageIndex].id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(lightboxImage);
                }}
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  shareImage();
                }}
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm z-10"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm z-10"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            title="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center w-full">
            <img
              src={lightboxImage}
              alt="Portfolio fullscreen"
              className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>

          {/* Image info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-center">
            <p className="font-serif text-lg text-white mb-1">
              {selectedSubCategory?.title || selectedCategory?.title}
            </p>
            <p className="font-sans text-sm text-white/80">
              Photo {currentImageIndex + 1} of {getCurrentGalleryImages().length}
            </p>
          </div>

          {/* Thumbnail strip */}
          {getCurrentGalleryImages().length > 1 && (
            <div className="absolute bottom-20 left-0 right-0 overflow-x-auto py-4 px-8">
              <div className="flex gap-2 justify-center">
                {getCurrentGalleryImages().map((img, index) => (
                  <button
                    key={img.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                      setLightboxImage(img.src);
                    }}
                    className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'border-primary scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;