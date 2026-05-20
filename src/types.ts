// File: src/types.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  desc: string;
  swatches: string[];
}

export interface CartItem extends Product {
  cartKey: string;
  selectedShade: string | null;
  qty: number;
}

export interface INCIIngredient {
  name: string;
  hazard: string;
  function: string;
  desc: string;
}

export interface WorkshopDate {
  id: string;
  date: string;
  location: string;
  capacity: string;
}
