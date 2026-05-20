// File: src/components/TrustBridge.tsx
import React from 'react';

interface TrustBridgeProps {
  isDarkMode: boolean;
}

export default function TrustBridge({ isDarkMode }: TrustBridgeProps) {
  return (
    <section className="bg-zinc-950/60 border border-white/5 p-6 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#fbbf24]">SA Fintech Trust</span>
        <h3 className="text-lg font-serif text-white uppercase">Secure Payments & Logistics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-zinc-900/30 border border-white/5">
          <span className="text-lg block">🇿🇦</span>
          <h4 className="text-xs font-bold text-white uppercase mt-2">Local Edge CDN</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">Hosted on AWS Cape Town clusters to deliver responsive page loading under 200ms.</p>
        </div>
        <div className="p-4 bg-zinc-900/30 border border-white/5">
          <span className="text-lg block">🛡️</span>
          <h4 className="text-xs font-bold text-white uppercase mt-2">POPIA Compliant</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">Your skin diagnostics photo and metrics are safe and encrypted.</p>
        </div>
        <div className="p-4 bg-zinc-900/30 border border-white/5">
          <span className="text-lg block">💳</span>
          <h4 className="text-xs font-bold text-white uppercase mt-2">Fintech Integrations</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">Supports instant bank transfers using Ozow, card checkouts with Paystack, and PayJustNow BNPL.</p>
        </div>
      </div>
    </section>
  );
}
