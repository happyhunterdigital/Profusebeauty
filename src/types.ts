// File: src/types.ts
export interface Tone {
  name: string;
  hex: string;
}

export interface Review {
  author: string;
  date: string;
  text: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  desc: string;
  swatches: string[];
  image?: string;
  tones?: Tone[];
  reviews?: Review[];
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
