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
  sortOrder?: number;
  inStock?: boolean; // defaults to true when omitted. Set to false to show "Out of Stock".
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
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
