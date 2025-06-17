import React, { useState } from 'react';
import { Search, Car, Calculator, Building2, Menu, X, Plus, User, Home } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onDealershipsClick: () => void;
  onInsuranceClick: () => void;
  onSellCarClick?: () => void;
  onLoginClick?: () => void;
  onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearchClick, 
  onDealershipsClick, 
  onInsuranceClick,
  onSellCarClick,
  onLoginClick,
  onHomeClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  const handleSellCarClick = () => {
    if (onSellCarClick) {
      onSellCarClick();
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.location.hash = '#';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Clickable to go home */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">AutoElite</h1>
              <p className="text-xs text-gray-500">Premium Marketplace</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-gray-900">AutoElite</h1>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={handleHomeClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </button>
            <button 
              onClick={onSearchClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Buscar</span>
            </button>
            <button 
              onClick={onDealershipsClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span>Concesionarios</span>
            </button>
            <button 
              onClick={onInsuranceClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Seguro</span>
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleSellCarClick}
              className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Vender mi coche</span>
            </button>
            <button 
              onClick={handleLoginClick}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Iniciar sesión</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <button 
              onClick={() => handleMenuItemClick(handleHomeClick)}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Inicio</span>
            </button>
            <button 
              onClick={() => handleMenuItemClick(onSearchClick)}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Buscar coches</span>
            </button>
            <button 
              onClick={() => handleMenuItemClick(onDealershipsClick)}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Building2 className="w-5 h-5" />
              <span className="font-medium">Concesionarios</span>
            </button>
            <button 
              onClick={() => handleMenuItemClick(onInsuranceClick)}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span className="font-medium">Calculadora de seguro</span>
            </button>
            
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <button 
                onClick={() => handleMenuItemClick(handleSellCarClick)}
                className="flex items-center space-x-3 w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Vender mi coche</span>
              </button>
              <button 
                onClick={() => handleMenuItemClick(handleLoginClick)}
                className="flex items-center space-x-3 w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Iniciar sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;