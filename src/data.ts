/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const SHADES = [
  { id: '01', name: 'Sabi Sands Ivory', hex: '#F3E4D3', description: 'Porcelain with soft yellow warm undertone' },
  { id: '02', name: 'Karoo Sandstone', hex: '#EED9C2', description: 'Fair with gentle peach/satin neutral undertone' },
  { id: '03', name: 'Pretoria Rose Gold', hex: '#E6C9AA', description: 'Light-medium with radiant golden undertone' },
  { id: '04', name: 'Highveld Honey', hex: '#DDB490', description: 'Medium with deep warm honey undertone' },
  { id: '05', name: 'Namib Dusk', hex: '#CF9E76', description: 'Medium-tan with warm amber undertones' },
  { id: '06', name: 'Kalahari Clay', hex: '#BF8A60', description: 'Warm tan with rich red-earth undertones' },
  { id: '07', name: 'Zululand Ochre', hex: '#AE764B', description: 'Golden dark with deep olive undertone' },
  { id: '08', name: 'Drakensberg Bronze', hex: '#9B6137', description: 'Dark bronze with glowing neutral undertone' },
  { id: '09', name: 'Madiba Gold', hex: '#874E25', description: 'Deep bronze with vibrant golden undertone' },
  { id: '10', name: 'Limpopo Copper', hex: '#733D14', description: 'Rich deep with warm copper undertones' },
  { id: '11', name: 'Soweto Cocoa', hex: '#63320B', description: 'Rich dark espresso with neutral undertones' },
  { id: '12', name: 'Table Mountain Slate', hex: '#4F2504', description: 'Very deep ebony with cool rich undertones' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'hd-foundation',
    name: 'HD Liquid Foundation',
    price: 350,
    category: 'Face',
    description: 'High-definition, lightweight 3-in-1 formula acts as Liquid Foundation, Concealer, and UV shield. Specially calibrated for South African skin tones.',
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    shades: SHADES,
    volume: '30ml',
    features: [
      '3-in-1 Prime Foundation Liquid Mat',
      'Sweat-resistant under Gauteng sun',
      'Zero chalky feedback under camera flash'
    ]
  },
  {
    id: 'hd-concealer',
    name: 'HD Liquid Concealer',
    price: 260,
    category: 'HD Liquid Concealers',
    description: 'Blemish-blurring, mineral-rich full coverage concealer. Crease-proof, 16-hour matte wear engineered for Pretoria humidity.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    shades: SHADES.slice(0, 6),
    volume: '8ml',
    features: [
      'Full cover skin-matching pigments',
      'Infused with active moisturizing botanicals',
      'Dermatologist tested hypoallergenic'
    ]
  },
  {
    id: 'concealer-palette',
    name: 'MUA Studio Concealer Palette',
    price: 450,
    category: 'Concealer Palette',
    description: 'Multi-tonal professional cream concealer wheel for color-correction and mapping. Ideal for professional makeup artists.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    volume: '15g',
    features: [
      '6 blendable corrective cream shades',
      'Resists shine and melting',
      'Perfect for heavy contour work'
    ]
  },
  {
    id: 'face-primer',
    name: 'Velvet Silk Face Primer',
    price: 320,
    category: 'Face', // submenu: Face Primer
    description: 'Pore-blurring silicone-free primer. Creates an anchor-grip canvas for foundations and locks moisture for eczema-prone skin types.',
    image: 'https://images.unsplash.com/photo-1620804224754-8ac9d4e519c5?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    volume: '35ml',
    features: [
      'Pre-foundation grip master',
      'Talc-free and zero paraben load',
      'Instantly diffuses facial texture and pores'
    ]
  },
  {
    id: 'setting-powder',
    name: 'Micro Pearl HD Perfecting Setting Powder',
    price: 250,
    category: 'Setting', // submenu: HD Perfect setting powder
    description: 'Ultra-refined zero-flashback setting powder. Sets makeup perfectly for busy mothers and creative executives alike.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    volume: '15g',
    features: [
      'Flashback-free translucent dusting',
      'Inhibits oily shine for 12 hours',
      'Locks in foundation with velvet feel'
    ]
  },
  {
    id: 'highlighter',
    name: 'Pretoria Glow Liquid Highlighter',
    price: 285,
    category: 'Face', // submenu: Highlighter
    description: 'Concentrated champagne gold shimmer drop. Blends seamlessly on cheekbones, nose bridge, and brow arch.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    volume: '12ml',
    features: [
      'Metallic gold glow highlighting drops',
      'Layerable sheerness to rich beam luster',
      'Infused with skin-loving rosehip base oil'
    ]
  },
  {
    id: 'waterproof-remover',
    name: 'Purified Aloe Waterproof Makeup Remover',
    price: 195,
    category: 'Face', // submenu: Waterproof Makeup Remover (Other on category list but subgroup Face in header menu)
    description: 'Biphase micellar water fueled with Cape Aloes extracts. Gently lifts heavy foundations and stubborn waterproof items without drying.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    volume: '150ml',
    features: [
      'Lifts waterproof sealants instantly',
      'Enriched with cooling Aloe skin-safe humectant',
      'Fragrance-free formula suited for eczema'
    ]
  },
  {
    id: 'setting-spray',
    name: 'Matte Lock Settings Spray',
    price: 210,
    category: 'Setting',
    description: 'Ultra-fine setting spray mist. Seals cosmetics for up to 18 hours. Formulated to handle outdoor activities and sun exposure.',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    volume: '100ml',
    features: [
      'Micro-mist aerosol free spray',
      'Matte shine guard shield',
      'Humectant matrix prevents skin tight sensation'
    ]
  },
  {
    id: 'eyeshadow-palette',
    name: 'Bold-Eyeshadow Palette',
    price: 620,
    category: 'Eyes',
    description: '18 high-pigment professional shades including metallics, matte earth tones, and Pretoria sunset roses. Butter-smooth formulation.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    volume: '22g',
    features: [
      '18 high-impact professional powders',
      'Zero creasing or fallout',
      'Includes dramatic South African sunset golds'
    ]
  },
  {
    id: 'the-bomb-lipstick',
    name: '“The Bomb” Velvet Matte Lipstick',
    price: 185,
    category: 'Lips',
    description: 'Indestructible, highly pigment-rich velvet matte formula. Glides on buttery soft, offering ultimate bold lip presence.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    volume: '3.8g',
    shades: [
      { id: 'l1', name: 'Pretoria Plum', hex: '#54121A' },
      { id: 'l2', name: 'Soweto Rose', hex: '#BA434F' },
      { id: 'l3', name: 'Karoo Peach', hex: '#DF8877' }
    ],
    features: [
      'Waterproof velvet lipstick base',
      'Kalahari melon oil hydration',
      'Strolls with gorgeous luxury brass cap'
    ]
  },
  {
    id: 'luscious-red-gloss',
    name: 'Luscious Red Lip Gloss',
    price: 160,
    category: 'Lips',
    description: 'High-gloss moisturizing cushion formula. Gives a glass-like red hot finish with zero sticky residue.',
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    volume: '5ml',
    features: [
      'Glistening brilliant liquid formulation',
      'Scented with organic wild peppermint oil',
      'Sleek wand application'
    ]
  },
  {
    id: 'skin-gloss',
    name: 'Skin Lip Gloss',
    price: 160,
    category: 'Lips',
    description: 'Warm cocoa-nude glaze matching South African skin undertones natively. Comforting, long-term hydration formula.',
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    volume: '5ml',
    features: [
      'Perfect daily gloss shield',
      'Zero sticky residue feel',
      'Pretoria classic formula'
    ]
  },
  {
    id: 'retro-gloss',
    name: 'Retro Lip Gloss',
    price: 160,
    category: 'Lips',
    description: 'Vibrant 90s glass shine tinted with a playful rose champagne undertone. Creates plumper looking textures.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    volume: '5ml',
    features: [
      'Plump volume enhancers',
      'Vitamin E nourishing core',
      'Anti-oxidizing organic seed base'
    ]
  },
  {
    id: 'pro-brush-set',
    name: '11-Piece Professional Studio Brush Set',
    price: 599,
    category: 'Accessories',
    description: 'Expertly engineered premium synthetic charcoal-infused bristles. Handcrafted with dense fibers and solid teakwood handles.',
    image: 'https://images.unsplash.com/photo-1590156546746-c222ff47280c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    volume: '11 Brushes',
    features: [
      'Charcoal-infused synthetic anti-bacteria fibers',
      'Teak wood premium handle build',
      'Comes with vegan leather zipper pouch'
    ]
  },
  {
    id: 'hd-essentials-kit',
    name: 'HD Beginners Essentials Makeup Kit',
    price: 850,
    category: 'Combo',
    description: 'Pretoria starter pack containing HD Liquid Foundation, velvet sponge, face primer mini, and micellar water cleaner.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    volume: 'Curated Bundle',
    features: [
      'Premium startup toolkit',
      'R1,100 overall real market valuation',
      'Includes Step-by-Step routine guidebook'
    ]
  },
  {
    id: 'radiance-kit',
    name: "Women's Month Radiance Kit",
    price: 1200,
    category: 'Combo',
    description: 'Limited edition high-end bundle: HD Liquid Foundation, setting spray, Bold-Eyeshadow palette, and three custom lip glosses.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    volume: 'Curated Kit',
    features: [
      'Full luxurious routing components',
      'Beautiful pink keepsake box organizer',
      'R1,600 product bundle valuation'
    ]
  }
];

