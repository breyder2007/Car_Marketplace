import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedSection from './components/FeaturedSection';
import SearchFilters from './components/SearchFilters';
import CarCard from './components/CarCard';
import CarDetails from './components/CarDetails';
import InsuranceCalculator from './components/InsuranceCalculator';
import DealershipSection from './components/DealershipSection';
import Tour360Modal from './components/Tour360Modal';
import ImageGalleryModal from './components/ImageGalleryModal';
import PriceEvaluationModal from './components/PriceEvaluationModal';
import FinancingModal from './components/FinancingModal';
import SellCarPage from './components/SellCarPage';
import LoginPage from './components/LoginPage';
import { SearchFilters as SearchFiltersType, Car } from './types';
import { cars } from './data/mockData';
import { Search, Filter, SlidersHorizontal, Grid, List, ArrowLeft } from 'lucide-react';

type ViewMode = 'home' | 'search' | 'dealerships' | 'sell-car' | 'login';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [insuranceCar, setInsuranceCar] = useState<Car | null>(null);
  const [show360Tour, setShow360Tour] = useState(false);
  const [tour360Car, setTour360Car] = useState<Car | null>(null);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [imageGalleryCar, setImageGalleryCar] = useState<Car | null>(null);
  const [imageGalleryIndex, setImageGalleryIndex] = useState(0);
  const [showPriceEvaluation, setShowPriceEvaluation] = useState(false);
  const [priceEvaluationCar, setPriceEvaluationCar] = useState<Car | null>(null);
  const [showFinancing, setShowFinancing] = useState(false);
  const [financingCar, setFinancingCar] = useState<Car | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({});

  // Handle URL routing for car details
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#car/')) {
        const carId = hash.replace('#car/', '');
        const car = cars.find(c => c.id === carId);
        if (car) {
          setSelectedCar(car);
          setShowCarDetails(true);
        }
      } else if (hash === '#search') {
        setCurrentView('search');
      } else if (hash === '#dealerships') {
        setCurrentView('dealerships');
      } else if (hash === '#sell-car') {
        setCurrentView('sell-car');
      } else if (hash === '#login') {
        setCurrentView('login');
      } else if (hash === '' || hash === '#') {
        setCurrentView('home');
        setShowCarDetails(false);
        setSelectedCar(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredCars = useMemo(() => {
    let filtered = cars;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(car => 
        car.title.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.description.toLowerCase().includes(query)
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(car => car.brand === filters.brand);
    }
    if (filters.model) {
      filtered = filtered.filter(car => car.model.toLowerCase().includes(filters.model!.toLowerCase()));
    }
    if (filters.priceMin) {
      filtered = filtered.filter(car => car.price >= filters.priceMin!);
    }
    if (filters.priceMax) {
      filtered = filtered.filter(car => car.price <= filters.priceMax!);
    }
    if (filters.yearMin) {
      filtered = filtered.filter(car => car.year >= filters.yearMin!);
    }
    if (filters.yearMax) {
      filtered = filtered.filter(car => car.year <= filters.yearMax!);
    }
    if (filters.mileageMax) {
      filtered = filtered.filter(car => car.mileage <= filters.mileageMax!);
    }
    if (filters.fuel && filters.fuel.length > 0) {
      filtered = filtered.filter(car => filters.fuel!.includes(car.fuel));
    }
    if (filters.transmission && filters.transmission.length > 0) {
      filtered = filtered.filter(car => filters.transmission!.includes(car.transmission));
    }
    if (filters.bodyType && filters.bodyType.length > 0) {
      filtered = filtered.filter(car => filters.bodyType!.includes(car.bodyType));
    }
    if (filters.dealership) {
      filtered = filtered.filter(car => car.dealership.id === filters.dealership);
    }
    if (filters.lifestyleTag && filters.lifestyleTag.length > 0) {
      filtered = filtered.filter(car => 
        car.lifestyleTags.some(tag => filters.lifestyleTag!.includes(tag))
      );
    }
    if (filters.electricVehicleType && filters.electricVehicleType.length > 0) {
      filtered = filtered.filter(car => 
        car.electricVehicleType && filters.electricVehicleType!.includes(car.electricVehicleType)
      );
    }
    if (filters.environmentalBadge && filters.environmentalBadge.length > 0) {
      filtered = filtered.filter(car => 
        car.environmentalBadge && filters.environmentalBadge!.includes(car.environmentalBadge)
      );
    }

    return filtered;
  }, [searchQuery, filters]);

  const handleSearchClick = () => {
    window.location.hash = '#search';
  };

  const handleDealershipsClick = () => {
    window.location.hash = '#dealerships';
  };

  const handleHomeClick = () => {
    window.location.hash = '#';
  };

  const handleSellCarClick = () => {
    window.location.hash = '#sell-car';
  };

  const handleLoginClick = () => {
    window.location.hash = '#login';
  };

  const handleBackToHome = () => {
    window.location.hash = '#';
  };

  const handleViewDetails = (car: Car) => {
    window.location.hash = `#car/${car.id}`;
  };

  const handleView360Tour = (car: Car) => {
    setTour360Car(car);
    setShow360Tour(true);
  };

  const handleViewImages = (car: Car, imageIndex: number = 0) => {
    setImageGalleryCar(car);
    setImageGalleryIndex(imageIndex);
    setShowImageGallery(true);
  };

  const handleViewPriceEvaluation = (car: Car) => {
    setPriceEvaluationCar(car);
    setShowPriceEvaluation(true);
  };

  const handleInsuranceCalculator = (car: Car) => {
    setInsuranceCar(car);
    setShowInsurance(true);
  };

  const handleFinancing = (car: Car) => {
    setFinancingCar(car);
    setShowFinancing(true);
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleCloseCarDetails = () => {
    setShowCarDetails(false);
    setSelectedCar(null);
    if (currentView === 'search') {
      window.location.hash = '#search';
    } else if (currentView === 'dealerships') {
      window.location.hash = '#dealerships';
    } else {
      window.location.hash = '#';
    }
  };

  // Render different pages based on current view
  if (currentView === 'sell-car') {
    return <SellCarPage onBack={handleBackToHome} />;
  }

  if (currentView === 'login') {
    return <LoginPage onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearchClick={handleSearchClick}
        onDealershipsClick={handleDealershipsClick}
        onInsuranceClick={() => {
          if (cars.length > 0) {
            handleInsuranceCalculator(cars[0]);
          }
        }}
        onSellCarClick={handleSellCarClick}
        onLoginClick={handleLoginClick}
        onHomeClick={handleHomeClick}
      />

      {currentView === 'home' && (
        <>
          <HeroSection onSearchClick={handleSearchClick} />
          <FeaturedSection onViewDetails={handleViewDetails} />
        </>
      )}

      {currentView === 'search' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Enhanced Back to Home Button */}
          <div className="mb-6">
            <button 
              onClick={handleHomeClick}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Volver al inicio</span>
            </button>
          </div>

          {/* Search Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por marca, modelo o características..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filtros</span>
                  {Object.keys(filters).length > 0 && (
                    <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {Object.keys(filters).length}
                    </span>
                  )}
                </button>
                <div className="flex items-center space-x-1 border border-gray-300 rounded-xl p-1 self-center sm:self-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {filteredCars.length} coches encontrados
              </h2>
              <select className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
                <option>Ordenar por relevancia</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Año: más nuevo</option>
                <option>Kilómetros: menos a más</option>
              </select>
            </div>
          </div>

          {/* Car Grid */}
          <div className={`grid gap-4 sm:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={handleViewDetails}
                onView360Tour={car.tour360Url ? handleView360Tour : undefined}
                onViewImages={handleViewImages}
                onViewPriceEvaluation={handleViewPriceEvaluation}
              />
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 px-4">
                Intenta ajustar tus filtros de búsqueda o buscar con otros términos
              </p>
              <button
                onClick={() => {
                  setFilters({});
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      )}

      {currentView === 'dealerships' && (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <button 
              onClick={handleHomeClick}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Volver al inicio</span>
            </button>
          </div>
          <DealershipSection 
            onViewCarDetails={handleViewDetails}
          />
        </>
      )}

      {/* Modals */}
      <SearchFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
      />

      {selectedCar && (
        <CarDetails
          car={selectedCar}
          isOpen={showCarDetails}
          onClose={handleCloseCarDetails}
          onInsuranceCalculator={handleInsuranceCalculator}
          onView360Tour={selectedCar.tour360Url ? handleView360Tour : undefined}
          onViewImages={handleViewImages}
          onFinancing={handleFinancing}
        />
      )}

      {insuranceCar && (
        <InsuranceCalculator
          car={insuranceCar}
          isOpen={showInsurance}
          onClose={() => {
            setShowInsurance(false);
            setInsuranceCar(null);
          }}
        />
      )}

      {financingCar && (
        <FinancingModal
          car={financingCar}
          isOpen={showFinancing}
          onClose={() => {
            setShowFinancing(false);
            setFinancingCar(null);
          }}
        />
      )}

      {tour360Car && (
        <Tour360Modal
          car={tour360Car}
          isOpen={show360Tour}
          onClose={() => {
            setShow360Tour(false);
            setTour360Car(null);
          }}
        />
      )}

      {imageGalleryCar && (
        <ImageGalleryModal
          images={imageGalleryCar.images}
          initialIndex={imageGalleryIndex}
          isOpen={showImageGallery}
          onClose={() => {
            setShowImageGallery(false);
            setImageGalleryCar(null);
          }}
          carTitle={imageGalleryCar.title}
        />
      )}

      {priceEvaluationCar && (
        <PriceEvaluationModal
          car={priceEvaluationCar}
          isOpen={showPriceEvaluation}
          onClose={() => {
            setShowPriceEvaluation(false);
            setPriceEvaluationCar(null);
          }}
        />
      )}
    </div>
  );
}

export default App;