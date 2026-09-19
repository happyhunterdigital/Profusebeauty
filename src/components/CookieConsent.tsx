// File: src/components/CookieConsent.tsx
// POPIA / GDPR style consent banner. Stores choice in localStorage; no trackers load before consent.
import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'pb_cookie_consent';

type ConsentValue = 'accepted' | 'declined';

export function getCookieConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

export default function CookieConsent({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable — still dismiss */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed z-[120] bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-[#0E0E12] border border-[#d4af37]/30 rounded-2xl p-5 shadow-2xl text-zinc-300"
    >
      <p className="text-sm font-bold text-white mb-1">We value your privacy 🍪</p>
      <p className="text-xs leading-relaxed text-zinc-400 mb-4">
        We use strictly-necessary cookies for your bag and consent choice. With your permission
        we use preference cookies to improve your shade-matching experience. No advertising
        trackers run before you consent. See our{' '}
        <button
          onClick={() => onNavigate?.('/privacy-policy')}
          className="underline text-[#d4af37] hover:text-white transition-colors"
        >
          Privacy Policy
        </button>
        .
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => choose('declined')}
          className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Decline
        </button>
        <button
          onClick={() => choose('accepted')}
          className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#d4af37] text-black hover:bg-[#b8960f] transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
