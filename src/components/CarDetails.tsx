import React, { useState } from 'react';
import { 
  X, Heart, Share2, Star, Award, Calendar, Gauge, Fuel, Settings, 
  Car as CarIcon, MapPin, Shield, Clock, Euro,
  ChevronLeft, ChevronRight, CheckCircle, AlertCircle, ExternalLink, Copy, Camera
} from 'lucide-react';
import { Car } from '../types';

interface CarDetailsProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
  onInsuranceCalculator: (car: Car) => void;
  onView360Tour?: (car: Car) => void;
  onViewImages?: (car: Car, imageIndex: number) => void;
  onFinancing?: (car: Car) => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ 
  car, 
  isOpen, 
  onClose, 
  onInsuranceCalculator,
  onView360Tour,
  onViewImages,
  onFinancing
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  if (!isOpen) return null;

  // Configuración para la navegación de miniaturas
  const thumbnailsPerView = 6; // Número de miniaturas visibles a la vez
  const maxThumbnailIndex = Math.max(0, car.images.length - thumbnailsPerView);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleImageClick = () => {
    if (onViewImages) {
      onViewImages(car, currentImageIndex);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    // Auto-ajustar la vista de miniaturas para mostrar la imagen seleccionada
    if (index < thumbnailStartIndex) {
      setThumbnailStartIndex(Math.max(0, index - 1));
    } else if (index >= thumbnailStartIndex + thumbnailsPerView) {
      setThumbnailStartIndex(Math.min(maxThumbnailIndex, index - thumbnailsPerView + 2));
    }
  };

  const scrollThumbnailsLeft = () => {
    setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - thumbnailsPerView));
  };

  const scrollThumbnailsRight = () => {
    setThumbnailStartIndex(Math.min(maxThumbnailIndex, thumbnailStartIndex + thumbnailsPerView));
  };

  const getPriceRatingInfo = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return { 
          text: 'Precio excelente - 15% por debajo del mercado',
          color: 'text-green-600 bg-green-100',
          icon: CheckCircle
        };
      case 'good':
        return { 
          text: 'Buen precio - En línea con el mercado',
          color: 'text-blue-600 bg-blue-100',
          icon: CheckCircle
        };
      case 'fair':
        return { 
          text: 'Precio justo - Ligeramente por encima del mercado',
          color: 'text-yellow-600 bg-yellow-100',
          icon: AlertCircle
        };
      default:
        return { 
          text: 'Precio estándar',
          color: 'text-gray-600 bg-gray-100',
          icon: AlertCircle
        };
    }
  };

  const priceInfo = getPriceRatingInfo(car.priceRating);
  const PriceIcon = priceInfo.icon;

  // Generate URL for this specific car
  const carUrl = `${window.location.origin}${window.location.pathname}#car/${car.id}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: car.title,
          text: `Echa un vistazo a este ${car.title} por €${car.price.toLocaleString()}`,
          url: carUrl,
        });
      } catch (err) {
        // Fallback to copy to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(carUrl);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(carUrl, '_blank');
  };

  const handleView360Tour = () => {
    if (onView360Tour) {
      onView360Tour(car);
    }
  };

  const handleFinancing = () => {
    if (onFinancing) {
      onFinancing(car);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen py-0 md:py-8 px-0 md:px-4">
        <div className="max-w-7xl mx-auto bg-white md:rounded-2xl md:shadow-2xl overflow-hidden">
          {/* Header - Mejorado para móviles */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
            <div className="min-w-0 flex-1 mr-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 line-clamp-2 leading-tight">{car.title}</h1>
              <p className="text-sm md:text-sm text-gray-500 mt-1">ID: {car.id}</p>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button 
                onClick={handleOpenInNewTab}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Abrir en nueva pestaña"
              >
                <ExternalLink className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <button 
                  onClick={handleShare}
                  className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                {showCopyNotification && (
                  <div className="absolute top-full right-0 mt-2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap z-20">
                    ¡Enlace copiado!
                  </div>
                )}
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 lg:p-6">
            {/* Left Column - Images */}
            <div className="lg:col-span-2 order-1">
              <div className="relative mb-4 md:mb-6 px-4 lg:px-0 pt-4 lg:pt-0">
                {/* Main Image with proper aspect ratio */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-gray-100" onClick={handleImageClick}>
                  <img
                    src={car.images[currentImageIndex]}
                    alt={`${car.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Navigation Arrows */}
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {car.images.length}
                  </div>

                  {/* Click to expand hint */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-full text-sm flex items-center space-x-1">
                    <Camera className="w-4 h-4" />
                    <span>Ampliar</span>
                  </div>

                  {/* 360° Tour Button */}
                  {onView360Tour && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView360Tour();
                      }}
                      className="absolute bottom-4 left-4 bg-purple-600 text-white px-4 py-2.5 rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2 shadow-lg text-sm font-medium"
                    >
                      <Camera className="w-4 h-4" />
                      <span>360°</span>
                    </button>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {car.isNew && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Nuevo
                      </span>
                    )}
                    {car.isCertified && (
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>Certificado</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Enhanced Thumbnail Gallery with Navigation */}
                {car.images.length > 1 && (
                  <div className="relative mt-4">
                    {/* Navigation Arrows for Thumbnails */}
                    {car.images.length > thumbnailsPerView && (
                      <>
                        <button
                          onClick={scrollThumbnailsLeft}
                          disabled={thumbnailStartIndex === 0}
                          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 transition-all ${
                            thumbnailStartIndex === 0 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:bg-gray-50 hover:shadow-xl'
                          }`}
                          style={{ marginLeft: '-12px' }}
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        <button
                          onClick={scrollThumbnailsRight}
                          disabled={thumbnailStartIndex >= maxThumbnailIndex}
                          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 transition-all ${
                            thumbnailStartIndex >= maxThumbnailIndex 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:bg-gray-50 hover:shadow-xl'
                          }`}
                          style={{ marginRight: '-12px' }}
                        >
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </>
                    )}

                    {/* Thumbnails Container */}
                    <div className="overflow-hidden px-6">
                      <div 
                        className="flex space-x-2 transition-transform duration-300 ease-in-out"
                        style={{ 
                          transform: `translateX(-${thumbnailStartIndex * (80 + 8)}px)` // 80px width + 8px gap
                        }}
                      >
                        {car.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                              index === currentImageIndex 
                                ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' 
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Thumbnail Indicators */}
                    {car.images.length > thumbnailsPerView && (
                      <div className="flex justify-center mt-3 space-x-1">
                        {Array.from({ length: Math.ceil(car.images.length / thumbnailsPerView) }).map((_, pageIndex) => {
                          const isActive = Math.floor(thumbnailStartIndex / thumbnailsPerView) === pageIndex;
                          return (
                            <button
                              key={pageIndex}
                              onClick={() => setThumbnailStartIndex(pageIndex * thumbnailsPerView)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                isActive ? 'bg-blue-500 w-4' : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tabs - Completamente rediseñado para móviles */}
              <div className="border-b border-gray-200 mb-6 px-4 lg:px-0">
                <nav className="flex overflow-x-auto scrollbar-hide">
                  {[
                    { id: 'overview', label: 'Resumen' },
                    { id: 'specs', label: 'Especificaciones' },
                    { id: 'features', label: 'Equipamiento' },
                    { id: 'dealer', label: 'Concesionario' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 py-3 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content - Mejorado para móviles */}
              <div className="space-y-6 px-4 lg:px-0">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Descripción</h3>
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">{car.description}</p>
                    
                    {/* Key Specifications Grid - Optimizado para móviles */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Año</p>
                        <p className="font-bold text-gray-900 text-lg">{car.year}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Gauge className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Kilómetros</p>
                        <p className="font-bold text-gray-900 text-lg">{car.mileage.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Fuel className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Combustible</p>
                        <p className="font-bold text-gray-900 text-sm">{car.fuel}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Settings className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Potencia</p>
                        <p className="font-bold text-gray-900 text-lg">{car.power} CV</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Especificaciones técnicas</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Motor y rendimiento</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Motor</span>
                            <span className="font-medium">{car.engine}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Transmisión</span>
                            <span className="font-medium">{car.transmission}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Potencia</span>
                            <span className="font-medium">{car.power} CV</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Características</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Carrocería</span>
                            <span className="font-medium">{car.bodyType}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Puertas</span>
                            <span className="font-medium">{car.doors}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Plazas</span>
                            <span className="font-medium">{car.seats}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Color</span>
                            <span className="font-medium">{car.color}</span>
                          </div>
                        </div>
                      </div>

                      {(car.co2Emissions || car.euroStandard || car.warrantyMonths) && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Información adicional</h4>
                          <div className="space-y-3">
                            {car.co2Emissions && (
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Emisiones CO2</span>
                                <span className="font-medium">{car.co2Emissions} g/km</span>
                              </div>
                            )}
                            {car.euroStandard && (
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Normativa</span>
                                <span className="font-medium">{car.euroStandard}</span>
                              </div>
                            )}
                            {car.warrantyMonths && (
                              <div className="flex justify-between py-2">
                                <span className="text-gray-600">Garantía</span>
                                <span className="font-medium">{car.warrantyMonths} meses</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Equipamiento</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'dealer' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Información del concesionario</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center space-x-4 mb-6">
                        {car.dealership.logo && (
                          <img 
                            src={car.dealership.logo} 
                            alt={car.dealership.name}
                            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xl font-bold text-gray-900">{car.dealership.name}</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="font-medium">{car.dealership.rating}</span>
                            <span className="text-gray-600">({car.dealership.reviews} opiniones)</span>
                            {car.dealership.certified && (
                              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                                Certificado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-900">{car.dealership.address}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-900">{car.dealership.openingHours}</span>
                        </div>
                        {car.dealership.website && (
                          <div className="flex items-center space-x-3">
                            <CarIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <a 
                              href={`https://${car.dealership.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {car.dealership.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Price & Actions - Rediseñado para móviles */}
            <div className="lg:col-span-1 order-2 lg:order-3 px-4 lg:px-0 pb-6 lg:pb-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Price Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                      <span className="text-3xl font-bold text-blue-600">€{car.price.toLocaleString()}</span>
                      {car.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">€{car.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    {car.originalPrice && (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Ahorro: €{(car.originalPrice - car.price).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price Rating */}
                  <div className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${priceInfo.color} mb-4`}>
                    <PriceIcon className="w-5 h-5" />
                    <span className="text-sm font-medium text-center">{priceInfo.text}</span>
                  </div>

                  {/* Lifestyle Tags */}
                  {car.lifestyleTags && car.lifestyleTags.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Ideal para:</p>
                      <div className="flex flex-wrap gap-2">
                        {car.lifestyleTags.map((tag, index) => (
                          <span key={index} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 360° Tour Section */}
                {onView360Tour && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-3 flex items-center space-x-2">
                      <Camera className="w-5 h-5" />
                      <span>Experiencia inmersiva</span>
                    </h4>
                    <button
                      onClick={handleView360Tour}
                      className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Ver Tour 360°</span>
                    </button>
                    <p className="text-xs text-purple-700 mt-2 text-center">
                      Explora el interior del vehículo en 360°
                    </p>
                  </div>
                )}

                {/* Share Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Compartir este coche</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Compartir</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center justify-center px-3 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      title="Copiar enlace"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button 
                    onClick={() => onInsuranceCalculator(car)}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Calcular seguro</span>
                  </button>

                  <button 
                    onClick={handleFinancing}
                    className="w-full border border-gray-300 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Euro className="w-5 h-5" />
                    <span>Financiación</span>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-gray-900">Información adicional</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>Ubicación: {car.location}</span>
                    </div>
                    {car.warrantyMonths && (
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 flex-shrink-0" />
                        <span>Garantía: {car.warrantyMonths} meses</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>Última actualización: Hoy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;