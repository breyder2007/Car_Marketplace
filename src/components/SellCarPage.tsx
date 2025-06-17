import React, { useState } from 'react';
import { 
  ArrowLeft, Car, Euro, Camera, FileText, CheckCircle, 
  Star, TrendingUp, Shield, Clock, Phone, Mail, 
  Upload, MapPin, Calendar, User, Smartphone
} from 'lucide-react';

interface SellCarPageProps {
  onBack: () => void;
}

interface CarInfo {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  condition: string;
  location: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  availableTime: string;
}

const SellCarPage: React.FC<SellCarPageProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [carInfo, setCarInfo] = useState<CarInfo>({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    fuel: '',
    transmission: '',
    condition: '',
    location: ''
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    availableTime: ''
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const steps = [
    { number: 1, title: 'Información del vehículo', icon: Car },
    { number: 2, title: 'Fotos y documentos', icon: Camera },
    { number: 3, title: 'Datos de contacto', icon: User },
    { number: 4, title: 'Valoración y publicación', icon: Euro }
  ];

  const brands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 
    'Ford', 'Seat', 'Renault', 'Peugeot', 'Citroën', 'Opel', 'Nissan'
  ];

  const fuelTypes = ['Gasolina', 'Diésel', 'Eléctrico', 'Híbrido', 'Híbrido enchufable'];
  const transmissionTypes = ['Manual', 'Automático'];
  const conditionTypes = ['Excelente', 'Muy bueno', 'Bueno', 'Regular', 'Necesita reparaciones'];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Simulate image upload
      const newImages = Array.from(files).map((file, index) => 
        `https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`
      );
      setUploadedImages(prev => [...prev, ...newImages].slice(0, 10));
    }
  };

  const calculateEstimatedPrice = () => {
    // Simple price estimation algorithm
    const basePrice = 25000;
    const yearFactor = Math.max(0.5, (parseInt(carInfo.year) - 2010) / 14);
    const mileageFactor = Math.max(0.3, 1 - (parseInt(carInfo.mileage) / 200000));
    const conditionFactor = {
      'Excelente': 1.0,
      'Muy bueno': 0.9,
      'Bueno': 0.8,
      'Regular': 0.6,
      'Necesita reparaciones': 0.4
    }[carInfo.condition] || 0.8;

    const estimated = Math.round(basePrice * yearFactor * mileageFactor * conditionFactor);
    setEstimatedPrice(estimated);
  };

  const handleSubmit = () => {
    calculateEstimatedPrice();
    setCurrentStep(4);
  };

  const handlePublish = () => {
    alert('¡Tu anuncio ha sido publicado con éxito!\n\nRecibirás un email de confirmación y comenzarás a recibir consultas de compradores interesados.');
    onBack();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca *
          </label>
          <select
            value={carInfo.brand}
            onChange={(e) => setCarInfo({ ...carInfo, brand: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Selecciona una marca</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo *
          </label>
          <input
            type="text"
            value={carInfo.model}
            onChange={(e) => setCarInfo({ ...carInfo, model: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: A4, Serie 3, Golf..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Año *
          </label>
          <select
            value={carInfo.year}
            onChange={(e) => setCarInfo({ ...carInfo, year: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Selecciona el año</option>
            {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kilómetros *
          </label>
          <input
            type="number"
            value={carInfo.mileage}
            onChange={(e) => setCarInfo({ ...carInfo, mileage: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="150000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Combustible *
          </label>
          <select
            value={carInfo.fuel}
            onChange={(e) => setCarInfo({ ...carInfo, fuel: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Selecciona el combustible</option>
            {fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transmisión *
          </label>
          <select
            value={carInfo.transmission}
            onChange={(e) => setCarInfo({ ...carInfo, transmission: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Selecciona la transmisión</option>
            {transmissionTypes.map(transmission => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado del vehículo *
          </label>
          <select
            value={carInfo.condition}
            onChange={(e) => setCarInfo({ ...carInfo, condition: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Selecciona el estado</option>
            {conditionTypes.map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={carInfo.location}
              onChange={(e) => setCarInfo({ ...carInfo, location: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Madrid, Barcelona, Valencia..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fotos del vehículo</h3>
        <p className="text-gray-600 mb-6">
          Sube hasta 10 fotos de tu vehículo. Las primeras fotos serán las más visibles en el anuncio.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Arrastra las fotos aquí o haz clic para seleccionar
            </p>
            <p className="text-gray-500">
              Formatos: JPG, PNG, HEIC (máximo 10 fotos)
            </p>
          </label>
        </div>

        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">💡 Consejos para mejores fotos</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Toma fotos en buena iluminación, preferiblemente luz natural</li>
          <li>• Incluye fotos del exterior desde todos los ángulos</li>
          <li>• Muestra el interior: asientos, volante, salpicadero</li>
          <li>• Fotografía el motor y el maletero</li>
          <li>• Incluye detalles importantes: ruedas, documentación</li>
        </ul>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tu nombre completo"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+34 600 000 000"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horario disponible
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={contactInfo.availableTime}
              onChange={(e) => setContactInfo({ ...contactInfo, availableTime: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Lunes a viernes 9:00-18:00"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Método de contacto preferido
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={contactInfo.preferredContact === 'phone'}
              onChange={(e) => setContactInfo({ ...contactInfo, preferredContact: e.target.value as 'phone' })}
              className="mr-3"
            />
            <Phone className="w-5 h-5 text-blue-600 mr-2" />
            <span>Llamada telefónica</span>
          </label>
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={contactInfo.preferredContact === 'email'}
              onChange={(e) => setContactInfo({ ...contactInfo, preferredContact: e.target.value as 'email' })}
              className="mr-3"
            />
            <Mail className="w-5 h-5 text-blue-600 mr-2" />
            <span>Correo electrónico</span>
          </label>
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="preferredContact"
              value="whatsapp"
              checked={contactInfo.preferredContact === 'whatsapp'}
              onChange={(e) => setContactInfo({ ...contactInfo, preferredContact: e.target.value as 'whatsapp' })}
              className="mr-3"
            />
            <Smartphone className="w-5 h-5 text-blue-600 mr-2" />
            <span>WhatsApp</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      {/* Price Estimation */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Euro className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Valoración estimada</h3>
        <div className="text-4xl font-bold text-green-600 mb-4">
          €{estimatedPrice?.toLocaleString()}
        </div>
        <p className="text-green-700 mb-6">
          Basado en {carInfo.brand} {carInfo.model} {carInfo.year} con {parseInt(carInfo.mileage).toLocaleString()} km
        </p>
        <div className="bg-white/70 rounded-lg p-4">
          <p className="text-sm text-green-800">
            Esta valoración es orientativa y puede variar según el estado real del vehículo, 
            equipamiento adicional y condiciones del mercado.
          </p>
        </div>
      </div>

      {/* Car Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Resumen de tu anuncio</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Vehículo:</span>
              <span className="font-medium">{carInfo.brand} {carInfo.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Año:</span>
              <span className="font-medium">{carInfo.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Kilómetros:</span>
              <span className="font-medium">{parseInt(carInfo.mileage).toLocaleString()} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Combustible:</span>
              <span className="font-medium">{carInfo.fuel}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Transmisión:</span>
              <span className="font-medium">{carInfo.transmission}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="font-medium">{carInfo.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ubicación:</span>
              <span className="font-medium">{carInfo.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fotos:</span>
              <span className="font-medium">{uploadedImages.length} imágenes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h5 className="font-semibold text-blue-900 mb-2">Máxima visibilidad</h5>
          <p className="text-sm text-blue-700">
            Tu anuncio aparecerá destacado en nuestras búsquedas
          </p>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h5 className="font-semibold text-green-900 mb-2">Venta segura</h5>
          <p className="text-sm text-green-700">
            Verificamos la identidad de todos los compradores
          </p>
        </div>
        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <Star className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h5 className="font-semibold text-purple-900 mb-2">Soporte premium</h5>
          <p className="text-sm text-purple-700">
            Te ayudamos durante todo el proceso de venta
          </p>
        </div>
      </div>
    </div>
  );

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return carInfo.brand && carInfo.model && carInfo.year && carInfo.mileage && 
               carInfo.fuel && carInfo.transmission && carInfo.condition && carInfo.location;
      case 2:
        return uploadedImages.length >= 3;
      case 3:
        return contactInfo.name && contactInfo.email && contactInfo.phone;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vender mi coche</h1>
                <p className="text-sm text-gray-600">Publica tu anuncio en minutos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${
                    index < steps.length - 1 ? 'flex-1' : ''
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {currentStep === 1 && "Proporciona los datos básicos de tu vehículo"}
              {currentStep === 2 && "Sube fotos atractivas para mostrar tu coche"}
              {currentStep === 3 && "Información para que los compradores te contacten"}
              {currentStep === 4 && "Revisa y publica tu anuncio"}
            </p>
          </div>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={currentStep === 3 ? handleSubmit : handlePublish}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Publicar anuncio</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCarPage;