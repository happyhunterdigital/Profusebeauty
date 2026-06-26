// File: src/data.ts
import { Product, INCIIngredient, WorkshopDate } from './types';

export const products: Product[] = [
  { 
    id: 'p1', 
    name: '3-in-1 HD Liquid Foundation', 
    category: 'Face', 
    price: 350.00, 
    desc: 'HD Liquid Foundation-Fixed and covering cosmetics. Soft formula perfectly mattifies and hides skin imperfections. Resistant coating 8 hours with SPF 25.',
    swatches: [],
    image: "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370849/HD_Liquid_Foundation_Shade_03._vsccn8.jpg",
    tones: [
      { name: 'Deep Warm Brown', hex: '#7A4A2E' },
      { name: 'Medium Caramel', hex: '#B07040' },
      { name: 'Medium Tan / Warm Beige', hex: '#C89060' },
      { name: 'Light-Medium Peachy Beige', hex: '#DBA878' },
      { name: 'Warm Golden Beige', hex: '#C8A060' },
      { name: 'Light Golden / Honey', hex: '#DCC070' },
      { name: 'Pale Yellow / Porcelain Gold', hex: '#E8D090' }
    ]
  },
  { 
    id: 'p2', 
    name: 'Profuse Beauty Lip Glosses', 
    category: 'Lips', 
    price: 160.00, 
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour. 24 hour-wear, giving you a high-fashion matte finish.',
    swatches: [],
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1780514746/IMG_3579_yeshb8.jpg",
    tones: [
      { name: 'Deep Reddish-Brown / Chocolate', hex: '#7B3320' },
      { name: 'Peachy Nude / Rose Gold', hex: '#C8845A' },
      { name: 'Metallic Gold / Amber', hex: '#D4A520' },
      { name: 'Bright Cherry Red', hex: '#CC1414' },
      { name: 'Medium Purple / Violet', hex: '#8040C0' }
    ]
  },
  { 
    id: 'p3', 
    name: 'Lip Gloss [Lovekiss]', 
    category: 'Lips', 
    price: 160.00, 
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour. 24 hour-wear, giving you a high-fashion matte finish.',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514744/IMG_3635_gxwlkw.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514744/IMG_3555_lljxjz.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514743/IMG_3573_clelw9.jpg"
    ] 
  },
  {
    id: 'p4',
    name: '“The Bomb” Matte Lipstick',
    category: 'Lips',
    price: 185.00,
    desc: 'A striking red matte lipstick that commands attention. Long-lasting, comfortable, and enriched with Vitamin E for a smooth, non-drying feel. This smudge-proof and transfer-resistant formula is cruelty-free and eco-friendly.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1782255275/The_Bomb_Matte_Lipstick_czsxik.png',
    swatches: []
  },
  {
    id: 'p5',
    name: '11-Piece Professional Makeup Brushes',
    category: 'Accessories',
    price: 599.00,
    desc: 'Elevate your makeup routine with the Profuse Beauty Luxury 11-Piece Brush Set. Expertly apply face, eye, and brow products with these soft, professional-grade brushes. Super soft, skin-friendly bristles designed for sensitive skin.',
    swatches: [],
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1782252219/11_Set_Professional_Makeup_brushes_ttav7x.jpg",
    reviews: [
      { author: 'Ken', date: '16 May 2019', rating: 3, text: 'soft and smooth,it requires no effort to make you radiant' },
      { author: 'Emma Kurtzs', date: '17 November 2021', rating: 5, text: 'i am a paint Artist by profession,i know the difference when i hold this brush to my face,it blends and smoothens my face so perfectly.I am not scared of DATES anymore' }
    ]
  },
  {
    id: 'p6',
    name: 'Bold-Eyeshadow pallet',
    category: 'Eyes',
    price: 320.00,
    desc: 'Highly pigmented, waterproof, long lasting eyeshadow palette personally mixed mattes, shinners and glitters in one palette for a Queen’s convenience.',
    swatches: [],
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1782252211/Bold_eyeshadow_pallet_pm5kub.jpg",
    reviews: [
      { author: 'Sarah H', date: '24 May 2022', rating: 5, text: 'Gorgeous palette, applies like a dream and lasts well. Has everything you need. Beautiful palette.' },
      { author: 'Michelle T.', date: '2 November 2022', rating: 5, text: 'Absolutely love it! Great size, has everything!' }
    ]
  },
  {
    id: 'p7',
    name: 'HD Perfecting loose setting powder',
    category: 'Face',
    price: 250.00,
    desc: 'An extremely lightweight, oil control, long-lasting Perfecting Loose Face Powder that minimizes Pores, Perfects Skin. Sets Makeup and ensures a matte Finish.',
    swatches: [],
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1782252210/HD_Perfecting_loose_setting_powder_03_xcvl2u.jpg"
  },
  {
    id: 'p8',
    name: 'Waterproof Makeup Remover',
    category: 'Skincare',
    price: 170.00,
    desc: 'Organic, waterproof liquid oil makeup remover that guarantees healthy skin, free of dead cells and impurities. Cleans and removes makeup from the face, eyes and lips. Moisturizes and softens the skin without leaving a greasy film.',
    swatches: [],
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1782252208/IMG_3675_sbl1ps.jpg",
    reviews: [
      { author: 'Marriam Amros', date: '20 May 2022', rating: 5, text: 'I use it for my oily face,does work for me in a simple way' },
      { author: 'Rose Tyler', date: '5 October 2022', rating: 5, text: 'My face is so smooth,no more grease or oil after using this make up removal,I am gonna order more cos i cant do with my makeup.' }
    ]
  }
];

