import React from 'react';
import { Search, TrendingUp, Shield, Award } from 'lucide-react';

interface HeroSectionProps {
  onSearchClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearchClick }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-30"></div>
      
      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Encuentra tu coche
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
              perfecto
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            La plataforma más avanzada de compraventa de vehículos. 
            Búsqueda inteligente, precios justos y la mejor experiencia de compra.
          </p>
          
          <button 
            onClick={onSearchClick}
            className="inline-flex items-center space-x-2 sm:space-x-3 bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Buscar mi coche ideal</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">15% menos</h3>
            <p className="text-sm sm:text-base text-blue-200">precio medio vs. competencia</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">100%</h3>
            <p className="text-sm sm:text-base text-blue-200">vehículos verificados</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">4.9/5</h3>
            <p className="text-sm sm:text-base text-blue-200">satisfacción del cliente</p>
          </div>
        </div>
      </div>

      {/* Floating cars decoration - hidden on mobile */}
      <div className="absolute top-20 right-10 opacity-10 hidden lg:block">
        <div className="w-32 h-32 bg-white rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-20 left-10 opacity-10 hidden lg:block">
        <div className="w-24 h-24 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default HeroSection;