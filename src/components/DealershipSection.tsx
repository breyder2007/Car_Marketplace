import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Star, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Dealership, Car, SearchFilters as SearchFiltersType } from '../types';
import { dealerships, cars } from '../data/mockData';
import DealershipCard from './DealershipCard';
import SearchFiltersComponent from './SearchFilters';
import CarCard from './CarCard';

interface DealershipSectionProps {
  onViewCarDetails: (car: Car) => void;
}

const DealershipSection: React.FC<DealershipSectionProps> = ({
  onViewCarDetails
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDealership, setSelectedDealership] = useState<Dealership | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersType>({});

  // Get unique locations
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(dealerships.map(d => d.address.split(',').pop()?.trim()))];
    return uniqueLocations.filter(Boolean);
  }, []);

  // Filter dealerships
  const filteredDealerships = useMemo(() => {
    let filtered = dealerships;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dealer => 
        dealer.name.toLowerCase().includes(query) ||
        dealer.address.toLowerCase().includes(query)
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(dealer => 
        dealer.address.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedLocation]);

  // Get cars for selected dealership with filters
  const dealershipCars = useMemo(() => {
    if (!selectedDealership) return [];

    let filtered = cars.filter(car => car.dealership.id === selectedDealership.id);

    // Apply filters
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
    if (filters.lifestyleTag && filters.lifestyleTag.length > 0) {
      filtered = filtered.filter(car => 
        car.lifestyleTags.some(tag => filters.lifestyleTag!.includes(tag))
      );
    }

    return filtered;
  }, [selectedDealership, filters]);

  const getCarCountForDealer = (dealership: Dealership) => {
    return cars.filter(car => car.dealership.id === dealership.id).length;
  };

  const handleViewInventory = (dealership: Dealership) => {
    setSelectedDealership(dealership);
    setFilters({});
  };

  const handleBackToDealerships = () => {
    setSelectedDealership(null);
    setFilters({});
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  if (selectedDealership) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Dealership Header */}
        <div className="mb-8">
          <button 
            onClick={handleBackToDealerships}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Volver a concesionarios</span>
          </button>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4 mb-4">
              {selectedDealership.logo && (
                <img 
                  src={selectedDealership.logo} 
                  alt={selectedDealership.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedDealership.name}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {selectedDealership.rating} ({selectedDealership.reviews} opiniones)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedDealership.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters for Dealership Inventory */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Inventario de {selectedDealership.name}
              </h3>
              <p className="text-gray-600">
                {dealershipCars.length} vehículos disponibles
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filtros</span>
                {Object.keys(filters).length > 0 && (
                  <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {Object.keys(filters).length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealershipCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onViewDetails={onViewCarDetails}
            />
          ))}
        </div>

        {dealershipCars.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron vehículos
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar los filtros de búsqueda
            </p>
            <button
              onClick={() => setFilters({})}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Filters Modal */}
        <SearchFiltersComponent
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nuestros Concesionarios
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora nuestra red de concesionarios certificados y encuentra el vehículo perfecto
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar concesionario..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">Todas las ubicaciones</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredDealerships.length} concesionarios encontrados
        </h2>
      </div>

      {/* Dealerships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDealerships.map((dealership) => (
          <DealershipCard
            key={dealership.id}
            dealership={dealership}
            carCount={getCarCountForDealer(dealership)}
            onViewInventory={handleViewInventory}
          />
        ))}
      </div>

      {filteredDealerships.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No se encontraron concesionarios
          </h3>
          <p className="text-gray-600 mb-6">
            Intenta ajustar tu búsqueda o ubicación
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLocation('');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </div>
  );
};

export default DealershipSection;