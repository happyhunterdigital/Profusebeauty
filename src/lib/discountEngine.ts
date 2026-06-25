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
  const balanceAfterBogo = subtotal - bogoDiscount;
  
  const normalizedCode = promoCode.trim().toUpperCase();
  if (VALID_PROMOS[normalizedCode]) {
    promoDiscount = balanceAfterBogo * VALID_PROMOS[normalizedCode];
  }

  const totalDiscount = bogoDiscount + promoDiscount;
  const finalTotal = subtotal - totalDiscount;

  return {
    discountedCart,
    subtotal,
    promoDiscount,
    bogoDiscount,
    totalDiscount,
    finalTotal
  };
}
