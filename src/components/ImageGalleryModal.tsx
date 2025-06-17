import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, Share2, RotateCcw } from 'lucide-react';

interface ImageGalleryModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  carTitle: string;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  carTitle
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setRotation(0);
    setImagePosition({ x: 0, y: 0 });
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotateClockwise();
          break;
        case 'l':
        case 'L':
          handleRotateCounterClockwise();
          break;
        case '0':
          resetImageTransform();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetImageTransform();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetImageTransform();
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.25));
  };

  const handleRotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360);
    // Reset position when rotating to avoid displacement
    setImagePosition({ x: 0, y: 0 });
  };

  const handleRotateCounterClockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
    // Reset position when rotating to avoid displacement
    setImagePosition({ x: 0, y: 0 });
  };

  const resetImageTransform = () => {
    setZoom(1);
    setRotation(0);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - imagePosition.x, y: touch.clientY - imagePosition.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      setImagePosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `${carTitle}-image-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${carTitle} - Imagen ${currentIndex + 1}`,
          url: images[currentIndex],
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  // Get rotation display text
  const getRotationText = () => {
    switch (rotation) {
      case 0: return '0°';
      case 90: return '90°';
      case 180: return '180°';
      case 270: return '270°';
      default: return `${rotation}°`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header - Improved mobile layout */}
      <div className="bg-gradient-to-b from-black/90 via-black/80 to-transparent text-white p-3 md:p-4 z-20 flex-shrink-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="min-w-0 flex-1 mr-3">
            <h2 className="text-base md:text-xl font-bold truncate">{carTitle}</h2>
            <p className="text-xs md:text-sm text-gray-300">
              Imagen {currentIndex + 1} de {images.length}
              {rotation !== 0 && (
                <span className="ml-2 text-blue-300">• Rotación: {getRotationText()}</span>
              )}
            </p>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
            {!isMobile && (
              <>
                <button 
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Alejar (tecla -)"
                  disabled={zoom <= 0.25}
                >
                  <ZoomOut className={`w-4 h-4 md:w-5 md:h-5 ${zoom <= 0.25 ? 'opacity-50' : ''}`} />
                </button>
                
                <span className="text-xs md:text-sm px-1 md:px-2 hidden sm:inline min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                
                <button 
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Acercar (tecla +)"
                  disabled={zoom >= 5}
                >
                  <ZoomIn className={`w-4 h-4 md:w-5 md:h-5 ${zoom >= 5 ? 'opacity-50' : ''}`} />
                </button>
                
                <button 
                  onClick={handleRotateCounterClockwise}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Rotar izquierda (tecla L)"
                >
                  <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                
                <button 
                  onClick={handleRotateClockwise}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Rotar derecha (tecla R)"
                >
                  <RotateCw className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <button 
                  onClick={resetImageTransform}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors text-xs md:text-sm px-2 md:px-3"
                  title="Restablecer vista (tecla 0)"
                >
                  Reset
                </button>
              </>
            )}
            
            <button 
              onClick={handleDownload}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Descargar imagen"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            {navigator.share && (
              <button 
                onClick={handleShare}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Compartir imagen"
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
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

      {/* Navigation Arrows - Better mobile positioning */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 md:p-3 rounded-full hover:bg-black/80 transition-all z-10 backdrop-blur-sm"
            title="Imagen anterior (←)"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 md:p-3 rounded-full hover:bg-black/80 transition-all z-10 backdrop-blur-sm"
            title="Imagen siguiente (→)"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </>
      )}

      {/* Main Image - Improved touch handling and rotation */}
      <div 
        className="flex-1 flex items-center justify-center p-4 md:p-16 overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`${carTitle} - Imagen ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-transform duration-300 select-none"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${imagePosition.x / zoom}px, ${imagePosition.y / zoom}px)`,
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            transformOrigin: 'center center'
          }}
          draggable={false}
        />
      </div>

      {/* Mobile Controls - Enhanced with rotation */}
      {isMobile && (
        <div className="absolute top-20 right-3 flex flex-col space-y-2 bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <button 
            onClick={handleZoomIn}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            title="Acercar"
            disabled={zoom >= 5}
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <div className="text-white text-xs text-center px-1 py-1 bg-white/10 rounded">
            {Math.round(zoom * 100)}%
          </div>
          
          <button 
            onClick={handleZoomOut}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            title="Alejar"
            disabled={zoom <= 0.25}
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <div className="border-t border-white/20 my-1"></div>
          
          <button 
            onClick={handleRotateCounterClockwise}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            title="Rotar izquierda"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <div className="text-white text-xs text-center px-1 py-1 bg-white/10 rounded">
            {getRotationText()}
          </div>
          
          <button 
            onClick={handleRotateClockwise}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            title="Rotar derecha"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          
          <div className="border-t border-white/20 my-1"></div>
          
          <button 
            onClick={resetImageTransform}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors text-xs font-medium"
            title="Restablecer"
          >
            Reset
          </button>
        </div>
      )}

      {/* Thumbnail Strip - Improved mobile layout */}
      {images.length > 1 && (
        <div className="bg-black/90 backdrop-blur-sm p-2 md:p-3 flex-shrink-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetImageTransform();
                  }}
                  className={`flex-shrink-0 w-12 h-9 md:w-16 md:h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex 
                      ? 'border-blue-500 ring-2 ring-blue-500/50' 
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Instructions - Enhanced with rotation controls */}
      {!isMobile && (
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-xl text-sm max-w-xs border border-white/20">
          <h4 className="font-semibold mb-2">Controles:</h4>
          <ul className="space-y-1 text-xs text-gray-300">
            <li>← → : Navegar imágenes</li>
            <li>+ - : Zoom in/out</li>
            <li>R : Rotar derecha</li>
            <li>L : Rotar izquierda</li>
            <li>0 : Restablecer vista</li>
            <li>Arrastrar : Mover (con zoom)</li>
            <li>ESC : Cerrar</li>
          </ul>
        </div>
      )}

      {/* Transform Info Display - Shows current transformations */}
      {(zoom !== 1 || rotation !== 0) && (
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-xl text-sm border border-white/20">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <ZoomIn className="w-3 h-3" />
              <span>{Math.round(zoom * 100)}%</span>
            </div>
            {rotation !== 0 && (
              <div className="flex items-center space-x-1">
                <RotateCw className="w-3 h-3" />
                <span>{getRotationText()}</span>
              </div>
            )}
            <button
              onClick={resetImageTransform}
              className="text-blue-300 hover:text-blue-200 underline"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryModal;