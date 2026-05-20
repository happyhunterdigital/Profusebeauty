/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Face' | 'Lips' | 'Eyes' | 'Setting' | 'Accessories';
  description: string;
  image: string;
  rating: number;
  shades?: { id: string; name: string; hex: string }[];
  features?: string[];
  volume?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: { id: string; name: string; hex: string };
}

export interface WorkshopBooking {
  type: '1-on-1' | 'Group';
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  attendees: number;
}
