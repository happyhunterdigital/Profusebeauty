// File: src/data.ts
import { Product, INCIIngredient, WorkshopDate, ProductFolder } from './types';

// Real per-shade product photography for HD Liquid Foundation.
const FOUNDATION_GALLERY = [
  "https://res.cloudinary.com/dafc66cma/image/upload/v1779370840/HD_Liquid_Foundation_Shade_8.._h1t3qr.jpg",
  "https://res.cloudinary.com/dafc66cma/image/upload/v1779370845/HD_Liquid_Foundation_Shade_06_ufmjya.jpg",
  "https://res.cloudinary.com/dafc66cma/image/upload/v1779370847/HD_Liquid_Foundation_Shade_07_u3jjhi.jpg",
  "https://res.cloudinary.com/dafc66cma/image/upload/v1779370847/HD_Liquid_Foundation_Shade_05_p4801l.jpg",
  "https://res.cloudinary.com/dafc66cma/image/upload/v1779370847/HD_Liquid_Foundation_Shade_35_qbnamt.jpg"
];
const FOUNDATION_GALLERY_LABELS = ['Shade 08', 'Shade 06', 'Shade 07', 'Shade 05', 'Shade 35'];

const FOUNDATION_DESC = 'HD Liquid Foundation - Fixed and covering cosmetics. Soft formula perfectly mattifies and hides skin imperfections. Resistant coating 8 hours with SPF 25.';

// Active shade numbers, per client instruction: 05, 06, 07, 08, 09, 10, 11, 12, 35.
// Shade 3 and shade 4 have been discontinued and removed entirely.
// Approximate skin-tone hex swatches ordered light->deep for the shade picker
// (placeholder tones — replace with exact shade-matched hex codes if you have them).
const FOUNDATION_SHADE_TONES: { shade: string; hex: string }[] = [
  { shade: '05', hex: '#E8C9A0' },
  { shade: '06', hex: '#DDBB8E' },
  { shade: '07', hex: '#D1A97A' },
  { shade: '08', hex: '#C3966A' },
  { shade: '09', hex: '#B3835A' },
  { shade: '10', hex: '#A0714C' },
  { shade: '11', hex: '#8C5F3F' },
  { shade: '12', hex: '#754C32' },
  { shade: '35', hex: '#5C3A25' }
];

// Foundation is a SINGLE product card — clicking it opens the shade picker
// (matches the same "Select Shade" pattern used elsewhere in the store).
const foundationProducts: Product[] = [
  {
    id: 'foundation-hd-liquid',
    name: 'HD Liquid Foundation',
    category: 'Face',
    price: 370.00,
    desc: FOUNDATION_DESC + ' Available in shades: ' + FOUNDATION_SHADE_TONES.map(t => t.shade).join(', ') + '.',
    image: FOUNDATION_GALLERY[0],
    swatches: FOUNDATION_GALLERY,
    swatchLabels: FOUNDATION_GALLERY_LABELS,
    tones: FOUNDATION_SHADE_TONES.map(t => ({ name: `Shade ${t.shade}`, hex: t.hex }))
  }
];

// HD Liquid Concealers & Contours (real product line + photography supplied by client).
const CONCEALER_CONTOUR_DESC = 'Generous 20ml tube — no applicator needed, simply squeeze directly onto skin. Camouflages darkness under the eyes, reduces redness, and eliminates hyperpigmentation. Long-wearing and crease-resistant for all-day wear. Versatile for spot concealing, highlighting, or contouring. Cruelty-free and fragrance-free.';

