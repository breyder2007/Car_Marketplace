import React from 'react';
import { X, TrendingUp, TrendingDown, Minus, Info, Calculator, BarChart3 } from 'lucide-react';
import { Car } from '../types';

interface PriceEvaluationModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

interface PriceRange {
  label: string;
  min: number;
  max: number;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  description: string;
}

const PriceEvaluationModal: React.FC<PriceEvaluationModalProps> = ({ car, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Calculate market price ranges based on car value
  const basePrice = car.price;
  const marketValue = car.originalPrice || basePrice * 1.2;
  
  const priceRanges: PriceRange[] = [
    {
      label: 'Súper oferta',
      min: marketValue * 0.7,
      max: marketValue * 0.85,
      color: 'text-green-700',
      bgColor: 'bg-green-500',
      icon: <TrendingDown className="w-4 h-4" />,
      description: 'Precio excepcional, muy por debajo del mercado'
    },
    {
      label: 'Buen precio',
      min: marketValue * 0.85,
      max: marketValue * 0.95,
      color: 'text-green-600',
      bgColor: 'bg-green-400',
      icon: <TrendingDown className="w-4 h-4" />,
      description: 'Precio atractivo, ligeramente por debajo del mercado'
    },
    {
      label: 'Precio justo',
      min: marketValue * 0.95,
      max: marketValue * 1.05,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-400',
      icon: <Minus className="w-4 h-4" />,
      description: 'Precio en línea con el mercado'
    },
    {
      label: 'Precio alto',
      min: marketValue * 1.05,
      max: marketValue * 1.15,
      color: 'text-orange-600',
      bgColor: 'bg-orange-400',
      icon: <TrendingUp className="w-4 h-4" />,
      description: 'Precio por encima del mercado'
    },
    {
      label: 'Muy caro',
      min: marketValue * 1.15,
      max: marketValue * 1.3,
      color: 'text-red-600',
      bgColor: 'bg-red-400',
      icon: <TrendingUp className="w-4 h-4" />,
      description: 'Precio significativamente alto'
    }
  ];

  // Determine current price position
  const getCurrentPriceRange = () => {
    for (const range of priceRanges) {
      if (basePrice >= range.min && basePrice <= range.max) {
        return range;
      }
    }
    return priceRanges[0]; // Default to best price if below all ranges
  };

  const currentRange = getCurrentPriceRange();
  const pricePosition = ((basePrice - priceRanges[0].min) / (priceRanges[priceRanges.length - 1].max - priceRanges[0].min)) * 100;

  // Calculate savings if applicable
  const savings = car.originalPrice ? car.originalPrice - car.price : 0;
  const savingsPercentage = car.originalPrice ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Evaluación de precio</h2>
              <p className="text-gray-600 mt-1">{car.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Price Overview */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <span className="text-3xl font-bold text-blue-600">€{basePrice.toLocaleString()}</span>
                {car.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">€{car.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {savings > 0 && (
                <div className="flex items-center justify-center space-x-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Ahorro: €{savings.toLocaleString()} ({savingsPercentage}%)
                  </span>
                </div>
              )}
            </div>

            <div className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${currentRange.color} bg-white/70 mb-4`}>
              {currentRange.icon}
              <span className="font-medium">{currentRange.label}</span>
            </div>

            <p className="text-sm text-gray-700 text-center">
              {currentRange.description}
            </p>
          </div>

          {/* Visual Price Scale - Similar to the image */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">El precio es</h3>
            </div>

            <div className="relative bg-gray-50 rounded-2xl p-6">
              {/* Price indicator with current price */}
              <div className="flex items-center mb-6">
                <div className="bg-white border-2 border-gray-800 rounded-lg px-4 py-2 shadow-lg">
                  <span className="text-xl font-bold text-gray-900">€ {basePrice.toLocaleString()}</span>
                </div>
                <div className="flex-1 ml-4">
                  <div className="relative h-8 bg-gradient-to-r from-green-500 via-yellow-400 to-red-400 rounded-lg">
                    {/* Price position indicator */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-gray-800 rounded-full transform -translate-x-1/2"
                      style={{ left: `${Math.min(Math.max(pricePosition, 2), 98)}%` }}
                    >
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price ranges with visual bars */}
              <div className="space-y-3">
                {priceRanges.map((range, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-6 ${range.bgColor} rounded`}></div>
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${range.color}`}>{range.label}</span>
                        {basePrice >= range.min && basePrice <= range.max && (
                          <span className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Tu precio
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        € {Math.round(range.min).toLocaleString()} - € {Math.round(range.max).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Análisis detallado del mercado</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700 font-medium">Valor de mercado estimado:</span>
                  <span className="text-blue-900 font-bold">€{Math.round(marketValue).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 font-medium">Posición en el mercado:</span>
                  <span className="text-blue-900 font-bold">{currentRange.label}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700 font-medium">Diferencia vs. mercado:</span>
                  <span className={`font-bold ${basePrice < marketValue ? 'text-green-600' : 'text-red-600'}`}>
                    {basePrice < marketValue ? '-' : '+'}€{Math.abs(basePrice - marketValue).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 font-medium">Recomendación:</span>
                  <span className="text-blue-900 font-bold">
                    {basePrice < marketValue * 0.9 ? 'Excelente oportunidad' : 
                     basePrice < marketValue ? 'Buen precio' : 'Considerar negociación'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Evaluation Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <h4 className="font-semibold text-gray-900 mb-2">Información sobre la evaluación de precios</h4>
                <p className="mb-3">
                  La evaluación de precios proporciona información sobre la relación precio-rendimiento 
                  de una oferta en comparación con modelos de vehículos similares que se han 
                  anunciado en los últimos 14 meses.
                </p>
                <p className="mb-3">
                  El cálculo del precio de mercado se basa en un algoritmo inteligente que incorpora 
                  más de 10 millones de registros de datos y más de 70 criterios. En general, 
                  asumimos que el vehículo está en buenas condiciones para todas las ofertas.
                </p>
                <div className="bg-blue-100 rounded-lg p-3 mt-4">
                  <h5 className="font-medium text-blue-900 mb-2">Factores considerados en la evaluación:</h5>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Marca, modelo y año del vehículo</li>
                    <li>• Kilometraje y estado general</li>
                    <li>• Equipamiento y características especiales</li>
                    <li>• Ubicación geográfica y demanda local</li>
                    <li>• Tendencias del mercado y estacionalidad</li>
                    <li>• Historial de precios de vehículos similares</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Cerrar
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Compartir evaluación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceEvaluationModal;