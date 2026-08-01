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

// ─── AFFILIATE SYSTEM ──────────────────────────────────────────────────────────

export type AffiliateTier = 'entry' | 'pro' | 'vip';
export type AffiliateStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  status: AffiliateStatus;
  tier: AffiliateTier;
  code: string;               // unique referral code (e.g., "SARAH10")
  customDomain?: string;      // optional vanity domain for direct links
  bankName?: string;          // South African bank name
  bankAccountHolder?: string;
  bankAccountNumber?: string;
  bankBranchCode?: string;
  createdAt?: string;
  approvedAt?: string;
}

export interface AffiliateClick {
  id?: string;
  affiliateId: string;
  affiliateCode: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;           // where the visitor came from
  landingPage?: string;        // page they landed on
  productId?: string;          // if the click targeted a specific product
  timestamp?: number;
  converted?: boolean;         // set to true when a conversion is tied back
}

export interface AffiliateSale {
  id?: string;
  affiliateId: string;
  affiliateCode: string;
  orderId?: string;            // cart/checkout session ref
  mPaymentId?: string;         // Payfast reference
  customerEmail?: string;
  subTotal: number;            // net total (excl. shipping & tax)
  commissionRate: number;      // percentage at time of sale (e.g., 0.10)
  commissionAmount: number;    // computed commission in ZAR
  status: 'pending' | 'approved' | 'paid';
  saleDate?: string;
  matureDate?: string;         // date after which refunds can't claw back
  createdAt?: string;
}

export interface AffiliatePayout {
  id?: string;
  affiliateId: string;
  affiliateCode: string;
  amount: number;
  method?: 'EFT' | 'Payfast' | 'PayJustNow'; // payout method
  note?: string;
  status: 'requested' | 'processing' | 'paid';
  requestedAt?: string;
  paidAt?: string;
}

export interface TierRule {
  tier: AffiliateTier;
  commissionRate: number;      // e.g., 0.10 for 10%
  minMonthlySales?: number;    // threshold to qualify (unlocks next tier)
  label: string;               // e.g., "Starter"
}

export const AFFILIATE_TIER_RULES: TierRule[] = [
  { tier: 'entry', commissionRate: 0.10, minMonthlySales: 0,    label: 'Entry (10%)' },
  { tier: 'pro',   commissionRate: 0.15, minMonthlySales: 5000,  label: 'Pro (15% — R5k+ sales/month)' },
  { tier: 'vip',   commissionRate: 0.20, minMonthlySales: 15000, label: 'VIP (20% — R15k+ sales/month)' },
];

/** Cookie/localStorage key for affiliate attribution */
export const AFFILIATE_ATTRIBUTION_KEY = 'pb_affiliate_ref';
/** Attribution window in days (30-day cookie) */
export const AFFILIATE_ATTRIBUTION_DAYS = 30;
/** Days a commission matures before payout (accounts for returns) */
export const AFFILIATE_PAYOUT_MATURITY_DAYS = 30;

/** SEO + GEO + AEO meta fields unified for reuse across products and posts */
export interface SEOMeta {
  title?: string;
  description?: string;
  keywords?: string[];          // primary + secondary
  ogImage?: string;             // social preview image override
  canonical?: string;           // canonical URL override
  noindex?: boolean;            // tell search engines not to index this page
}

export interface GEOFields {
  addressLocality?: string;      // e.g. "Pretoria"
  addressRegion?: string;        // e.g. "GP" (Gauteng)
  phone?: string;                // associated contact number
  openingHours?: string;         // e.g. "Mon-Fri 09:00-17:00"
  geoLat?: number;
  geoLng?: number;
}

export interface AEOFields {
  faq?: { q: string; a: string }[];           // question-answer pairs for FAQ schema
  shortAnswer?: string;                       // 1-2 sentence summary for answer boxes
  entityName?: string;                        // brand/organization entity (for knowledge graph)
}

export type PublishingStatus = 'draft' | 'published';

export interface Product {
  id: string;
  slug?: string;
  name: string;
  category: string;
  price: number;
  desc: string;
  swatches: string[];
  swatchLabels?: string[];
  image?: string;
  galleryImages?: string[];       // Product gallery — additional lifestyle/gallery shots
  tones?: Tone[];
  reviews?: Review[];
  sortOrder?: number;
  inStock?: boolean;
  folder?: string;
  subFolder?: string;
  previewHex?: string;
  status?: PublishingStatus;      // defaults to 'published' to keep backwards compatible with existing data
  visibility?: string;            // e.g. "Public", "Hidden" — controls whether it appears in shop/search
  seo?: SEOMeta;
  geo?: GEOFields;
  aeo?: AEOFields;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  status?: PublishingStatus;      // defaults to 'published' for existing drafts
  title: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  lastModified?: string;
  tags?: string[];                // product tags — internal linking
  category?: string;              // content category (Guides, Reviews, Trends, etc.)
  excerpt?: string;               // short blurb shown on archive listings (max ~155 chars)
  visibility?: string;            // Public | Hidden
  seo?: SEOMeta;
  geo?: GEOFields;
  aeo?: AEOFields;
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