const concealerProducts: Product[] = [
  {
    id: 'liquid-concealer-1',
    name: 'HD Liquid Concealer #1',
    category: 'Face',
    price: 249.99,
    desc: `Shade 1. Profuse Beauty HD Concealer offers complete coverage in a generous 20ml tube. It camouflages dark circles, redness, and pigmentation while staying crease-resistant and comfortable all day. ${CONCEALER_CONTOUR_DESC}`,
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783799356/HD_Liquid_Concealer_1_kf8isk.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783799356/HD_Liquid_Concealer_1_kf8isk.jpg'],
    folder: 'concealer-contour',
    subFolder: 'Concealer',
    previewHex: '#F3DAB9'
  },
  {
    id: 'liquid-concealer-2',
    name: 'HD Liquid Concealer #2',
    category: 'Face',
    price: 249.99,
    desc: `Shade 2. High Definition Concealer by Profuse Beauty — your secret weapon for flawless, radiant skin. ${CONCEALER_CONTOUR_DESC}`,
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783799355/HD_Liquid_Concealer_2_nn1vpb.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783799355/HD_Liquid_Concealer_2_nn1vpb.jpg'],
    folder: 'concealer-contour',
    subFolder: 'Concealer',
    previewHex: '#E9C9A2'
  },
  {
    id: 'liquid-concealer-3',
    name: 'HD Liquid Concealer #3',
    category: 'Face',
    price: 249.99,
    desc: `Shade 3. High Definition Concealer by Profuse Beauty — your secret weapon for flawless, radiant skin. ${CONCEALER_CONTOUR_DESC}`,
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783799356/HD_Liquid_Concealer_3_dxm3jc.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783799356/HD_Liquid_Concealer_3_dxm3jc.jpg'],
    folder: 'concealer-contour',
    subFolder: 'Concealer',
    previewHex: '#DAB588'
  },
  {
    id: 'liquid-contour-4',
    name: 'HD Liquid Contour #4',
    category: 'Face',
    price: 249.99,
    desc: `Shade 4. High Definition Concealer/Contour by Profuse Beauty — your secret weapon for flawless, radiant skin. ${CONCEALER_CONTOUR_DESC}`,
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783799355/HD_Liquid_Contour_4_u2d5ft.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783799355/HD_Liquid_Contour_4_u2d5ft.jpg'],
    folder: 'concealer-contour',
    subFolder: 'Contour',
    previewHex: '#8B5E3C'
  },
  {
    id: 'liquid-contour-5',
    name: 'HD Liquid Contour #5',
    category: 'Face',
    price: 249.99,
    desc: `Shade 5. High Definition Concealer/Contour by Profuse Beauty — your secret weapon for flawless, radiant skin. ${CONCEALER_CONTOUR_DESC}`,
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783799355/HD_Liquid_Contour_5_ojtayl.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783799355/HD_Liquid_Contour_5_ojtayl.jpg'],
    folder: 'concealer-contour',
    subFolder: 'Contour',
    previewHex: '#6E4A30'
  }
];

// Hero/catalog image + metadata for the "HD Liquid Concealer & Contour" folder tile.
export const CONCEALER_CONTOUR_HERO = 'https://res.cloudinary.com/dafc66cma/image/upload/v1784304425/Profuse_Beauty_Catalog_j7y7vm.png';

// Loose Setting Powder is a SINGLE product card with a shade picker (shades 1, 3, 4)
// — click the anchor image, then pick a shade, per client instruction.
const POWDER_SHADE_TONES: { shade: string; hex: string }[] = [
  { shade: '1', hex: '#F1DCC0' },
  { shade: '3', hex: '#D9B48C' },
  { shade: '4', hex: '#B98A5E' }
];
const powderProducts: Product[] = [
  {
    id: 'powder-hd-perfecting',
    name: 'HD Perfecting Loose Setting Powder',
    category: 'Face',
    price: 250.00,
    desc: 'An extremely lightweight, oil control, long-lasting Perfecting Loose Face Powder that minimizes Pores, Perfects Skin. Sets Makeup and ensures a matte finish. Available in shades: 1, 3, 4.',
    swatches: [],
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1782252210/HD_Perfecting_loose_setting_powder_03_xcvl2u.jpg",
    tones: POWDER_SHADE_TONES.map(t => ({ name: `Shade ${t.shade}`, hex: t.hex }))
  }
];

// --- LIPS ---

// Hero image + metadata for the "Lip Colour" folder tile (groups all
// Lipstick / Matte Lipstick / Lip Gloss / MK Collection products).
export const LIP_COLOUR_HERO = 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193644/MK20_Velvet_Mattelipstick_f46sus.jpg';

// MK Collection singles, extracted from the old grouped MK product.
// Named per the client's cloudinary-filename convention (e.g. MK20_Velvet_Mattelipstick -> "MK 20 Velvet Matte Lipstick").
const mkProducts: Product[] = [
  {
    id: 'mk-01',
    name: 'MK 01 Velvet Matte Lipstick',
    category: 'Lips',
    price: 185.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour. 24 hour-wear, high-fashion matte finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193642/MK01_Velvet_Mattelipstick_lehyd1.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783193642/MK01_Velvet_Mattelipstick_lehyd1.jpg'],
    folder: 'lip-colour',
    subFolder: 'MK Collection',
    previewHex: '#9B1B30'
  },
  {
    id: 'mk-14',
    name: 'MK 14 Velvet Matte Lipstick',
    category: 'Lips',
    price: 185.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour. 24 hour-wear, high-fashion matte finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193567/MK14_Velvet_Mattelipstick_xqck7q.jpg',
    swatches: [
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783193567/MK14_Velvet_Mattelipstick_xqck7q.jpg',
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783193576/MK14_Mattelipstick_ete1lr.jpg'
    ],
    folder: 'lip-colour',
    subFolder: 'MK Collection',
    previewHex: '#7A2048'
  },
  {
    id: 'mk-20',
    name: 'MK 20 Velvet Matte Lipstick',
    category: 'Lips',
    price: 185.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour. 24 hour-wear, high-fashion matte finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193567/MK20_Matte_vi7qux.jpg',
    swatches: [
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783193567/MK20_Matte_vi7qux.jpg',
      'https://res.cloudinary.com/dafc66cma/image/upload/v1783193644/MK20_Velvet_Mattelipstick_f46sus.jpg'
    ],
    folder: 'lip-colour',
    subFolder: 'MK Collection',
    previewHex: '#A85C4D'
  }
];

