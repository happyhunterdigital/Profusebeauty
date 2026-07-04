// File: src/data.ts
import { Product, INCIIngredient, WorkshopDate } from './types';

export const products: Product[] = [
  { 
    id: 'p1', 
    name: '3-in-1 HD Liquid Foundation', 
    category: 'Face', 
    price: 350.00, 
    desc: 'HD Liquid Foundation-Fixed and covering cosmetics. Soft formula perfectly mattifies and hides skin imperfections. Resistant coating 8 hours with SPF 25.',
    image: "https://res.cloudinary.com/dafc66cma/image/upload/q_auto,f_auto/v1783191412/Profuse_Beauty_HD_Liquid_Foundation0_uuhpd6.jpg",
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto,f_auto/v1783191412/Profuse_Beauty_HD_Liquid_Foundation0_uuhpd6.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto,f_auto/v1783191411/Profuse_Beauty_HD_Liquid_Foundation_wetoev.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto,f_auto/v1783191407/Profuse_Beauty_HD_Liquid_Foundation1_futje6.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto,f_auto/v1783191407/Profuse_Beauty_HD_Liquid_Foundation2_dfxwkq.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto,f_auto/v1783191406/Profuse_Beauty_HD_Liquid_Foundation4_vmsgkx.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto,f_auto/v1783191404/Profuse_Beauty_HD_Liquid_Foundation3_rje1hd.jpg"
    ],
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
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1783193638/PB_Clear_gloss_okxzhm.jpg",
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193652/Skin_Lipgloss_zhyz7t.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193643/Mocca_c2gjyk.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193638/PB_Clear_gloss_okxzhm.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193575/Retro_Lipgloss_fqs2os.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193568/LoveKiss_ogqzgs.jpg"
    ]
  },
  { 
    id: 'p3', 
    name: 'Lip Gloss [Lovekiss]', 
    category: 'Lips', 
    price: 160.00, 
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour. 24 hour-wear, giving you a high-fashion matte finish.',
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1783193568/LoveKiss_ogqzgs.jpg",
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193568/LoveKiss_ogqzgs.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193652/Skin_Lipgloss_zhyz7t.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193575/Retro_Lipgloss_fqs2os.jpg"
    ] 
  },
  {
    id: 'p4',
    name: 'Matte Lipsticks',
    category: 'Lips',
    price: 185.00,
    desc: 'A striking red matte lipstick that commands attention. Long-lasting, comfortable, and enriched with Vitamin E for a smooth, non-drying feel. This smudge-proof and transfer-resistant formula is cruelty-free and eco-friendly.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193574/Matte_Lipsticks_pyesxq.jpg',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193567/PB_Matte_lipstick_02_qbr26m.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193574/Matte_11_iy7vad.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193571/PB_Mattelipstick_16_g6x49u.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193572/PB_Mattes_dkntcd.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193574/Matte_Lipsticks_pyesxq.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193573/PB09_Mattelipstick_niaeq4.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193636/Matte_16_hnwubc.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193637/PB_Mattelipstick_02_pvfffo.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193639/Matte_05_mgfqkp.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193641/PB11_Mattelipstick_t5ougm.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193643/Matte_12_tddym1.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193647/Skin_sbz6dx.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193649/PB_Matte_lipstick_01_qkjqvc.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193656/Matte_02_qpy5me.jpg"
    ]
  },
  {
    id: 'p10',
    name: 'Lip Colour [MK01] (MK Collection)',
    category: 'Lips',
    price: 170.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour. 24 hour-wear, giving you a high-fashion matte finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193574/MK_Velvet_Matte_lipstick_range_oaesqd.jpg',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193567/MK20_Matte_vi7qux.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193567/MK14_Velvet_Mattelipstick_xqck7q.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193571/PB_Mattelipstick_16_g6x49u.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193574/MK_Velvet_Matte_lipstick_range_oaesqd.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193576/MK14_Mattelipstick_ete1lr.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193642/MK01_Velvet_Mattelipstick_lehyd1.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783193644/MK20_Velvet_Mattelipstick_f46sus.jpg"
    ]
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
    name: 'Soft-Eyeshadow pallet',
    category: 'Eyes',
    price: 320.00,
    desc: 'Highly pigmented, waterproof, long lasting eyeshadow palette personally mixed mattes, shinners and glitters in one palette for a Queen’s convenience.',
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1783192544/Profuse_Beauty_Soft-Eyeshadow_pallet_icsjps.jpg",
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192544/Profuse_Beauty_Soft-Eyeshadow_pallet_icsjps.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192547/Profuse_Beauty_Soft-bold_Eyeshadow_pallet_twin_r45h0m.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192529/Profuse_Beauty_model_display_Soft-Eyeshadow_pallet3_udfjwx.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192528/Profuse_Beauty_model_display_Soft-Eyeshadow_pallet_e0dl66.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192527/Profuse_Beauty_model_display_Soft-Eyeshadow_pallet2_huc78u.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192527/Profuse_Beauty_model_display_Soft-Eyeshadow_pallet1_dhjf8d.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192514/Profuse_Beauty_model_display_Bold-Eyeshadow_pallet._g35bdl.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192514/Profuse_Beauty_model_display_Bold-Eyeshadow_pallet2_sb7daq.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192500/Profuse_Beauty_model_display_Bold-Eyeshadow_pallet1_m1e6ko.jpg"
    ],
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
    desc: 'Cleans and removes makeup from the skin of the face, eyes and lips, removing all types of makeup, including long-lasting and with bright pigments. Moisturizes and softens the skin without leaving a greasy film.',
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1783190860/Profuse_Beauty_Waterproof_Makeup_remover_wa3hof.jpg",
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783190883/Founder_displaying_Waterproof_Makeup_remover_c37vy0.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783190860/Profuse_Beauty_Waterproof_Makeup_remover_wa3hof.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783190860/User_displaying_Profuse_Beauty_Waterproof_Makeup_remover_ntol3o.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783190975/Profuse_Beauty_model_displaying_Waterproof_Makeup_remover_i4ypge.jpg"
    ],
    reviews: [
      { author: 'Marriam Amros', date: '20 May 2022', rating: 5, text: 'I use it for my oily face,does work for me in a simple way' },
      { author: 'Rose Tyler', date: '5 October 2022', rating: 5, text: 'My face is so smooth,no more grease or oil after using this make up removal,I am gonna order more cos i cant do with my makeup.' }
    ]
  },
  {
    id: 'p9',
    name: '10-shades Profuse Beauty Concealer pallet',
    category: 'Face',
    price: 320.00,
    desc: 'Perfect for correcting, contouring, and concealing skin imperfections. Provides professional-grade buildable coverage for all skin types.',
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1783191610/Profuse_Beauty_Concealer_pallet_lwctl8.jpg",
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783191610/Profuse_Beauty_Concealer_pallet_lwctl8.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783191606/10_shades_Profuse_Beauty_Concealer_pallet_zwiooo.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783191603/Profuse_Beauty_Concealer_pallet1_h6d2rv.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783191880/10_shades_Profuse_model_displaying_Beauty_Concealer_pallet_dj5afv.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783191883/10_shades_Profuse_model_displaying_Beauty_Concealer_pallet_2_aqkelg.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783191884/10_shades_Profuse_model_displaying_Beauty_Concealer_pallet_3_glwseq.jpg"
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
