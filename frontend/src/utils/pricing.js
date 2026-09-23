/**
 * Calculates actual (original regular) price, discounted selling price, discount percentage, and total savings.
 * 
 * Supports:
 * - Products with explicit originalPrice and price
 * - Products with badge indicating discount percentage (e.g. "-50%", "-20%", "-15%", "-10%")
 * - Featured Summer Sale items (e.g., Structured Caramel Studio Tote)
 */
export function getProductPricing(product) {
  if (!product) {
    return {
      currentPrice: 0,
      originalPrice: 0,
      discountPercent: 0,
      hasDiscount: false,
      savings: 0
    };
  }

  const currentPrice = Number(product.price) || 0;

  // 1. If explicit originalPrice exists and is higher than currentPrice
  if (product.originalPrice && Number(product.originalPrice) > currentPrice) {
    const originalPrice = Number(Number(product.originalPrice).toFixed(2));
    const savings = Number((originalPrice - currentPrice).toFixed(2));
    const discountPercent = Math.round((savings / originalPrice) * 100);
    return {
      currentPrice,
      originalPrice,
      discountPercent,
      hasDiscount: true,
      savings
    };
  }

  // 2. If badge specifies percentage (e.g. "-50%", "-20%", "-15%", "-10%")
  const badgeStr = (product.badge || '').trim();
  const match = badgeStr.match(/^-?(\d+)%/);
  if (match) {
    const discountPercent = parseInt(match[1], 10);
    if (discountPercent > 0 && discountPercent < 100) {
      // originalPrice = currentPrice / (1 - (discountPercent / 100))
      const originalPrice = Number((currentPrice / (1 - (discountPercent / 100))).toFixed(2));
      const savings = Number((originalPrice - currentPrice).toFixed(2));
      return {
        currentPrice,
        originalPrice,
        discountPercent,
        hasDiscount: true,
        savings
      };
    }
  }

  // 3. Fallback for the Summer Sale featured bag (Structured Caramel Studio Tote)
  if (product.modelNumber === 'BG-STR-04' || (product.name && product.name.toLowerCase().includes('caramel studio tote'))) {
    const discountPercent = 50;
    const originalPrice = Number((currentPrice / (1 - 0.5)).toFixed(2));
    const savings = Number((originalPrice - currentPrice).toFixed(2));
    return {
      currentPrice,
      originalPrice,
      discountPercent,
      hasDiscount: true,
      savings
    };
  }

  return {
    currentPrice,
    originalPrice: currentPrice,
    discountPercent: 0,
    hasDiscount: false,
    savings: 0
  };
}