export const WORKSHOP_DATES = [
  { id: 'date-1', date: '2026-06-06', label: 'Saturday, June 6, 2026' },
  { id: 'date-2', date: '2026-06-13', label: 'Saturday, June 13, 2026' },
  { id: 'date-3', date: '2026-06-20', label: 'Saturday, June 20, 2026' },
  { id: 'date-4', date: '2026-07-04', label: 'Saturday, July 4, 2026' },
];

export const WORKSHOP_TIMES = [
  { id: 'time-morning', value: '10:00 - 13:00', label: 'Morning Session (10:00 AM - 1:00 PM)' },
  { id: 'time-afternoon', value: '14:30 - 17:30', label: 'Afternoon Masterclass (2:30 PM - 5:30 PM)' },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Lerato Maseko',
    role: 'Corporate Human Resources Lead',
    quote: 'The 3-in-1 Liquid Foundation has changed my morning routine entirely! Rushing between prep and board meetings in Sandton in the Pretoria heat used to melt other products. Profuse locks in perfectly!',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150',
    shadeUsed: 'Madiba Gold'
  },
  {
    id: 't-2',
    name: 'Zola Dube',
    role: 'Mother of Two & Lifestyle Creator',
    quote: 'Being a busy mother, I always worried about my kids sliding their fingers across my face, or powders irritating my skin. The Setting Powder is so gentle, completely breathable, and keeps me pristine for up to 12 hours.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    shadeUsed: 'Kalahari Clay'
  },
  {
    id: 't-3',
    name: 'Marcia Kgaphola',
    role: 'Founder & Professional Makeup Artist',
    quote: 'I engineered Profuse Beauty with one absolute standard: high-fidelity, skin-respecting pigments that perform perfectly under bright professional lights and South African heat. It is diverse confidence at its peak.',
    avatar: 'https://images.unsplash.com/photo-1595959183075-c1d09e573ec3?auto=format&fit=crop&q=80&w=150',
    shadeUsed: 'Bo-Kaap Coral'
  }
];

