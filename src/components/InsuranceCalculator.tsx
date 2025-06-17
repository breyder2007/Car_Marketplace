import React, { useState } from 'react';
import { X, Shield, Calculator, User, Car as CarIcon, Calendar, Award } from 'lucide-react';
import { Car, InsuranceQuote } from '../types';

interface InsuranceCalculatorProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

const InsuranceCalculator: React.FC<InsuranceCalculatorProps> = ({ car, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    age: '',
    drivingYears: '',
    postalCode: '',
    usage: 'personal',
    coverage: 'comprehensive'
  });
  const [quotes, setQuotes] = useState<InsuranceQuote[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const basePrice = car.price;
      const ageFactor = parseInt(formData.age) < 25 ? 1.5 : parseInt(formData.age) > 50 ? 0.8 : 1.0;
      const experienceFactor = parseInt(formData.drivingYears) < 5 ? 1.3 : 1.0;
      const coverageFactor = formData.coverage === 'comprehensive' ? 1.0 : 0.7;
      
      const baseMonthly = (basePrice * 0.05 / 12) * ageFactor * experienceFactor * coverageFactor;
      
      const mockQuotes: InsuranceQuote[] = [
        {
          monthly: Math.round(baseMonthly * 0.9),
          annual: Math.round(baseMonthly * 0.9 * 12 * 0.85),
          coverage: formData.coverage === 'comprehensive' ? 'Todo Riesgo' : 'Terceros Completo',
          provider: 'Mutua Madrileña'
        },
        {
          monthly: Math.round(baseMonthly),
          annual: Math.round(baseMonthly * 12 * 0.85),
          coverage: formData.coverage === 'comprehensive' ? 'Todo Riesgo' : 'Terceros Completo',
          provider: 'Mapfre'
        },
        {
          monthly: Math.round(baseMonthly * 1.1),
          annual: Math.round(baseMonthly * 1.1 * 12 * 0.85),
          coverage: formData.coverage === 'comprehensive' ? 'Todo Riesgo' : 'Terceros Completo',
          provider: 'AXA'
        }
      ];
      
      setQuotes(mockQuotes);
      setIsCalculating(false);
      setShowResults(true);
    }, 2000);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setQuotes([]);
    setFormData({
      age: '',
      drivingYears: '',
      postalCode: '',
      usage: 'personal',
      coverage: 'comprehensive'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Calculadora de seguro</h2>
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

        <div className="p-6">
          {!showResults ? (
            <>
              {/* Car Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CarIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Vehículo seleccionado</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Marca:</span>
                    <p className="font-medium">{car.brand}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Modelo:</span>
                    <p className="font-medium">{car.model}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Año:</span>
                    <p className="font-medium">{car.year}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor:</span>
                    <p className="font-medium">€{car.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Edad del conductor principal *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="age"
                        required
                        min="18"
                        max="100"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="25"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="drivingYears" className="block text-sm font-medium text-gray-700 mb-2">
                      Años con carné *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="drivingYears"
                        required
                        min="0"
                        max="80"
                        value={formData.drivingYears}
                        onChange={(e) => setFormData({ ...formData, drivingYears: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="5"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Código postal *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    required
                    pattern="[0-9]{5}"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="28001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Uso del vehículo
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="usage"
                        value="personal"
                        checked={formData.usage === 'personal'}
                        onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                        className="mr-3"
                      />
                      <span>Personal</span>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="usage"
                        value="professional"
                        checked={formData.usage === 'professional'}
                        onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                        className="mr-3"
                      />
                      <span>Profesional</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de cobertura
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="coverage"
                        value="comprehensive"
                        checked={formData.coverage === 'comprehensive'}
                        onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                        className="mr-3 mt-1"
                      />
                      <div>
                        <div className="font-medium">Todo Riesgo</div>
                        <div className="text-sm text-gray-600">
                          Cobertura completa: daños propios, terceros, robo, incendio, cristales, etc.
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="coverage"
                        value="third-party"
                        checked={formData.coverage === 'third-party'}
                        onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                        className="mr-3 mt-1"
                      />
                      <div>
                        <div className="font-medium">Terceros Completo</div>
                        <div className="text-sm text-gray-600">
                          Cobertura básica obligatoria + robo, incendio y cristales
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Calculando...</span>
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4" />
                        <span>Calcular seguro</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Results */
            <div className="space-y-6">
              <div className="text-center">
                <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Cotizaciones listas!</h3>
                <p className="text-gray-600">Hemos encontrado las mejores ofertas para tu {car.brand} {car.model}</p>
              </div>

              <div className="space-y-4">
                {quotes.map((quote, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{quote.provider}</h4>
                          <p className="text-sm text-gray-600">{quote.coverage}</p>
                        </div>
                      </div>
                      {index === 0 && (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                          Mejor precio
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">€{quote.monthly}</p>
                        <p className="text-sm text-gray-600">al mes</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">€{quote.annual}</p>
                        <p className="text-sm text-gray-600">al año (descuento incluido)</p>
                      </div>
                    </div>

                    <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Contratar con {quote.provider}
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Consejos para ahorrar</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pago anual: ahorra hasta un 15%</li>
                  <li>• Conductor habitual único: hasta 10% descuento</li>
                  <li>• Garaje privado: hasta 5% descuento adicional</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={resetCalculator}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Nueva cotización
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsuranceCalculator;