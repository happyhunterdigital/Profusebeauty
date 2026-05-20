// File: src/data.ts
import { Product, INCIIngredient, WorkshopDate } from './types';

export const products: Product[] = [
  { 
    id: 'p1', 
    name: '3-in-1 HD Liquid Foundation', 
    category: 'Face', 
    price: 350.00, 
    desc: 'Hypoallergenic primer, concealer, and UV skin shield.',
    swatches: ["#EED2BA", "#DBB18C", "#BD8C5E", "#A7764A"] 
  },
  { 
    id: 'p2', 
    name: '"The Bomb" Matte Lipstick', 
    category: 'Lips', 
    price: 185.00, 
    desc: 'Ultra-pigmented matte finish, transfer proof and long lasting.',
    swatches: ["#B91C1C", "#991B1B", "#BE185D"] 
  },
  { 
    id: 'p3', 
    name: 'Premium Lip Gloss (Retro)', 
    category: 'Lips', 
    price: 160.00, 
    desc: 'Non-sticky, hydrating wet shine gloss.',
    swatches: ["#F472B6", "#F43F5E"] 
  },
  { 
    id: 'p4', 
    name: '11-Piece Professional Brush Set', 
    category: 'Accessories', 
    price: 599.00, 
    desc: 'Cruelty-free vegan bristles with structured bamboo shafts.',
    swatches: [] 
  },
  { 
    id: 'p5', 
    name: 'Anniversary Radiance Kit', 
    category: 'Combos', 
    price: 1154.00, 
    desc: 'The complete set of primers, micro powder, and setting glazes.',
    swatches: [] 
  },
  { 
    id: 'p6', 
    name: "Promise's Signature Bundle", 
    category: 'Combos', 
    price: 1340.00, 
    desc: 'MUA favorites: foundation, powder, setting spray, and matte lip.',
    swatches: [] 
  },
  { 
    id: 'p7', 
    name: 'HD Perfecting Setting Powder', 
    category: 'Setting', 
    price: 250.00, 
    desc: 'Micro Pearl PB01 formulations to eliminate oil and camera flash glare.',
    swatches: ["#FFF", "#FDE68A"] 
  }
];

export const ingredients: INCIIngredient[] = [
  { name: 'Centella Asiatica', hazard: '1/10 (Safe)', function: 'Botanical Skin Calming', desc: 'Promotes rapid healing, ideal for sensitive skin and redness.' },
  { name: 'Titanium Dioxide', hazard: '2/10 (Safe)', function: 'Physical UV Blocker', desc: 'Provides non-irritating SPF shielding against harsh SA sun rays.' },
  { name: 'Mica Pearls', hazard: '1/10 (Safe)', function: 'Mineral Luminescence', desc: 'Reflects ambient lighting for an organic, natural glow finish.' },
  { name: 'Hyaluronic Acid', hazard: '1/10 (Safe)', function: 'Moisture Humectant', desc: 'Pulls hydration deep into cellular levels to plump dry areas.' }
];

export const workshopDates: WorkshopDate[] = [
  { id: 'w1', date: 'October 12, 2025', location: 'Pretoria Brooklyn Studio', capacity: '2 Seats Left' },
  { id: 'w2', date: 'October 24, 2025', location: 'Pretoria Brooklyn Studio', capacity: '4 Seats Left' },
  { id: 'w3', date: 'November 08, 2025', location: 'Pretoria Brooklyn Studio', capacity: '6 Seats Left' }
];
