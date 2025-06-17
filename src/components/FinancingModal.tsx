import React, { useState } from 'react';
import { X, Euro, Calculator, TrendingUp, CheckCircle, Info, CreditCard } from 'lucide-react';
import { Car } from '../types';

interface FinancingModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

interface FinancingOption {
  id: string;
  name: string;
  monthlyPayment: number;
  totalAmount: number;
  interestRate: number;
  term: number;
  downPayment: number;
  provider: string;
  features: string[];
  recommended?: boolean;
}

const FinancingModal: React.FC<FinancingModalProps> = ({ car, isOpen, onClose }) => {
  const [downPayment, setDownPayment] = useState(Math.round(car.price * 0.2)); // 20% default
  const [loanTerm, setLoanTerm] = useState(60); // 5 years default
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [showCalculator, setShowCalculator] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate financing options
  const calculateFinancing = (rate: number, term: number, provider: string, features: string[]): FinancingOption => {
    const principal = car.price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalAmount = monthlyPayment * term + downPayment;

    return {
      id: provider.toLowerCase().replace(/\s+/g, '-'),
      name: `Financiación ${provider}`,
      monthlyPayment: Math.round(monthlyPayment),
      totalAmount: Math.round(totalAmount),
      interestRate: rate,
      term,
      downPayment,
      provider,
      features
    };
  };

  const financingOptions: FinancingOption[] = [
    {
      ...calculateFinancing(3.9, loanTerm, 'Banco Santander', [
        'Sin comisiones de apertura',
        'Seguros opcionales incluidos',
        'Gestión 100% online',
        'Aprobación en 24h'
      ]),
      recommended: true
    },
    {
      ...calculateFinancing(4.2, loanTerm, 'BBVA Auto', [
        'Seguro de vida incluido',
        'Carencia de 3 meses',
        'Sin penalización por amortización',
        'App móvil exclusiva'
      ])
    },
    {
      ...calculateFinancing(4.5, loanTerm, 'CaixaBank', [
        'Descuentos por domiciliación',
        'Seguro de desempleo opcional',
        'Asesoramiento personalizado',
        'Red de oficinas nacional'
      ])
    }
  ];

  const handleApplyFinancing = (optionId: string) => {
    setSelectedOption(optionId);
    // Here you would typically redirect to the bank's application process
    alert(`Redirigiendo a la solicitud de financiación con ${financingOptions.find(o => o.id === optionId)?.provider}`);
  };

  const maxAffordablePayment = monthlyIncome ? parseInt(monthlyIncome) * 0.3 : null; // 30% of income rule

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl">
              <Euro className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Financiación</h2>
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
          {/* Car Summary */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-4">
              <img 
                src={car.images[0]} 
                alt={car.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{car.brand} {car.model}</h3>
                <p className="text-gray-600">{car.year} • {car.mileage.toLocaleString()} km</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">€{car.price.toLocaleString()}</div>
                {car.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">€{car.originalPrice.toLocaleString()}</div>
                )}
              </div>
            </div>
          </div>

          {showCalculator && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Calculadora de financiación</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entrada (€)
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max={car.price}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((downPayment / car.price) * 100)}% del precio total
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plazo (meses)
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={36}>3 años (36 meses)</option>
                    <option value={48}>4 años (48 meses)</option>
                    <option value={60}>5 años (60 meses)</option>
                    <option value={72}>6 años (72 meses)</option>
                    <option value={84}>7 años (84 meses)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ingresos mensuales (€) - Opcional
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    placeholder="3000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Para calcular capacidad de pago
                  </p>
                </div>
              </div>

              {maxAffordablePayment && (
                <div className="bg-blue-100 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      <strong>Recomendación:</strong> Con tus ingresos, la cuota máxima recomendada es €{maxAffordablePayment.toLocaleString()}/mes (30% de ingresos)
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Financing Options */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Opciones de financiación disponibles</h3>
            
            {financingOptions.map((option) => (
              <div 
                key={option.id}
                className={`border rounded-xl p-6 transition-all hover:shadow-md ${
                  option.recommended ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      option.recommended ? 'bg-green-500' : 'bg-gray-100'
                    }`}>
                      <CreditCard className={`w-6 h-6 ${
                        option.recommended ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{option.provider}</h4>
                      <p className="text-sm text-gray-600">TIN {option.interestRate}% • {option.term} meses</p>
                    </div>
                  </div>
                  {option.recommended && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Recomendado
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600">€{option.monthlyPayment}</div>
                    <div className="text-sm text-gray-600">Cuota mensual</div>
                    {maxAffordablePayment && (
                      <div className={`text-xs mt-1 ${
                        option.monthlyPayment <= maxAffordablePayment ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {option.monthlyPayment <= maxAffordablePayment ? '✓ Dentro del presupuesto' : '⚠ Supera el presupuesto'}
                      </div>
                    )}
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-xl font-bold text-gray-900">€{option.totalAmount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Importe total</div>
                    <div className="text-xs text-gray-500 mt-1">
                      +€{(option.totalAmount - car.price).toLocaleString()} intereses
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-xl font-bold text-gray-900">€{option.downPayment.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Entrada</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round((option.downPayment / car.price) * 100)}% del precio
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Ventajas incluidas:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApplyFinancing(option.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    option.recommended
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Solicitar financiación con {option.provider}
                </button>
              </div>
            ))}
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 rounded-lg p-4 mt-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <h4 className="font-semibold mb-2">Información importante</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Los cálculos son orientativos y sujetos a aprobación bancaria</li>
                  <li>• Las condiciones finales pueden variar según tu perfil crediticio</li>
                  <li>• Se requiere documentación de ingresos y gastos</li>
                  <li>• El vehículo queda en garantía hasta la finalización del préstamo</li>
                  <li>• Consulta las condiciones específicas con cada entidad</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              {showCalculator ? 'Ocultar' : 'Mostrar'} calculadora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingModal;