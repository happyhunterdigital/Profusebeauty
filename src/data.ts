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
    id: '3-in-1-foundation',
    name: '3-in-1 HD Liquid Foundation',
    price: 350,
    category: 'Face',
    description: 'High-definition, hypoallergenic formula acting as Primer, Concealer, and UV Protection. Designed in Pretoria for diverse South African skin tones and sensitive skin.',
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    shades: SHADES,
    volume: '30ml',
    features: [
      'Primer, Concealer, & UV Defense in one step',
      'Hypoallergenic & cruelty-free formula',
      'Sweat-proof and oxidation-resistant for under SA boardroom lights',
      'Non-comedogenic (won\'t clog sensitive pores)'
    ]
  },
  {
    id: 'setting-powder',
    name: 'Micro Pearl HD Perfecting Setting Powder',
    price: 250,
    category: 'Setting',
    description: 'Ultra-refined zero-irritation setting powder lock-in formulation. Leaves a soft airbrush satin touch, tailored for busy mothers with active, demanding days.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    volume: '15g',
    features: [
      'Flashback-free translucent micro-pearl formulation',
      'Prevents shine during school runs & executive routines',
      'Dermatologically tested for hyper-sensitive skin'
    ]
  },
  {
    id: 'the-bomb-lipstick',
    name: '“The Bomb” Velvet Matte Lipstick',
    price: 185,
    category: 'Lips',
    description: 'Indestructible, highly pigment-rich velvet matte formula celebrating local beauty. Glides on buttery soft and sits weightslessly all day.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    volume: '3.8g',
    shades: [
      { id: 'l1', name: 'Pretoria Plum', hex: '#54121A' },
      { id: 'l2', name: 'Soweto Rose', hex: '#BA434F' },
      { id: 'l3', name: 'Karoo Peach', hex: '#DF8877' },
      { id: 'l4', name: 'Bo-Kaap Coral', hex: '#E06B4D' }
    ],
    features: [
      'Nutrient-enriched with organic shea butter & Kalahari melon seed oil',
      'Zero cracking or feathering',
      'Elegant magnetic satin-brass case'
    ]
  },
  {
    id: 'pro-brush-set',
    name: '11-Piece Professional Studio Brush Set',
    price: 599,
    category: 'Accessories',
    description: 'Expertly engineered, premium synthetic fiber brush kit designed by Marcia Kgaphola for professional makeup artists and daily beauty enthusiasts.',
    image: 'https://images.unsplash.com/photo-1590156546746-c222ff47280c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    volume: '11 Brushes',
    features: [
      'Hypoallergenic cruelty-free synthetic charcoal-infused bristles',
      'Solid heavy African teakwood handle base with brass ferrules',
      'Comes with a luxury roll-up vegan leather organizer'
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