// Matte Lipstick singles, extracted from the old grouped "Matte Lipsticks" product.
const MATTE_DESC = 'A striking matte lipstick that commands attention. Long-lasting, comfortable, and enriched with Vitamin E for a smooth, non-drying feel. Smudge-proof, transfer-resistant, cruelty-free.';
const matteProducts: Product[] = [
  { id: 'matte-01', shadeImg: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193649/PB_Matte_lipstick_01_qkjqvc.jpg', shadeName: '01', hex: '#B4202A' },
  { id: 'matte-02', shadeImg: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193567/PB_Matte_lipstick_02_qbr26m.jpg', shadeName: '02', hex: '#C43B3B' },
  { id: 'matte-05', shadeImg: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193639/Matte_05_mgfqkp.jpg', shadeName: '05', hex: '#C2687F' },
  { id: 'matte-09', shadeImg: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193573/PB09_Mattelipstick_niaeq4.jpg', shadeName: '09', hex: '#6E2A45' },
  { id: 'matte-11', shadeImg: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193574/Matte_11_iy7vad.jpg', shadeName: '11', hex: '#A15239' },
  { id: 'matte-12', shadeImg: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193643/Matte_12_tddym1.jpg', shadeName: '12', hex: '#9C6470' },
  { id: 'matte-16', shadeImg: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193571/PB_Mattelipstick_16_g6x49u.jpg', shadeName: '16', hex: '#C21E6D' },
  { id: 'matte-skin', shadeImg: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193647/Skin_sbz6dx.jpg', shadeName: 'Skin', hex: '#C48A72' }
].map(({ id, shadeImg, shadeName, hex }) => ({
  id,
  name: `Matte Lipstick - Shade ${shadeName}`,
  category: 'Lips',
  price: 170.00,
  desc: MATTE_DESC,
  image: shadeImg,
  swatches: [shadeImg],
  folder: 'lip-colour',
  subFolder: 'Matte Lipstick',
  previewHex: hex
} as Product));

// Lip Gloss singles, extracted from the old grouped "Profuse Beauty Lip Glosses"
// product + the standalone Lovekiss single. Clear Gloss is the ONLY R160 item.
const glossProducts: Product[] = [
  {
    id: 'gloss-clear',
    name: 'Lip Gloss [Clear]',
    category: 'Lips',
    price: 160.00,
    desc: 'Non-sticky, high-shine clear lip gloss for a glassy finish over any lip colour or worn alone.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193638/PB_Clear_gloss_okxzhm.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783193638/PB_Clear_gloss_okxzhm.jpg'],
    folder: 'lip-colour',
    subFolder: 'Lip Gloss',
    previewHex: '#F1D6CE'
  },
  {
    id: 'gloss-skin',
    name: 'Lip Gloss [Skin]',
    category: 'Lips',
    price: 170.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour, high-fashion finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193652/Skin_Lipgloss_zhyz7t.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783193652/Skin_Lipgloss_zhyz7t.jpg'],
    folder: 'lip-colour',
    subFolder: 'Lip Gloss',
    previewHex: '#CE9C86'
  },
  {
    id: 'gloss-mocca',
    name: 'Lip Gloss [Mocca]',
    category: 'Lips',
    price: 170.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour, high-fashion finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193643/Mocca_c2gjyk.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783193643/Mocca_c2gjyk.jpg'],
    folder: 'lip-colour',
    subFolder: 'Lip Gloss',
    previewHex: '#8B5A3C'
  },
  {
    id: 'gloss-retro',
    name: 'Lip Gloss [Retro]',
    category: 'Lips',
    price: 170.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour, high-fashion finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193575/Retro_Lipgloss_fqs2os.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783193575/Retro_Lipgloss_fqs2os.jpg'],
    folder: 'lip-colour',
    subFolder: 'Lip Gloss',
    previewHex: '#C1442E'
  },
  {
    id: 'gloss-lovekiss',
    name: 'Lip Gloss [Lovekiss]',
    category: 'Lips',
    price: 170.00,
    desc: 'Highly pigmented formula with smooth application which provides a non-drying intense colour, high-fashion finish.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783193568/LoveKiss_ogqzgs.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783193568/LoveKiss_ogqzgs.jpg'],
    folder: 'lip-colour',
    subFolder: 'Lip Gloss',
    previewHex: '#D66E8B'
  }
];

// --- COMBOS (previously buried under a homepage "Segments" carousel — now
// also browsable directly under Shop, per item 10) ---
export const comboProducts: Product[] = [
  { id: 'combo-concealer-brush', name: 'HD Concealer & Brush Set', category: 'Combos', price: 420.00, desc: 'Perfect your base with our high-definition concealer paired with a professional blending brush.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/HD_Concealor_and_brushes_jp4icv.png', swatches: [] },
  { id: 'combo-bogo-assorted', name: 'Buy 1 Get 1 50% Off (Assorted)', category: 'Combos', price: 525.00, desc: 'Mix and match your favorite essentials. The second item is automatically half price in this exclusive bundle.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171429/Buy1_get_1_50_off_qomjhf.png', swatches: [] },
  { id: 'combo-gloss-deep', name: 'Buy 2 Get Gloss Free (Deep)', category: 'Combos', price: 320.00, desc: 'Purchase any two deep shade foundations and receive a high-shine luxury lip gloss absolutely free.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171428/Buy_2_get_gloss_free_ilktqf.png', swatches: [] },
  { id: 'combo-powder-brush', name: 'HD Powder & Brush Duo', category: 'Combos', price: 250.00, desc: 'Set your makeup flawlessly with our HD perfecting powder and matching fluffy powder brush.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171428/Powder_and_brush_yscw2f.png', swatches: [] },
  { id: 'combo-gloss-light', name: 'Buy 2 Get Gloss Free (Light)', category: 'Combos', price: 320.00, desc: 'Purchase any two light/medium shade foundations and receive a high-shine luxury lip gloss absolutely free.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171425/Buy_2_get_gloss_free._vxo5du.png', swatches: [] },
  { id: 'combo-highlighter-brush', name: 'Glow Highlighter & Brush Kit', category: 'Combos', price: 280.00, desc: 'Achieve a blinding, angelic glow with our premium highlighter and precision fan brush.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171424/Highlighter_and_brush._xnjjvo.png', swatches: [] },
  { id: 'combo-foundation-brush', name: 'HD Foundation & Brush Kit', category: 'Combos', price: 450.00, desc: 'Our best-selling 3-in-1 HD Foundation bundled with a professional stippling brush for an airbrushed finish.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171422/Foundation_plus_brush_c9rdpg.png', swatches: [] },
  { id: 'combo-powder-setting-brush', name: 'Perfecting Powder & Brush Combo', category: 'Combos', price: 250.00, desc: 'Lock in your look all day. Includes our lightweight setting powder and a soft-focus setting brush.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171422/HD_Perfecting_powder_and_Powder_brush_jhbqcc.png', swatches: [] },
  { id: 'combo-foundation-duo', name: 'Flawless Foundation Duo', category: 'Combos', price: 460.00, desc: 'The ultimate base kit: HD Liquid Foundation and our signature dense foundation brush.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171420/Foundation_plus_foundation_brush_axposx.png', swatches: [] },
  { id: 'combo-concealer-collection', name: 'Ultimate Concealer Collection', category: 'Combos', price: 520.00, desc: 'Camouflage and brighten with our pro-grade concealers and a set of detail brushes.', image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783171420/Concealor_plus_brushes_t7wgby.png', swatches: [] }
];

export const products: Product[] = [
  ...foundationProducts,
  ...concealerProducts,
  ...powderProducts,

  // New Primer — image supplied by client, marked Out of Stock per item 8.
  // TODO: confirm final price (placeholder R280 below).
  {
    id: 'primer-poreless',
    name: 'Poreless & Smooth Face Primer',
    category: 'Face',
    price: 280.00,
    desc: 'A silky, poreless-finish face primer that smooths texture and preps skin for flawless, longer-lasting foundation wear.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783703533/Poreless_and_Smooth_Face_Primer_whvthf.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783703533/Poreless_and_Smooth_Face_Primer_whvthf.jpg'],
    inStock: false
  },

  // New Setting Spray — image supplied by client, marked Out of Stock per item 8.
  // TODO: confirm final price (placeholder R280 below).
  {
    id: 'setting-spray-2in1',
    name: '2-in-1 Prep & Setting Spray',
    category: 'Face',
    price: 280.00,
    desc: 'A lightweight 2-in-1 mist that preps skin before makeup and locks it in place for all-day wear.',
    image: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783621592/2in1_Prep_Setting_spray_hgk7ks.jpg',
    swatches: ['https://res.cloudinary.com/dafc66cma/image/upload/v1783621592/2in1_Prep_Setting_spray_hgk7ks.jpg'],
    inStock: false
  },

  // --- LIPS ---
  ...mkProducts,
  ...matteProducts,
  ...glossProducts,

  // --- ACCESSORIES / EYES / SKINCARE (unchanged) ---
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
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192527/Profuse_Beauty_model_display_Soft-Eyeshadow_pallet1_dhjf8d.jpg"
    ],
    swatchLabels: ['Soft Eyeshadow Palette', 'Soft & Bold Eyeshadow Palette'],
    folder: 'eyeshadow-pallet',
    reviews: [
      { author: 'Sarah H', date: '24 May 2022', rating: 5, text: 'Gorgeous palette, applies like a dream and lasts well. Has everything you need. Beautiful palette.' },
      { author: 'Michelle T.', date: '2 November 2022', rating: 5, text: 'Absolutely love it! Great size, has everything!' }
    ]
  },
  {
    id: 'p11',
    name: 'Bold-Eyeshadow pallet',
    category: 'Eyes',
    price: 320.00,
    desc: 'Highly pigmented, waterproof, long lasting eyeshadow palette personally mixed mattes, shinners and glitters in one palette for a Queen’s convenience.',
    image: "https://res.cloudinary.com/dafc66cma/image/upload/v1782252211/Bold_eyeshadow_pallet_pm5kub.jpg",
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/v1782252211/Bold_eyeshadow_pallet_pm5kub.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192547/Profuse_Beauty_Soft-bold_Eyeshadow_pallet_twin_r45h0m.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192514/Profuse_Beauty_model_display_Bold-Eyeshadow_pallet._g35bdl.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192514/Profuse_Beauty_model_display_Bold-Eyeshadow_pallet2_sb7daq.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/v1783192500/Profuse_Beauty_model_display_Bold-Eyeshadow_pallet1_m1e6ko.jpg"
    ],
    swatchLabels: ['Bold Eyeshadow Palette', 'Soft & Bold Eyeshadow Palette'],
    folder: 'eyeshadow-pallet',
    reviews: [
      { author: 'Sarah H', date: '24 May 2022', rating: 5, text: 'Gorgeous palette, applies like a dream and lasts well. Has everything you need. Beautiful palette.' },
      { author: 'Michelle T.', date: '2 November 2022', rating: 5, text: 'Absolutely love it! Great size, has everything!' }
    ]
  },
  {
    id: 'p8',
    name: 'Waterproof Makeup Remover',
    category: 'Skincare',
    price: 170.00,
    // TODO(item 6): swap `image`/`swatches` below once the client sends the
    // better product/model photos referenced in items 6 & 7.
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
  },

  ...comboProducts
];

export const PRODUCTS = products;

// Folder tiles rendered in the Shop grid. Any product with a matching
// `folder` id is grouped under the tile instead of shown standalone.
export const FOLDERS: ProductFolder[] = [
  {
    id: 'concealer-contour',
    name: 'HD Liquid Concealer & Contour',
    category: 'Face',
    heroImage: CONCEALER_CONTOUR_HERO,
    description: 'Camouflage, brighten, and sculpt — the full concealer and contour lineup in one place.'
  },
  {
    id: 'lip-colour',
    name: 'Lip Colour',
    category: 'Lips',
    heroImage: LIP_COLOUR_HERO,
    description: 'Lipsticks, mattes, glosses and the MK Collection, all together.'
  },
  {
    id: 'eyeshadow-pallet',
    name: 'Eyeshadow Pallet',
    category: 'Eyes',
    heroImage: 'https://res.cloudinary.com/dafc66cma/image/upload/v1783192547/Profuse_Beauty_Soft-bold_Eyeshadow_pallet_twin_r45h0m.jpg',
    description: 'Soft and Bold — two curated eyeshadow palettes, side by side.'
  }
];

// Re-exported for the Try-On Live camera tool's shade selector.
export const FOUNDATION_SHADES = FOUNDATION_SHADE_TONES;

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
