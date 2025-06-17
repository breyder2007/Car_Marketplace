import React, { useState } from 'react';
import { Heart, Star, Award, Fuel, Gauge, Calendar, MapPin, Eye, ExternalLink, Camera, BarChart3 } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
  onView360Tour?: (car: Car) => void;
  onViewImages?: (car: Car, imageIndex: number) => void;
  onViewPriceEvaluation?: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ 
  car, 
  onViewDetails, 
  onView360Tour, 
  onViewImages,
  onViewPriceEvaluation 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getPriceRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriceRatingText = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'Precio excelente';
      case 'good': return 'Buen precio';
      case 'fair': return 'Precio justo';
      case 'high': return 'Precio alto';
      default: return 'Precio estándar';
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleCardClick = () => {
    onViewDetails(car);
  };

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails(car);
  };

  const handleView360TourClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onView360Tour) {
      onView360Tour(car);
    }
  };

  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    const carUrl = `${window.location.origin}${window.location.pathname}#car/${car.id}`;
    window.open(carUrl, '_blank');
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewImages) {
      onViewImages(car, currentImageIndex);
    }
  };

  const handlePriceEvaluationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewPriceEvaluation) {
      onViewPriceEvaluation(car);
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={car.images[currentImageIndex]}
          alt={car.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          onClick={handleImageClick}
        />
        
        {/* Image Navigation - Only show on hover for desktop, always show on mobile */}
        {car.images.length > 1 && (isHovered || window.innerWidth < 768) && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <span className="text-sm">←</span>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <span className="text-sm">→</span>
            </button>
          </>
        )}

        {/* Image Indicators */}
        {car.images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {car.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col space-y-1 sm:space-y-2">
          {car.isNew && (
            <span className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
              Nuevo
            </span>
          )}
          {car.isCertified && (
            <span className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span className="hidden sm:inline">Certificado</span>
            </span>
          )}
          {car.environmentalBadge && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {car.environmentalBadge}
            </span>
          )}
        </div>

        {/* Price Rating - Top right */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <button
            onClick={handlePriceEvaluationClick}
            className={`p-2 rounded-full text-xs font-medium hover:shadow-lg transition-all ${getPriceRatingColor(car.priceRating)}`}
            title="Ver evaluación de precio"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>

        {/* Favorite Button - Bottom left */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all shadow-sm"
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Title and Price */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{car.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                {typeof car.price === 'number' ? `€${car.price.toLocaleString()}` : 'Precio no disponible'}
              </span>
              {car.originalPrice != null && typeof car.originalPrice === 'number' && (
                <span className="text-sm sm:text-lg text-gray-500 line-through">
                  €{car.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {car.originalPrice != null && typeof car.originalPrice === 'number' && typeof car.price === 'number' && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs sm:text-sm font-medium">
                -{Math.round((1 - car.price / car.originalPrice) * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Gauge className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Fuel className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{car.fuel}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <span className="w-3 h-3 sm:w-4 sm:h-4 text-center text-xs">⚡</span>
            <span>{car.power} CV</span>
          </div>
        </div>

        {/* Electric Vehicle Info */}
        {car.electricVehicleType && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-green-800">
                {car.electricVehicleType} - {car.electricRange}
              </span>
              {car.batteryCapacity && (
                <span className="text-green-600">{car.batteryCapacity}</span>
              )}
            </div>
          </div>
        )}

        {/* Lifestyle Tags */}
        {car.lifestyleTags && car.lifestyleTags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {car.lifestyleTags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Dealership */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            {car.dealership.logo && (
              <img 
                src={car.dealership.logo} 
                alt={car.dealership.name}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{car.dealership.name}</p>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">
                  {car.dealership.rating} ({car.dealership.reviews})
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 flex-shrink-0">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate max-w-20 sm:max-w-none">{car.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={handleViewDetailsClick}
            className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Ver detalles</span>
          </button>
          
          {/* Desktop-only buttons */}
          <button 
            onClick={handlePriceEvaluationClick}
            className="hidden sm:flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            title="Evaluación de precio"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleOpenInNewTab}
            className="hidden sm:flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            title="Abrir en nueva pestaña"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          
          {/* 360 tour button for desktop only */}
          {car.tour360Url && (
            <button 
              onClick={handleView360TourClick}
              className="hidden sm:flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              title="Tour 360°"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;