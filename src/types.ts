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
  swatchLabels?: string[]; // optional caption per swatch image, matched by index. Falls back to filename-derived label when omitted.
  image?: string;
  tones?: Tone[];
  reviews?: Review[];
  sortOrder?: number;
  inStock?: boolean; // defaults to true when omitted. Set to false to show "Out of Stock".
  folder?: string; // groups this product under a ProductFolder tile in the shop grid instead of showing it standalone
  subFolder?: string; // optional sub-heading used to segment items within a folder's detail view
  previewHex?: string; // approximate on-screen colour used by the Try-On Live camera tool
}

export interface ProductFolder {
  id: string;
  name: string;
  category: string; // shop tab this folder tile appears under
  heroImage: string;
  description?: string;
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
