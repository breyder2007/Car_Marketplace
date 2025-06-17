export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  fuel: string;
  transmission: string;
  power: number;
  engine: string;
  color: string;
  doors: number;
  seats: number;
  images: string[];
  description: string;
  features: string[];
  dealership: Dealership;
  location: string;
  priceRating: 'excellent' | 'good' | 'fair' | 'high';
  isNew: boolean;
  isCertified: boolean;
  warrantyMonths?: number;
  co2Emissions?: number;
  euroStandard?: string;
  bodyType: string;
  lifestyleTags: string[];
  // New fields for enhanced data
  guid?: string;
  sourceUrl?: string;
  extractionDate?: string;
  reference?: string;
  electricVehicleType?: string;
  electricRange?: string;
  isPluggable?: boolean;
  electricPower?: boolean;
  battery?: string;
  batteryCapacity?: string;
  maxSpeed?: string;
  acceleration?: string;
  environmentalBadge?: string;
  tour360Url?: string;
  detailedEquipment?: Record<string, string[]>;
}

export interface Dealership {
  id: string;
  name: string;
  logo?: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  address: string;
  website?: string;
  openingHours: string;
  certified: boolean;
}

export interface SearchFilters {
  brand?: string;
  model?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMax?: number;
  fuel?: string[];
  transmission?: string[];
  dealership?: string;
  bodyType?: string[];
  location?: string;
  lifestyleTag?: string[];
  electricVehicleType?: string[];
  electricRange?: string;
  environmentalBadge?: string[];
}

export interface InsuranceQuote {
  monthly: number;
  annual: number;
  coverage: string;
  provider: string;
}