// File: src/pages/TermsAndConditions.tsx
// SA Consumer Protection Act 68 of 2008 + ECT Act 25 of 2002 aligned terms.
import React from 'react';

interface LegalPageProps {
  onBack: () => void;
}

export default function TermsAndConditions({ onBack }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E1214]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <button
          onClick={onBack}
          className="mb-8 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
        >
          ← Back to store
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b8960f] mb-2">
          Profuse Beauty Cosmetics
        </p>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Terms &amp; Conditions</h1>
        <p className="text-xs text-zinc-500 mb-8">Last updated: 19 September 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-zinc-700">
          <p>
            These Terms govern purchases, bookings and use of profusebeauty.co.za, operated by
            Profuse Beauty Cosmetics (South Africa). By ordering, booking, or using our virtual
            try-on / shade-matching tools, you agree to these Terms, our Privacy Policy and Cookie
            notice. Key consumer protections under the Consumer Protection Act 68 of 2008 (CPA)
            and the Electronic Communications and Transactions Act 25 of 2002 (ECT Act) apply and
            are not limited by anything here.
          </p>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">1. Products &amp; pricing</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Prices are in South African Rand (ZAR) and include VAT where applicable.</li>
              <li>Product imagery (including shade swatches) is indicative; actual colour may vary by screen and lighting. Virtual try-on is a guide only — see §7.</li>
              <li>We may correct pricing or availability errors before dispatch; if affected, we will contact you with the option to confirm or cancel for a full refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">2. Orders &amp; ECT Act disclosures</h2>
            <p>
              Per ECT Act s43: the full price (goods, delivery, taxes), our contact details
              (info@profusebeauty.co.za · 081 235 5910), payment terms, delivery arrangements and
              return rights are shown at checkout before you pay. An order is an offer; a contract
              forms when we confirm acceptance (order confirmation email). Order records are stored
              and available on request.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">3. Payments</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Secure payments via Paystack, Ozow and Payfast — you are redirected to the provider; card/bank credentials never touch our servers.</li>
              <li>Orders marked PENDING are only dispatched after the payment provider confirms settlement. Failed or reversed payments cancel the order.</li>
              <li>Affiliate/referral codes (<code>?ref=CODE</code>) apply a 30-day attribution window and cannot be combined unless stated.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">4. Delivery &amp; collection</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Delivery via 3PL partners (fee shown at checkout, currently R120 for delivery; collection is free).</li>
              <li>Risk transfers on delivery to your nominated address or on collection. Report damaged, defective or incorrect items within 48 hours with photos.</li>
              <li>Delivery estimates are good-faith targets; delays by couriers do not create cancellation rights beyond the CPA cooling-off rules below.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">5. Returns, refunds &amp; CPA rights</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Cooling-off (CPA s16 / s44 ECT):</strong> for direct-marketing or online purchases you may cancel within 5 business days after delivery for a refund, subject to the CPA&rsquo;s deductions for direct-marketing return costs where applicable.</li>
              <li><strong>Defective/unsafe goods (CPA s55–s56):</strong> 6-month implied warranty against defects — return for repair, replacement or refund at our election for the first 6 months.</li>
              <li><strong>30-day change-of-mind policy:</strong> unopened, sealed, unused products in original packaging may be returned within 30 days for exchange or refund (hygiene seal intact — opened cosmetics cannot be resold and are excluded except where defective).</li>
              <li>To start a return email <a className="underline" href="mailto:info@profusebeauty.co.za">info@profusebeauty.co.za</a> with your order number and photos. Refunds go to the original payment method within a reasonable time after inspection.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">6. Shade-matching bookings</h2>
            <p>
              Shade-matching sessions (e.g. event bookings) are free unless stated. Arrive 5 minutes
              early; slots may be released 10 minutes after the booked time. Cancellations via
              WhatsApp (+27 60 101 6673) or email are appreciated so we can re-allocate your slot.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">7. Virtual try-on disclaimer</h2>
            <p>
              Our virtual try-on / AI shade matcher uses on-device computer vision. It is an
              illustrative guide, not a guarantee of exact shade, coverage, allergy compatibility
              or appearance. Camera frames are processed live on your device and are not recorded
              or stored. Always patch-test new cosmetics and stop use if irritation occurs. No
              medical, dermatological or allergy advice is given.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">8. Acceptable use &amp; spam protection</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>No bots, scraping, fake bookings, promo abuse, or payment fraud. We use honeypot fields, submission time-traps and Firebase security rules/AppCheck to protect forms.</li>
              <li>Affiliates must be 18+, disclose paid promotion, and must not spam, impersonate the brand, or bid on our trademarks in ads.</li>
              <li>We may cancel abusive orders/accounts and report fraud to the relevant providers or authorities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">9. Intellectual property</h2>
            <p>All site content, branding, imagery and copy belong to Profuse Beauty Cosmetics or its licensors. No reproduction without written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">10. Liability</h2>
            <p>
              Nothing limits your non-excludable CPA rights. Otherwise, to the maximum extent
              permitted by law, our liability for any order is limited to the purchase price paid
              for that order, and we are not liable for indirect or consequential loss.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">11. Disputes</h2>
            <p>
              Contact us first at <a className="underline" href="mailto:info@profusebeauty.co.za">info@profusebeauty.co.za</a> — most issues resolve quickly. Unresolved
              consumer disputes may be referred to the National Consumer Commission / Consumer
              Tribunal or the courts of South Africa. These Terms are governed by South African law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">12. Contact</h2>
            <p>
              Profuse Beauty Cosmetics<br />
              Email: <a className="underline font-semibold" href="mailto:info@profusebeauty.co.za">info@profusebeauty.co.za</a><br />
              Phone/WhatsApp: +27 (0) 81 235 5910
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
