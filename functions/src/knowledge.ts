// File: functions/src/knowledge.ts
// Grounding knowledge for the Profuse Beauty AI Assistant.
// Kept as a static, hand-maintained summary of src/data.ts so the chatbot
// never has to guess prices or stock status. Update this whenever the
// catalog in src/data.ts changes (new lines, price changes, stock changes).

export const CATALOG_KNOWLEDGE = `
PROFUSE BEAUTY — FULL PRODUCT CATALOG (prices in ZAR)

FACE
- HD Liquid Foundation — Shades 3, 5, 6, 7, 8, 9, 10, 11, 12, 35 — R370 each. Fixed, full coverage, mattifying, 8-hour wear, SPF 25. Shade 4 is discontinued.
- HD Liquid Concealer (single shades) — Shades 01, 02, 03 — R220 each. Corrects, contours, conceals. Buildable coverage.
- 10-Shade Concealer Palette — R320. All 10 shades in one palette, good for MUAs or anyone unsure of their exact match.
- HD Perfecting Loose Setting Powder — Shades 1, 3, 4 — R250 each. Lightweight, oil control, blurs pores, matte finish.
- Poreless & Smooth Face Primer — R280 — CURRENTLY OUT OF STOCK.
- 2-in-1 Prep & Setting Spray — R280 — CURRENTLY OUT OF STOCK.

LIPS
- The Bomb Lip Colour — Shade 01 — R185 — CURRENTLY OUT OF STOCK (more shades coming soon).
- MK Collection Lip Colour — MK01, MK14, MK20 — R185 each. Velvet matte, 24-hour wear, non-drying.
- Matte Lipstick — Shades 01, 02, 05, 09, 11, 12, 16, Skin — R170 each. Vitamin E, smudge-proof, transfer-resistant, cruelty-free.
- Lip Gloss — Clear (R160); Skin, Mocca, Retro, Lovekiss (R170 each). Non-sticky, high-shine, glassy finish.

EYES
- Soft-Eyeshadow Palette — R320. Mattes, shimmers and glitters mixed, waterproof, long-lasting.
- Bold-Eyeshadow Palette — R320. Same format, punchier bold pigments.

SKINCARE
- Waterproof Makeup Remover — R170. Removes waterproof/long-wear makeup, moisturizes without greasy residue.

ACCESSORIES
- 11-Piece Professional Makeup Brush Set — R599. Soft, skin-friendly bristles, good for sensitive skin.

COMBOS / BUNDLES (these are effectively the "on sale" section — always browsable under Shop > Combos)
- HD Concealer & Brush Set — R420
- Buy 1 Get 1 50% Off (Assorted) — R525 — mix and match, 2nd item automatically half price
- Buy 2 Get Gloss Free (Deep shades) — R320 — buy 2 deep-shade foundations, free gloss included
- Buy 2 Get Gloss Free (Light shades) — R320 — buy 2 light/medium foundations, free gloss included
- HD Powder & Brush Duo — R250
- Glow Highlighter & Brush Kit — R280
- HD Foundation & Brush Kit — R450 — best-selling 3-in-1 foundation + stippling brush
- Perfecting Powder & Brush Combo — R250
- Flawless Foundation Duo — R460
- Ultimate Concealer Collection — R520

SITE-WIDE DISCOUNT MECHANICS (always active — this IS the "what's on sale" answer)
- Automatic BOGO: buy 2 of the exact same item, the 2nd one is free at checkout. No code needed.
- Promo code PROFUSE10 — 10% off the order, applied at checkout.
- Promo code AFFILIATE20 — 20% off, reserved for affiliate/MUA partners to share with their audience.
- Referral links (a link ending in ?ref=THEIRCODE) give the shopper an automatic 10% off, valid for 30 days from clicking it.
- These stack in this order: BOGO first, then promo code, then referral discount — all on top of each other.

INGREDIENT SAFETY (for skincare/safety questions)
- Macadamia Ternifolia Seed Oil — Safe (1/10) — natural emollient, deeply hydrating.
- Moringa Oleifera Seed Oil — Safe (1/10) — antioxidant, anti-aging, protects against environmental stress.
- Marula Oil (Sclerocarya Birrea Seed Oil) — Safe (1/10) — deep hydration, absorbs without greasy finish.
- Vitamin E (Tocopheryl Acetate) — Safe (1/10) — antioxidant, heals skin barrier.
- Titanium Dioxide — Safe (2/10) — physical UV blocker, non-irritating SPF.
- Iron Oxides — Safe (1/10) — natural mineral pigment for shade matching.
- Cyclopentasiloxane & Dimethicone — Safe (3/10) — cosmetic-grade silicones for waterproof, smudge-proof, silky finish.
`;

