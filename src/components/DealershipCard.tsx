import React from 'react';
import { Star, MapPin, Clock, Award, Car } from 'lucide-react';
import { Dealership } from '../types';

interface DealershipCardProps {
  dealership: Dealership;
  carCount: number;
  onViewInventory: (dealership: Dealership) => void;
}

const DealershipCard: React.FC<DealershipCardProps> = ({ 
  dealership, 
  carCount, 
  onViewInventory 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Header */}
      <div className="relative h-32 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative p-6 h-full flex items-center">
          {dealership.logo && (
            <img 
              src={dealership.logo} 
              alt={dealership.name}
              className="w-16 h-16 rounded-full object-cover bg-white p-1 mr-4"
            />
          )}
          <div className="text-white">
            <h3 className="text-xl font-bold mb-1">{dealership.name}</h3>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm">{dealership.rating}</span>
              <span className="text-sm opacity-75">({dealership.reviews} opiniones)</span>
              {dealership.certified && (
                <Award className="w-4 h-4 text-yellow-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Car className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-blue-600">{carCount}</p>
            <p className="text-sm text-gray-600">Vehículos</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Award className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-green-600">
              {dealership.certified ? 'Certificado' : 'Estándar'}
            </p>
            <p className="text-sm text-gray-600">Estado</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{dealership.address}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{dealership.openingHours}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => onViewInventory(dealership)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Ver inventario ({carCount} coches)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealershipCard;