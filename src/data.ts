// File: src/data.ts
import { Product, INCIIngredient, WorkshopDate } from './types';

export const products: Product[] = [
  { 
    id: 'p1', 
    name: '3-in-1 HD Liquid Foundation', 
    category: 'Face', 
    price: 350.00, 
    desc: 'HD Liquid Foundation-Fixed and covering cosmetics. Thanks to its soft formula, it perfectly mattifies and hides skin imperfections, while maintaining its natural appearance and without leaving a mask feeling. Resistant coating 8 hours. It has a sun protection factor of SPF 25.',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370849/HD_Liquid_Foundation_Shade_03._vsccn8.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370844/HD_Liquid_Foundation_Shade_04_wp7awd.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370847/HD_Liquid_Foundation_Shade_05_p4801l.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370845/HD_Liquid_Foundation_Shade_06_ufmjya.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370847/HD_Liquid_Foundation_Shade_07_u3jjhi.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370853/HD_Liquid_Foundation_Shade_08._bczwc1.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370847/HD_Liquid_Foundation_Shade_35_qbnamt.jpg"
    ] 
  },
  { 
    id: 'p2', 
    name: 'HD Liquid Foundation Set', 
    category: 'Combos', 
    price: 690.00, 
    desc: 'Premium set including professional applicator sponges and base primers.',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370850/Profuse_Beauty_HD_Liquid_Foundation_sets_s03e6m.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370846/Profuse_Beauty_HD_Liquid_Foundation_set_iaykzx.jpg"
    ] 
  },
  { 
    id: 'p3', 
    name: 'HD Liquid Foundation Trio', 
    category: 'Combos', 
    price: 990.00, 
    desc: 'The ultimate MUA trio pack matching multiple South African undertones.',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370844/Profuse_Beauty_HD_Liquid_Foundation_trio_ialzhk.jpg"
    ] 
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