export const AFFILIATE_KNOWLEDGE = `
PROFUSE BEAUTY AFFILIATE & MUA PROGRAMS — how people actually join and earn

1) GENERAL AFFILIATE PROGRAM (any customer)
- Create a free account / log in, then go to Dashboard > Affiliate Program tab.
- Click "Generate Referral Link" — this creates a unique link like profusebeauty.com/?ref=YOURCODE.
- Share the link anywhere (social media, WhatsApp, etc). Anyone who clicks it and buys within 30 days gets an automatic 10% off their cart.
- The affiliate earns a cash commission on that sale.
- Minimum payout threshold is R200 — earnings accumulate in the dashboard until that's reached.

2) MUA (MAKEUP ARTIST) AFFILIATE TEAM (for professional/certified makeup artists)
- This is a step up from the general program: direct commission rates, the ability to request bulk kit drops, and a certified local MUA badge to display.
- Join via "Register MUA Profile" — the registration form is dispatched to their email to complete onboarding.
- MUAs are typically the ones given the AFFILIATE20 (20% off) code to share, versus the standard 10% referral-link discount.

RULES FOR THE BOT
- If someone asks "how do I become an affiliate" — explain option 1 (simplest, anyone can do it).
- If someone says they're a professional MUA / makeup artist — mention option 2 as well.
- Never invent commission percentages or payout numbers beyond what's stated here.
`;

export const BRAND_KNOWLEDGE = `
BRAND: Profuse Beauty — South African cosmetics brand. HD, full-coverage, matte-finish focus, formulated for a range of skin tones with an emphasis on shade-matching (10 foundation shades, 10-shade concealer palette). Premium positioning with black-and-gold visual identity. POPIA-compliant on customer data.
Contact/support: point people to the site's contact/support channel for anything the bot can't resolve (order issues, refunds, stock ETAs on out-of-stock items).
`;

export const JOURNAL_KNOWLEDGE = `
THE BEAUTY JOURNAL — articles available at /blog (mention these by title when relevant to what someone's asking, e.g. tips on a product category they're browsing)

1. "Find Your Perfect Match: 5 Must-Have Contours & Concealers" — how to pick the right HD Liquid Concealer/Contour shade, and why the mineral-based, hydrating, anti-inflammatory formula suits sensitive skin and hyperpigmentation.
2. "HD Liquid Foundation: Your 3-in-1 Beauty Essential" — the foundation's 3-in-1 role as primer, concealer, and oil-free UV protector; flawless full coverage, matte finish, waterproof, all-day wear.
3. "Wondering How to Keep Your Contour On Point Through Rain or Shine?" — the 10-shade Concealer Palette, its waterproof/blendable format, and how to sculpt/contour with it.
4. "The Best Makeup Brushes For Your Face" — the 11-piece professional brush set, which brush does what, and why soft bristles matter for sensitive skin.
5. "Want to Know the Secret to Flawless Skin? Meet the Profuse Beauty Highlighter" — where to apply highlighter (cheekbones, brow bone, cupid's bow, nose bridge, inner eye corners, nose tip) and its SPF 25/hydration benefits.
6. "Luxury Lip Care: Gloss, Matte & Velvet, Every Finish Covered" — differences between the lip gloss, matte lipstick, and velvet matte lipstick finishes, and which occasion suits which.
7. "Wondering How to Effortlessly Remove Waterproof Makeup?" — how the Waterproof Makeup Remover dissolves stubborn/waterproof makeup while hydrating skin.

RULES FOR THE BOT
- If a question maps closely to one of these articles' topic, mention the article by title and suggest reading it on the Journal page for more depth, THEN still give a direct, concise answer yourself — never just say "read the article" instead of answering.
`;
