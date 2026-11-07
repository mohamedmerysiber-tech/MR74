import { CurrencyCode, CurrencyConfig, GeolocationData, PlanTier } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  XOF: {
    code: 'XOF',
    symbol: 'FCFA',
    name: 'Franc CFA (UEMOA)',
    rateFromXOF: 1,
    flag: '🇨🇮',
    isCFAZone: true,
  },
  XAF: {
    code: 'XAF',
    symbol: 'FCFA',
    name: 'Franc CFA (CEMAC)',
    rateFromXOF: 1,
    flag: '🇨🇲',
    isCFAZone: true,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateFromXOF: 0.00164, // ~610 XOF = 1 USD (500,000 XOF ~ $820)
    flag: '🇺🇸',
    isCFAZone: false,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateFromXOF: 0.00152449, // Fixed parity 655.957 XOF = 1 EUR
    flag: '🇪🇺',
    isCFAZone: false,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Yen Japonais',
    rateFromXOF: 0.252, // 1 XOF ≈ 0.252 JPY
    flag: '🇯🇵',
    isCFAZone: false,
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Naira Nigérian',
    rateFromXOF: 2.65, // 1 XOF ≈ 2.65 NGN
    flag: '🇳🇬',
    isCFAZone: false,
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    name: 'Cedi Ghanéen',
    rateFromXOF: 0.026,
    flag: '🇬🇭',
    isCFAZone: false,
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    name: 'Rand Sud-Africain',
    rateFromXOF: 0.030,
    flag: '🇿🇦',
    isCFAZone: false,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'Livre Sterling',
    rateFromXOF: 0.00130,
    flag: '🇬🇧',
    isCFAZone: false,
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Dollar Canadien',
    rateFromXOF: 0.00228,
    flag: '🇨🇦',
    isCFAZone: false,
  },
};

export const PRESET_COUNTRIES: Record<string, GeolocationData> = {
  CI: {
    countryCode: 'CI',
    countryName: "Côte d'Ivoire",
    currency: 'XOF',
    city: 'Abidjan',
    isCFAZone: true,
    ip: '197.234.221.45',
  },
  SN: {
    countryCode: 'SN',
    countryName: 'Sénégal',
    currency: 'XOF',
    city: 'Dakar',
    isCFAZone: true,
    ip: '154.124.96.12',
  },
  CM: {
    countryCode: 'CM',
    countryName: 'Cameroun',
    currency: 'XAF',
    city: 'Douala',
    isCFAZone: true,
    ip: '129.0.211.78',
  },
  BF: {
    countryCode: 'BF',
    countryName: 'Burkina Faso',
    currency: 'XOF',
    city: 'Ouagadougou',
    isCFAZone: true,
    ip: '41.138.89.20',
  },
  BJ: {
    countryCode: 'BJ',
    countryName: 'Bénin',
    currency: 'XOF',
    city: 'Cotonou',
    isCFAZone: true,
    ip: '197.234.240.10',
  },
  US: {
    countryCode: 'US',
    countryName: 'États-Unis',
    currency: 'USD',
    city: 'New York / Los Angeles',
    isCFAZone: false,
    ip: '104.28.19.4',
  },
  FR: {
    countryCode: 'FR',
    countryName: 'France (Zone Euro)',
    currency: 'EUR',
    city: 'Paris',
    isCFAZone: false,
    ip: '51.15.82.100',
  },
  JP: {
    countryCode: 'JP',
    countryName: 'Japon (Tokyo)',
    currency: 'JPY',
    city: 'Tokyo / Shibuya',
    isCFAZone: false,
    ip: '133.242.18.99',
  },
  NG: {
    countryCode: 'NG',
    countryName: 'Nigeria',
    currency: 'NGN',
    city: 'Lagos',
    isCFAZone: false,
    ip: '102.89.43.15',
  },
  GB: {
    countryCode: 'GB',
    countryName: 'Royaume-Uni',
    currency: 'GBP',
    city: 'Londres',
    isCFAZone: false,
    ip: '82.165.197.1',
  },
  CA: {
    countryCode: 'CA',
    countryName: 'Canada',
    currency: 'CAD',
    city: 'Montréal / Toronto',
    isCFAZone: false,
    ip: '142.250.72.14',
  },
};

/**
 * Format price in specified currency.
 * In CFA zone (XOF / XAF), values are strictly fixed integers with standard thousands spacing.
 * For international currencies, format with appropriate decimals and symbols.
 */
export function formatCurrency(amountXOF: number, targetCurrency: CurrencyCode): string {
  const currency = CURRENCIES[targetCurrency] || CURRENCIES.XOF;

  if (currency.isCFAZone) {
    // Keep exact integer for FCFA zone
    return `${amountXOF.toLocaleString('fr-FR')} ${currency.symbol}`;
  }

  const converted = amountXOF * currency.rateFromXOF;

  if (targetCurrency === 'JPY') {
    return `${currency.symbol} ${Math.round(converted).toLocaleString('ja-JP')}`;
  }

  if (targetCurrency === 'NGN') {
    return `${currency.symbol} ${Math.round(converted).toLocaleString('en-NG')}`;
  }

  return `${currency.symbol} ${converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function convertAmount(amountXOF: number, targetCurrency: CurrencyCode): number {
  const currency = CURRENCIES[targetCurrency] || CURRENCIES.XOF;
  if (currency.isCFAZone) return amountXOF;
  const converted = amountXOF * currency.rateFromXOF;
  if (targetCurrency === 'JPY' || targetCurrency === 'NGN') {
    return Math.round(converted);
  }
  return Number(converted.toFixed(2));
}

export function convertAnyCurrency(
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): number {
  if (fromCurrency === toCurrency) return amount;
  // Convert to XOF first
  const fromConfig = CURRENCIES[fromCurrency];
  const toConfig = CURRENCIES[toCurrency];
  const inXOF = fromConfig.isCFAZone ? amount : amount / fromConfig.rateFromXOF;
  if (toConfig.isCFAZone) return Math.round(inXOF);
  const result = inXOF * toConfig.rateFromXOF;
  return toCurrency === 'JPY' || toCurrency === 'NGN' ? Math.round(result) : Number(result.toFixed(2));
}
