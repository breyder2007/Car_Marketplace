import React, { useState, useEffect } from 'react';
import { X, RotateCcw, ZoomIn, ZoomOut, Move, Eye, ExternalLink, Maximize, Minimize } from 'lucide-react';
import { Car } from '../types';

interface Tour360ModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

const Tour360Modal: React.FC<Tour360ModalProps> = ({ car, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCarInfo, setShowCarInfo] = useState(true);

  // URL del tour 360° real
  const tour360Url = "https://tour.keepeyeonball.com/Tour/d69fd37c-8c2e-4919-be1d-8ccf53ed8bd5/4K?sc=5&y=180&p=3&tz=102&r=0;0&l=0;0&mz=0&d=0&m=0";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simular tiempo de carga del iframe
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    // Auto-hide controls on mobile after 4 seconds
    if (isMobile && !isLoading) {
      const timer = setTimeout(() => {
        setShowControls(false);
        setShowCarInfo(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isLoading]);

  const handleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const openInNewTab = () => {
    window.open(tour360Url, '_blank', 'noopener,noreferrer');
  };

  const toggleControls = () => {
    setShowControls(!showControls);
    setShowCarInfo(!showCarInfo);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header - Improved mobile layout with better contrast */}
      <div 
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/95 via-black/85 to-transparent text-white p-2 md:p-4 z-20 transition-all duration-300 ${
          isMobile && !showControls ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 min-w-0 flex-1 mr-2">
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-lg flex-shrink-0">
              <Eye className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm md:text-xl font-bold truncate leading-tight">{car.title}</h2>
              <p className="text-xs md:text-sm text-purple-200 truncate leading-tight">Tour Virtual 360°</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 flex-shrink-0">
            <button 
              onClick={openInNewTab}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            {!isMobile && (
              <button 
                onClick={handleFullscreen}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Pantalla completa"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            )}
            
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Cerrar (ESC)"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Controls Toggle - Better positioning and visibility */}
      {isMobile && !isLoading && (
        <button
          onClick={toggleControls}
          className="absolute top-3 left-3 z-30 bg-black/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg border border-white/20"
          style={{ minHeight: '48px', minWidth: '48px' }}
        >
          <Eye className="w-5 h-5" />
        </button>
      )}

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
          <div className="text-center text-white px-4">
            <div className="relative mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="w-6 h-6 md:w-8 md:h-8 text-purple-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Cargando Tour 360°
            </h3>
            <p className="text-sm md:text-base text-gray-300 mb-4">Preparando la experiencia inmersiva...</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* 360° Tour Iframe */}
      {!isLoading && (
        <div className="absolute inset-0 pt-0 md:pt-16">
          <iframe
            src={tour360Url}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={`Tour 360° - ${car.title}`}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      )}

      {/* Car Info Overlay - Completely redesigned for mobile */}
      {!isLoading && (
        <div 
          className={`absolute transition-all duration-300 ${
            isMobile 
              ? `bottom-3 left-3 right-3 ${showCarInfo ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`
              : 'bottom-6 left-6 max-w-sm translate-y-0 opacity-100'
          }`}
        >
          <div className="bg-black/90 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 shadow-2xl">
            {/* Mobile: Compact header */}
            {isMobile ? (
              <div className="p-3">
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={car.images[0]} 
                    alt={car.title}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-base leading-tight truncate">{car.brand} {car.model}</h4>
                    <p className="text-purple-200 text-sm leading-tight">{car.year} • {car.mileage.toLocaleString()} km</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-bold text-purple-400">€{car.price.toLocaleString()}</div>
                    {car.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">€{car.originalPrice.toLocaleString()}</div>
                    )}
                  </div>
                </div>
                
                {/* Mobile: Simplified specs in grid */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-white/10 rounded-lg">
                    <div className="text-white font-medium">{car.fuel}</div>
                    <div className="text-gray-300">Combustible</div>
                  </div>
                  <div className="text-center p-2 bg-white/10 rounded-lg">
                    <div className="text-white font-medium">{car.power} CV</div>
                    <div className="text-gray-300">Potencia</div>
                  </div>
                  <div className="text-center p-2 bg-white/10 rounded-lg">
                    <div className="text-white font-medium">{car.transmission}</div>
                    <div className="text-gray-300">Cambio</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Desktop: Full layout */
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={car.images[0]} 
                    alt={car.title}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-lg truncate">{car.brand} {car.model}</h4>
                    <p className="text-purple-200 text-sm">{car.year} • {car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Combustible:</span>
                    <span className="text-white truncate ml-2">{car.fuel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Potencia:</span>
                    <span className="text-white">{car.power} CV</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Transmisión:</span>
                    <span className="text-white truncate ml-2">{car.transmission}</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Precio:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-purple-400">€{car.price.toLocaleString()}</span>
                      {car.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">€{car.originalPrice.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions Overlay - Better mobile layout */}
      {!isLoading && !isMobile && (
        <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-sm text-white p-4 rounded-xl max-w-xs border border-purple-500/30">
          <h4 className="font-semibold mb-3 flex items-center space-x-2">
            <Move className="w-4 h-4 text-purple-400" />
            <span>Controles del Tour:</span>
          </h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
              <span>Arrastra para rotar la vista</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
              <span>Rueda del ratón para zoom</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
              <span>Clic en puntos para navegar</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
              <span>ESC para salir</span>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Instructions - Improved design */}
      {!isLoading && isMobile && (
        <div 
          className={`absolute bottom-20 right-3 transition-all duration-300 ${
            showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="bg-black/90 backdrop-blur-sm text-white p-3 rounded-xl border border-purple-500/30 shadow-lg max-w-xs">
            <h4 className="font-semibold mb-2 text-sm flex items-center space-x-2">
              <Move className="w-4 h-4 text-purple-400" />
              <span>Controles:</span>
            </h4>
            <ul className="text-xs space-y-1 text-gray-300 leading-relaxed">
              <li>• Toca y arrastra para rotar</li>
              <li>• Pellizca para hacer zoom</li>
              <li>• Toca puntos para navegar</li>
              <li>• Toca el ojo para mostrar/ocultar</li>
            </ul>
          </div>
        </div>
      )}

      {/* Fallback Message - Better mobile positioning */}
      <div 
        className={`absolute ${isMobile ? 'top-16' : 'top-20'} left-1/2 transform -translate-x-1/2 bg-yellow-600/90 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm opacity-0 hover:opacity-100 transition-opacity max-w-xs md:max-w-none text-center ${
          isMobile && !showControls ? 'hidden' : ''
        }`}
      >
        Si el tour no carga, <button onClick={openInNewTab} className="underline font-medium">ábrelo en nueva pestaña</button>
      </div>
    </div>
  );
};

export default Tour360Modal;