export const PRODUCTS = products;

export const ingredients: INCIIngredient[] = [
  { name: 'Macadamia Ternifolia Seed Oil', hazard: '1/10 (Safe)', function: 'Natural Emollient', desc: 'A deeply hydrating natural botanical oil rich in fatty acids that nourishes and softens the skin.' },
  { name: 'Moringa Oleifera Seed Oil', hazard: '1/10 (Safe)', function: 'Antioxidant & Moisturizer', desc: 'A natural plant oil known for its anti-aging properties and protecting the skin against environmental stress.' },
  { name: 'Sclerocarya Birrea Seed Oil (Marula Oil)', hazard: '1/10 (Safe)', function: 'Deep Hydration', desc: 'A highly absorbent natural African botanical oil that seals in moisture without a greasy finish.' },
  { name: 'Tocopheryl Acetate (Vitamin E)', hazard: '1/10 (Safe)', function: 'Skin Conditioning', desc: 'A powerful antioxidant that helps heal the skin barrier and protect against free radicals.' },
  { name: 'Titanium Dioxide', hazard: '2/10 (Safe)', function: 'Physical UV Blocker', desc: 'A naturally occurring mineral that provides non-irritating SPF shielding against harsh SA sun rays.' },
  { name: 'Iron Oxides', hazard: '1/10 (Safe)', function: 'Mineral Pigment', desc: 'Natural earth minerals used to create the perfect, hyper-pigmented skin-matching shade.' },
  { name: 'Cyclopentasiloxane & Dimethicone', hazard: '3/10 (Safe)', function: 'Texture & Wear', desc: 'Safe, cosmetic-grade silicones that provide the 24-hour waterproof, smudge-proof, and silky smooth finish.' }
];

export const workshopDates: WorkshopDate[] = [
  { id: 'w1', date: 'October 12, 2025', location: 'Pretoria Brooklyn Studio', capacity: '2 Seats Left' },
  { id: 'w2', date: 'October 24, 2025', location: 'Pretoria Brooklyn Studio', capacity: '4 Seats Left' },
  { id: 'w3', date: 'November 08, 2025', location: 'Pretoria Brooklyn Studio', capacity: '6 Seats Left' }
];
