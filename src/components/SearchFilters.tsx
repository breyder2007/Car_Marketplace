import React from 'react';
import { X, Filter } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';
import { 
  brands, 
  fuelTypes, 
  transmissionTypes, 
  bodyTypes, 
  lifestyleTags, 
  dealerships,
  electricVehicleTypes,
  environmentalBadges
} from '../data/mockData';

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onApplyFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters
}) => {
  if (!isOpen) return null;

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleArrayFilterChange = (key: keyof SearchFiltersType, value: string, checked: boolean) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    onFiltersChange({ ...filters, [key]: newArray.length > 0 ? newArray : undefined });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Filtros de búsqueda</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Precio */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Precio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desde</label>
                <input
                  type="number"
                  value={filters.priceMin || ''}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="€ Mínimo"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hasta</label>
                <input
                  type="number"
                  value={filters.priceMax || ''}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="€ Máximo"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Marca y Modelo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Marca</h3>
              <select
                value={filters.brand || ''}
                onChange={(e) => handleFilterChange('brand', e.target.value || undefined)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="">Todas las marcas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Modelo</h3>
              <input
                type="text"
                value={filters.model || ''}
                onChange={(e) => handleFilterChange('model', e.target.value || undefined)}
                placeholder="Escribir modelo"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Año */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Año</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desde</label>
                <input
                  type="number"
                  value={filters.yearMin || ''}
                  onChange={(e) => handleFilterChange('yearMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Año mínimo"
                  min="2000"
                  max="2024"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hasta</label>
                <input
                  type="number"
                  value={filters.yearMax || ''}
                  onChange={(e) => handleFilterChange('yearMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Año máximo"
                  min="2000"
                  max="2024"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Combustible */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Combustible</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {fuelTypes.map(fuel => (
                <label key={fuel} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.fuel || []).includes(fuel)}
                    onChange={(e) => handleArrayFilterChange('fuel', fuel, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{fuel}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vehículos Eléctricos */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Tipo de vehículo eléctrico</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {electricVehicleTypes.map(type => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.electricVehicleType || []).includes(type)}
                    onChange={(e) => handleArrayFilterChange('electricVehicleType', type, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Distintivo Ambiental */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Distintivo ambiental</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {environmentalBadges.map(badge => (
                <label key={badge} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.environmentalBadge || []).includes(badge)}
                    onChange={(e) => handleArrayFilterChange('environmentalBadge', badge, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{badge}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transmisión */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Transmisión</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {transmissionTypes.map(transmission => (
                <label key={transmission} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.transmission || []).includes(transmission)}
                    onChange={(e) => handleArrayFilterChange('transmission', transmission, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{transmission}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Carrocería */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Tipo de carrocería</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {bodyTypes.map(body => (
                <label key={body} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.bodyType || []).includes(body)}
                    onChange={(e) => handleArrayFilterChange('bodyType', body, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{body}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Concesionario */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Concesionario</h3>
            <select
              value={filters.dealership || ''}
              onChange={(e) => handleFilterChange('dealership', e.target.value || undefined)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="">Todos los concesionarios</option>
              {dealerships.map(dealer => (
                <option key={dealer.id} value={dealer.id}>{dealer.name}</option>
              ))}
            </select>
          </div>

          {/* Estilo de vida */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Estilo de vida</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {lifestyleTags.map(tag => (
                <label key={tag} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.lifestyleTag || []).includes(tag)}
                    onChange={(e) => handleArrayFilterChange('lifestyleTag', tag, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Kilómetros */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Kilómetros máximos</h3>
            <input
              type="number"
              value={filters.mileageMax || ''}
              onChange={(e) => handleFilterChange('mileageMax', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Kilómetros máximos"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 sm:p-6 border-t border-gray-200 bg-gray-50 space-y-3 sm:space-y-0">
          <button 
            onClick={() => onFiltersChange({})}
            className="px-4 sm:px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors text-center"
          >
            Limpiar filtros
          </button>
          <button 
            onClick={onApplyFilters}
            className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;