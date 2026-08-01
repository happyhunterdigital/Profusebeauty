// src/components/affiliate/AffiliateRegister.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Banknote, Lock, ArrowRight } from 'lucide-react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { AFFILIATE_TIER_RULES } from '../../types';
import type { Affiliate } from '../../types';

const SA_BANKS = ['FNB', 'Standard Bank', 'ABSA', 'Nedbank', 'Capitec', 'TymeBank', 'Investec', 'Other'];

interface FormData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  code: string;
  bankName: string;
  bankAccountHolder: string;
  bankAccountNumber: string;
  bankBranchCode: string;
  agreeTerms: boolean;
}

const initialForm: FormData = {
  name: '', email: '', phone: '', bio: '', code: '',
  bankName: '', bankAccountHolder: '', bankAccountNumber: '', bankBranchCode: '',
  agreeTerms: false,
};

export default function AffiliateRegister() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const generateCode = () => {
    const base = form.name
      .replace(/[^a-zA-Z]/g, '')
      .slice(0, 5)
      .toUpperCase();
    const num = Math.floor(1000 + Math.random() * 9000);
    return `${base}${num}`;
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Full name is required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'A valid email is required.';
    if (!form.phone.trim()) return 'Phone number is required.';
    if (!form.code.trim()) return 'Please choose a referral code.';
    if (!form.bankName) return 'Bank name is required.';
    if (!form.bankAccountNumber.trim()) return 'Bank account number is required.';
    if (!form.bankBranchCode.trim()) return 'Branch code is required.';
    if (!form.agreeTerms) return 'Please agree to the Affiliate Program Terms.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setIsSubmitting(true);
    setError(null);
    try {
      // Check code uniqueness
      const q = query(collection(db, 'affiliates'), where('code', '==', form.code.trim().toUpperCase()));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setError(`Referral code "${form.code.toUpperCase()}" is already taken. Try another one.`);
        setIsSubmitting(false);
        return;
      }

      const affiliateData: Omit<Affiliate, 'id'> = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        bio: form.bio.trim() || '',
        code: form.code.trim().toUpperCase(),
        status: 'pending',
        tier: 'entry',
        bankName: form.bankName,
        bankAccountHolder: form.bankAccountHolder.trim(),
        bankAccountNumber: form.bankAccountNumber.trim(),
        bankBranchCode: form.bankBranchCode.trim(),
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'affiliates'), affiliateData);
      setSuccess(true);
      setGeneratedCode(form.code.toUpperCase());
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTierRules = AFFILIATE_TIER_RULES.find(r => r.tier === 'entry');

  if (success) {
    return (
      <div className="min-h-screen bg-[#fcf8f0] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[2rem] max-w-lg w-full p-10 text-center shadow-2xl border border-[#d4af37]/20"
        >
          <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#d4af37]" />
          </div>
          <h2 className="text-3xl font-black text-[#0a0a0a] mb-2">Application Submitted!</h2>
          <p className="text-zinc-500 mb-4">You&apos;re now enrolled as an aspiring Profuse Beauty affiliate.</p>
          <div className="bg-[#fcf8f0] rounded-2xl p-4 mb-6 text-left space-y-2">
            <p className="text-xs text-zinc-500">Your referral code:</p>
            <p className="font-black font-mono text-2xl text-[#d4af37] tracking-wider">{form.code.toUpperCase()}</p>
            <p className="text-xs text-zinc-400 mt-2">Share your link: <code className="bg-zinc-100 px-2 py-1 rounded font-mono text-[#0a0a0a]">?ref={form.code.toUpperCase()}</code></p>
          </div>
          <div className="bg-zinc-50 rounded-2xl p-5 text-left space-y-3 text-sm">
            <p className="text-xs font-bold text-[#0a0a0a] uppercase tracking-widest flex items-center gap-2">
              <Banknote className="w-4 h-4 text-[#d4af37]" /> Payout Summary
            </p>
            <ul className="space-y-2 text-zinc-600">
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" /><span>Entry level: <strong className="text-[#0a0a0a]">{Math.round((currentTierRules?.commissionRate || 0.10) * 100)}% commission</strong> on all net sales</span></li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" /><span>Automatic tier upgrade at <strong className="text-[#0a0a0a]">R5,000/month</strong> in referrals</span></li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" /><span>30-day attribution window — sales made up to 30 days after click count</span></li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" /><span>First payout minimum: <strong className="text-[#0a0a0a]">R200</strong></span></li>
            </ul>
          </div>
          <p className="text-xs text-zinc-400 mt-4">Your bank details are encrypted and only visible to the accounts team for payouts. Your application is under review — you&apos;ll get an email at <strong className="text-[#0a0a0a]">{form.email}</strong> once approved.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1c1a1f] flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#d4af37] to-[#e5c96a] p-6 text-center text-[#0a0a0a]">
          <p className="text-[10px] font-bold uppercase tracking-[3px] mb-1 text-black/50">Profuse Beauty Pro</p>
          <h1 className="text-3xl font-black">Become an Affiliate</h1>
          <p className="text-sm mt-2 opacity-70 max-w-md mx-auto">Earn commission promoting South Africa&apos;s premium HD makeup line. Free to join — no fees.</p>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section: Contact */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> About You
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Full Name *</label>
                  <input required className="w-full bg-zinc-100 rounded-xl px-4 py-3 font-bold text-sm" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Email *</label>
                  <input required type="email" className="w-full bg-zinc-100 rounded-xl px-4 py-3 font-bold text-sm" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Phone *</label>
                  <input required type="tel" className="w-full bg-zinc-100 rounded-xl px-4 py-3 font-bold text-sm" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Why promote us? (1-2 sentences)</label>
                  <input className="w-full bg-zinc-100 rounded-xl px-4 py-3 font-bold text-sm" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Section: Referral Code */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" /> Referral Code
              </h3>
              <div className="flex gap-2">
                <input
                  required
                  className="flex-1 bg-zinc-100 rounded-xl px-4 py-3 font-mono font-extrabold text-sm uppercase focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                  value={form.code}
                  onChange={e => setForm({ ...form, code: e.target.value.toUpperCase().slice(0, 12) })}
                  placeholder="CODE"
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, code: generateCode() })}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-xl font-bold text-sm transition-colors"
                >
                  Generate
                </button>
              </div>
              <p className="text-xs text-zinc-400">Your customers will use this to unlock a discount and you&apos;ll earn commission.</p>
            </div>

            {/* Section: Banking */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-2">
                <Banknote className="w-3.5 h-3.5 text-[#d4af37]" /> South African Bank Details — for payouts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Bank Name *</label>
                  <select required className="w-full bg-zinc-100 rounded-xl px-4 py-3 font-bold text-sm appearance-none" value={form.bankName} onChange={e => setForm({ ...form, bankName: e.target.value })}>
                    <option value="">Choose...</option>
                    {SA_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Account Holder *</label>
                  <input required className="w-full bg-zinc-100 rounded-xl px-4 py-3 font-bold text-sm" value={form.bankAccountHolder} onChange={e => setForm({ ...form, bankAccountHolder: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Account Number *</label>
                  <input required type="text" className="w-full bg-zinc-100 rounded-xl px-4 py-3 font-bold text-sm" value={form.bankAccountNumber} onChange={e => setForm({ ...form, bankAccountNumber: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Branch Code *</label>
                  <input required className="w-full bg-zinc-100 rounded-xl px-4 py-3 font-bold text-sm" value={form.bankBranchCode} onChange={e => setForm({ ...form, bankBranchCode: e.target.value })} />
                </div>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Your bank details are stored encrypted in Firebase. Only the accounts team accesses them for manual EFT payouts.</p>
            </div>

            {/* Section: Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={e => setForm({ ...form, agreeTerms: e.target.checked })}
                className="mt-1 w-4 h-4 accent-[#d4af37]"
              />
              <span className="text-sm text-zinc-600">
                I agree to the <a href="#/affiliate-terms" className="text-[#d4af37] font-bold underline underline-offset-2">Affiliate Program Terms</a> and confirm I&apos;m 18 years or older.
              </span>
            </label>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#0a0a0a] text-[#d4af37] font-black text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Processing…' : (
                <>Apply Now <ArrowRight className="w-5 h-5" /></>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
