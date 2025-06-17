import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Car, Heart, Bell, Search, Star, Shield, CheckCircle, ToggleLeft as Google, Facebook, Apple } from 'lucide-react';

interface LoginPageProps {
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      alert('¡Bienvenido de vuelta!\n\nInicio de sesión exitoso. Ahora puedes acceder a todas las funciones premium.');
    } else {
      alert('¡Cuenta creada exitosamente!\n\nTe hemos enviado un email de confirmación. Ya puedes empezar a usar todas las funciones premium.');
    }
    onBack();
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Iniciando sesión con ${provider}...\n\nEsta funcionalidad estará disponible próximamente.`);
  };

  const benefits = [
    {
      icon: Heart,
      title: 'Favoritos ilimitados',
      description: 'Guarda todos los coches que te interesen sin límites'
    },
    {
      icon: Bell,
      title: 'Alertas personalizadas',
      description: 'Recibe notificaciones cuando aparezcan coches que coincidan con tus criterios'
    },
    {
      icon: Search,
      title: 'Búsquedas guardadas',
      description: 'Guarda tus búsquedas favoritas y accede a ellas rápidamente'
    },
    {
      icon: Star,
      title: 'Ofertas exclusivas',
      description: 'Acceso prioritario a ofertas especiales y descuentos'
    },
    {
      icon: Car,
      title: 'Historial de vehículos',
      description: 'Mantén un registro de todos los coches que has visto'
    },
    {
      icon: Shield,
      title: 'Compra protegida',
      description: 'Garantías adicionales y soporte premium en tus compras'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isLogin ? 'Accede a tu cuenta premium' : 'Únete a la comunidad AutoElite'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Descubre las ventajas de tener una cuenta
                </h2>
                <p className="text-xl text-gray-600">
                  Accede a funciones exclusivas y mejora tu experiencia de compra
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 hover:shadow-md transition-all">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-green-900">100% Gratuito</h3>
                </div>
                <p className="text-green-800 text-sm">
                  Crear una cuenta es completamente gratis y siempre lo será. 
                  Sin costes ocultos ni suscripciones.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              {/* Toggle Buttons */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    isLogin 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    !isLogin 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Crear cuenta
                </button>
              </div>

              {/* Social Login */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Google className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-gray-700">
                    {isLogin ? 'Continuar con Google' : 'Registrarse con Google'}
                  </span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Apple')}
                    className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Apple className="w-5 h-5 text-gray-900" />
                    <span className="font-medium text-gray-700">Apple</span>
                  </button>
                </div>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con email</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tu nombre completo"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 8 caracteres con al menos una mayúscula y un número
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar contraseña *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                        required={!isLogin}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                        required={!isLogin}
                      />
                      <span className="text-sm text-gray-700">
                        Acepto los{' '}
                        <a href="#" className="text-blue-600 hover:underline">términos y condiciones</a>
                        {' '}y la{' '}
                        <a href="#" className="text-blue-600 hover:underline">política de privacidad</a>
                      </span>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                      />
                      <span className="text-sm text-gray-700">
                        Quiero recibir ofertas especiales y novedades por email
                      </span>
                    </label>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Recordarme</span>
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
                </button>
              </form>

              {isLogin && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Regístrate gratis
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;