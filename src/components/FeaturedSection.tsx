import React, { useState, useEffect } from 'react';
import { Star, Zap, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { cars } from '../data/mockData';
import { Car } from '../types';

interface FeaturedSectionProps {
  onViewDetails: (car: Car) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ onViewDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Use more cars for the carousel
  const featuredCars = cars.slice(0, 6);
  
  // Determine how many cards to show based on screen size
  const getCardsToShow = () => {
    if (isMobile) return 1;
    return window.innerWidth >= 1024 ? 3 : 2;
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCardsToShow(getCardsToShow());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = featuredCars.length - cardsToShow;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, cardsToShow, featuredCars.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const maxIndex = featuredCars.length - cardsToShow;
      return prev >= maxIndex ? 0 : prev + 1;
    });
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const maxIndex = featuredCars.length - cardsToShow;
      return prev <= 0 ? maxIndex : prev - 1;
    });
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getBadgeForIndex = (index: number) => {
    switch (index) {
      case 0:
        return {
          icon: Star,
          text: 'Más popular',
          shortText: '★',
          color: 'bg-yellow-500'
        };
      case 1:
        return {
          icon: TrendingUp,
          text: 'Mejor precio',
          shortText: '💰',
          color: 'bg-green-500'
        };
      case 2:
        return {
          icon: Zap,
          text: 'Recién llegado',
          shortText: '⚡',
          color: 'bg-purple-500'
        };
      case 3:
        return {
          icon: Award,
          text: 'Recomendado',
          shortText: '🏆',
          color: 'bg-blue-500'
        };
      case 4:
        return {
          icon: TrendingUp,
          text: 'Tendencia',
          shortText: '📈',
          color: 'bg-orange-500'
        };
      default:
        return {
          icon: Star,
          text: 'Destacado',
          shortText: '⭐',
          color: 'bg-indigo-500'
        };
    }
  };

  const handleViewAllCars = () => {
    window.location.hash = '#search';
  };

  const maxIndex = featuredCars.length - cardsToShow;

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Coches destacados
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Selección premium de vehículos con los mejores precios y características
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className={`w-5 h-5 sm:w-6 sm:h-6 ${currentIndex === 0 ? 'text-gray-400' : 'text-gray-700'}`} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 ${currentIndex >= maxIndex ? 'text-gray-400' : 'text-gray-700'}`} />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                width: `${(featuredCars.length / cardsToShow) * 100}%`
              }}
            >
              {featuredCars.map((car, index) => {
                const badge = getBadgeForIndex(index);
                const BadgeIcon = badge.icon;

                return (
                  <div 
                    key={car.id}
                    className="px-2 sm:px-3"
                    style={{ width: `${100 / featuredCars.length}%` }}
                  >
                    <div 
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group h-full"
                      onClick={() => onViewDetails(car)}
                    >
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <img
                          src={car.images[0]}
                          alt={car.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        
                        {/* Special badges */}
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <span className={`${badge.color} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1`}>
                            <BadgeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">{badge.text}</span>
                            <span className="sm:hidden">{badge.shortText}</span>
                          </span>
                        </div>

                        {car.isCertified && (
                          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                            <div className="bg-blue-500 text-white p-1.5 sm:p-2 rounded-full">
                              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                        )}

                        {/* Auto-play indicator */}
                        {isAutoPlaying && (
                          <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Auto</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {car.title}
                        </h3>
                        
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <span className="text-xl sm:text-2xl font-bold text-blue-600">
                            €{car.price.toLocaleString()}
                          </span>
                          {car.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              €{car.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                          <span>{car.year}</span>
                          <span>{car.mileage.toLocaleString()} km</span>
                          <span className="truncate max-w-20">{car.fuel}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                            <span className="text-xs sm:text-sm text-gray-600">
                              {car.dealership.rating} ({car.dealership.reviews})
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500 truncate max-w-20 sm:max-w-none">{car.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-6 sm:w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button 
            onClick={handleViewAllCars}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <span>Ver todos los coches</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;