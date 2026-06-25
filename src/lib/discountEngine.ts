import { CartItem } from '../types';

export interface DiscountResult {
  discountedCart: (CartItem & { 
    originalItemTotal: number;
    discountedItemTotal: number;
    isBogoApplied: boolean;
  })[];
  subtotal: number;
  promoDiscount: number;
  bogoDiscount: number;
  affiliateDiscount: number;
  appliedAffiliateCode: string | null;
  totalDiscount: number;
  finalTotal: number;
}

const VALID_PROMOS: Record<string, number> = {
  'PROFUSE10': 0.10, // 10% off
  'AFFILIATE20': 0.20, // 20% off
};

export function calculateCartTotals(cart: CartItem[], promoCode: string = ''): DiscountResult {
  let subtotal = 0;
  let bogoDiscount = 0;

  // Process BOGO (Buy One Get One Free) for identical items
  const discountedCart = cart.map(item => {
    const originalItemTotal = item.price * item.qty;
    subtotal += originalItemTotal;

    // BOGO Logic: Every 2nd identical item is free
    const freeItems = Math.floor(item.qty / 2);
    const itemBogoSavings = freeItems * item.price;
    bogoDiscount += itemBogoSavings;

    return {
      ...item,
      originalItemTotal,
      discountedItemTotal: originalItemTotal - itemBogoSavings,
      isBogoApplied: freeItems > 0
    };
  });

  // Apply Promo Code (Percentage Off) to the remaining balance AFTER Bogo
  let promoDiscount = 0;
  let affiliateDiscount = 0;
  let appliedAffiliateCode = null;
  const balanceAfterBogo = subtotal - bogoDiscount;
  
  const normalizedCode = promoCode.trim().toUpperCase();
  if (VALID_PROMOS[normalizedCode]) {
    promoDiscount = balanceAfterBogo * VALID_PROMOS[normalizedCode];
  }

  // Affiliate Logic: Check localStorage for active referral
  try {
    const affiliateData = localStorage.getItem('profuse_beauty_affiliate_ref');
    if (affiliateData) {
      const parsed = JSON.parse(affiliateData);
      if (parsed.expires > Date.now()) {
        // Apply a 10% affiliate discount to the remaining balance
        const balanceAfterPromo = balanceAfterBogo - promoDiscount;
        affiliateDiscount = balanceAfterPromo * 0.10; // 10% off
        appliedAffiliateCode = parsed.code;
      } else {
        localStorage.removeItem('profuse_beauty_affiliate_ref');
      }
    }
  } catch (e) {
    console.warn("Could not read affiliate data", e);
  }

  const totalDiscount = bogoDiscount + promoDiscount + affiliateDiscount;
  const finalTotal = subtotal - totalDiscount;

  return {
    discountedCart,
    subtotal,
    promoDiscount,
    bogoDiscount,
    affiliateDiscount,
    appliedAffiliateCode,
    totalDiscount,
    finalTotal
  };
}