export const VIDEO_SHOWCASES = [
  {
    id: 'v-1',
    title: 'Boardroom To Sunset Glow',
    duration: '0:15',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    speaker: 'Lerato M. (Corporate Director)',
    accent: 'Shade 09 (Madiba Gold)',
    description: 'Watch how Lerato utilizes the 3-in-1 Liquid Foundation to withstand Pretoria summer heat with zero oil-breakthrough all day.'
  },
  {
    id: 'v-2',
    title: 'Gentle Mom-Care Ritual',
    duration: '0:18',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    speaker: 'Zola D. (Creative Mom)',
    accent: 'Micro Pearl Dusting',
    description: 'Zola shows how she applies the ultra-light Zero-Irritation Setting Powder during a chaotic morning with school drops and coffee stops.'
  },
  {
    id: 'v-3',
    title: 'High-Definition Bridal Cut Crease',
    duration: '0:22',
    thumbnail: 'https://images.unsplash.com/photo-1611042553975-0969e0939b6a?auto=format&fit=crop&q=80&w=400',
    speaker: 'Kayla S. (Senior MUA)',
    accent: 'Pro Blend Technique',
    description: 'Watch precision contouring and coverage using the 11-Piece Teakwood brush set with premium high-density synthetic fiber bristles.'
  }
];
