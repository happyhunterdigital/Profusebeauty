// File: src/pages/PrivacyPolicy.tsx
// POPIA (Act 4 of 2013) + GDPR + CCPA compatible privacy notice for SA beauty e-commerce.
import React from 'react';

interface LegalPageProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: LegalPageProps) {
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
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="text-xs text-zinc-500 mb-8">Last updated: 19 September 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-zinc-700">
          <p>
            Profuse Beauty Cosmetics (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your right to
            privacy. This policy explains how we collect, use, share and protect your personal
            information when you shop online, book a shade-matching session, use our virtual
            try-on / shade-matching tools, or subscribe to marketing. It is aligned with South
            Africa&rsquo;s Protection of Personal Information Act 4 of 2013 (POPIA), the EU General
            Data Protection Regulation (GDPR) where applicable, and California Consumer Privacy
            Act (CCPA) principles.
          </p>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">1. Information we collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact &amp; identity:</strong> name, email, phone number, delivery address, account details.</li>
              <li><strong>Orders &amp; payments:</strong> cart contents, order history, delivery/collection choice. Card/bank details are processed by Paystack, Ozow or Payfast — we never store full card numbers.</li>
              <li><strong>Shade matching &amp; virtual try-on:</strong> shade selections, quiz answers, booking location/time. Camera frames for virtual try-on are processed on your device in real time and are <strong>never recorded, uploaded or stored</strong> without your explicit consent.</li>
              <li><strong>Marketing preferences:</strong> newsletter opt-ins, consent records, campaign engagement.</li>
              <li><strong>Technical data:</strong> device, browser, IP address, pages viewed, referral codes (e.g. <code>?ref=CODE</code>), stored in Firebase/Firestore logs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">2. How we use your information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fulfil orders, deliveries, collections, returns and refunds.</li>
              <li>Manage shade-matching bookings and send confirmations via email/WhatsApp.</li>
              <li>Provide customer support and respond to enquiries.</li>
              <li>Send marketing only where you have opted in (POPIA s69 / GDPR consent). You may opt out at any time.</li>
              <li>Prevent fraud, abuse and spam; enforce our Terms; comply with legal obligations (Consumer Protection Act 68 of 2008, ECT Act 25 of 2002, tax law).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">3. Lawful basis &amp; consent</h2>
            <p>
              We process personal information on the basis of your consent, performance of a
              contract (your order/booking), our legitimate interests (site security, analytics),
              and legal compliance. Marketing emails/SMS are sent only with prior opt-in consent;
              every message includes an unsubscribe link. Consent for cookies is collected via our
              cookie banner — see §7.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">4. Sharing &amp; operators</h2>
            <p>We share data only with trusted operators who need it to provide services:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Payments:</strong> Paystack, Ozow, Payfast (redirect — their own privacy terms apply).</li>
              <li><strong>Infrastructure:</strong> Google Firebase/Firestore/Cloud Functions, Cloudflare, 3PL delivery partners.</li>
              <li><strong>Communications:</strong> email/SMS/WhatsApp providers for confirmations.</li>
              <li>Regulators or law enforcement where legally required. We never sell your personal information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">5. International transfers</h2>
            <p>
              Firebase/Cloudflare infrastructure may process data outside South Africa. Where
              POPIA s72 or GDPR Chapter V applies, we rely on the provider&rsquo;s contractual
              safeguards and data-protection commitments.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">6. Retention &amp; security</h2>
            <p>
              We retain order and tax records as required by law, bookings for operational
              purposes, and marketing data until you withdraw consent. We apply access controls,
              Firestore security rules, HTTPS/TLS in transit, and least-privilege admin access.
              No method is 100% secure — report suspected misuse to us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">7. Cookies</h2>
            <p>
              We use strictly-necessary cookies (cart, consent choice) and, only with your consent,
              preference/analytics cookies. Accept or decline via the cookie banner; you can change
              your choice anytime by clearing the <code>pb_cookie_consent</code> key in your browser&rsquo;s
              local storage and reloading. No advertising trackers are loaded before consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">8. Your rights</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>POPIA (SA):</strong> access, correction, deletion, objection, restriction, and complaint to the Information Regulator (JD House, 27 Stiemens Street, Braamfontein; <a className="underline" href="https://www.justice.gov.za/inforeg/">justice.gov.za/inforeg</a>).</li>
              <li><strong>GDPR (EU/UK):</strong> access, rectification, erasure, portability, restriction, objection, and complaint to your supervisory authority.</li>
              <li><strong>CCPA (California):</strong> know, delete, correct, and opt out of sale/sharing (we do not sell personal information).</li>
            </ul>
            <p className="mt-2">To exercise any right, contact the Information Officer below. We respond within statutory timeframes and verify identity to prevent misuse.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">9. Children</h2>
            <p>Our store is intended for customers 18 years or older. We do not knowingly collect children&rsquo;s data for marketing.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">10. Information Officer</h2>
            <p>
              Information Officer: Profuse Beauty Cosmetics<br />
              Email: <a className="underline font-semibold" href="mailto:info@profusebeauty.co.za">info@profusebeauty.co.za</a><br />
              Phone: 081 235 5910
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-2">11. Changes</h2>
            <p>We may update this policy as our products or the law change. Material changes will be posted here with a revised date.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
