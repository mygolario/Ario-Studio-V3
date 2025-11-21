/**
 * Pricing Utilities
 * 
 * Helper functions for displaying prices in different currencies
 * based on locale (FA = Toman, EN = USD)
 */

// Exchange rate: 1 USD ≈ 60,000 Toman
// This can be adjusted based on current market rates
export const EXCHANGE_RATE_TOMAN = 60000

/**
 * Format a number string with proper localization
 * Converts English digits to Persian digits for Farsi locale
 * 
 * @param numStr - Number as string (e.g., "01", "02")
 * @param lang - Language ('fa' | 'en')
 * @returns Localized number string (e.g., "۰۱" for Farsi, "01" for English)
 */
export function formatLocalizedNumber(numStr: string, lang: 'fa' | 'en'): string {
  if (lang === 'fa') {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return numStr.split('').map(d => {
      const digit = parseInt(d)
      return isNaN(digit) ? d : persianDigits[digit]
    }).join('')
  }
  return numStr
}

/**
 * Convert USD price to Toman and format for FA locale
 * 
 * @param priceFromUsd - Price in USD
 * @returns Formatted string like "از ۳۰ میلیون تومان"
 */
export function formatPriceInToman(priceFromUsd: number): string {
  const toman = priceFromUsd * EXCHANGE_RATE_TOMAN
  const millionToman = Math.round(toman / 1_000_000)
  
  // Format with Persian digits
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  const millionTomanStr = millionToman.toString().split('').map(d => persianDigits[parseInt(d)]).join('')
  
  return `از ${millionTomanStr} میلیون تومان`
}

/**
 * Format price based on locale
 * 
 * @param priceFromUsd - Price in USD
 * @param lang - Language ('fa' | 'en')
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted price string
 */
export function formatPrice(priceFromUsd: number | null | undefined, lang: 'fa' | 'en', currency: string | null | undefined = 'USD'): string | null {
  if (!priceFromUsd) return null
  
  if (lang === 'fa') {
    return formatPriceInToman(priceFromUsd)
  }
  
  // English: USD format with + sign
  const symbol = currency === 'USD' ? '$' : currency || 'USD'
  return `From ${symbol}${priceFromUsd.toLocaleString('en-US')}+`
}

