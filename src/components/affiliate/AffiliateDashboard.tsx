// src/components/affiliate/AffiliateDashboard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Eye, Coins, Calendar, ExternalLink, LogOut, TrendingUp, Sparkles, MousePointerClick } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { AFFILIATE_TIER_RULES } from '../../types';
import type { Affiliate, AffiliateClick, AffiliateSale, AffiliatePayout } from '../../types';

// Icon alias — lucide-react exports Banknote but we want a clean import
const BanknoteIcon = TrendingUp;

interface AffiliateDashboardProps {
  affiliate: Affiliate;
}

export default function AffiliateDashboard({ affiliate }: AffiliateDashboardProps) {
  const auth = getAuth();
  const [copiedLink, setCopiedLink] = useState(false);
  const [clicks, setClicks] = useState<AffiliateClick[]>([]);
  const [conversions, setConversions] = useState<AffiliateSale[]>([]);
  const [payouts, setPayouts] = useState<AffiliatePayout[]>([]);

  useEffect(() => {
    loadClicks();
    loadConversions();
    loadPayouts();
  }, [affiliate.id]);

  const loadClicks = useCallback(async () => {
    if (!affiliate.id) return;
    try {
      const q = query(
        collection(db, 'affiliate_clicks'),
        where('affiliateId', '==', affiliate.id),
        orderBy('timestamp', 'desc')
      );
      const snap = await getDocs(q);
      const list: AffiliateClick[] = snap.docs.map(d => ({ id: d.id, ...d.data() } as AffiliateClick));
      setClicks(list);
    } catch (e) { console.warn('Could not load clicks', e); }
  }, [affiliate.id]);

  const loadConversions = useCallback(async () => {
    if (!affiliate.id) return;
    try {
      const q = query(
        collection(db, 'affiliate_sales'),
        where('affiliateId', '==', affiliate.id)
      );
      const snap = await getDocs(q);
      const list: AffiliateSale[] = snap.docs.map(d => ({ id: d.id, ...d.data() } as AffiliateSale));
      setConversions(list);
    } catch (e) { console.warn('Could not load conversions', e); }
  }, [affiliate.id]);

  const loadPayouts = useCallback(async () => {
    if (!affiliate.id) return;
    try {
      const q = query(
        collection(db, 'affiliate_payouts'),
        where('affiliateId', '==', affiliate.id),
        orderBy('requestedAt', 'desc')
      );
      const snap = await getDocs(q);
      const list: AffiliatePayout[] = snap.docs.map(d => ({ id: d.id, ...d.data() } as AffiliatePayout));
      setPayouts(list);
    } catch (e) { console.warn('Could not load payouts', e); }
  }, [affiliate.id]);

  const totalClicks = clicks.length;
  const totalConversions = conversions.length;
  const totalEarned = conversions.reduce((acc, c) => acc + (c.commissionAmount || 0), 0);
  const totalPaid = conversions.filter(c => c.status === 'paid').reduce((acc, c) => acc + (c.commissionAmount || 0), 0);
  const paidOut = payouts.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const pendingPayout = conversions.filter(c => c.status === 'pending').reduce((acc, c) => acc + (c.commissionAmount || 0), 0);
  const requestedPayoutAmount = payouts.filter(p => p.status === 'requested').reduce((acc, p) => acc + p.amount, 0);
  const reservedPayoutIds = payouts.filter(p => p.status === 'requested' || p.status === 'processing').flatMap(p => p.commissionIds || []);
  const availableToWithdraw = conversions
    .filter(c => c.status === 'pending' && c.id && !reservedPayoutIds.includes(c.id))
    .reduce((acc, c) => acc + (c.commissionAmount || 0), 0);

  // EPC = Earnings Per Click (rolling 7-day window)
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const clicks7d = clicks.filter(c => {
    if (!c.timestamp) return false;
    try { return new Date(c.timestamp as any).getTime() >= sevenDaysAgo; } catch { return false; }
  }).length;
  const commissions7d = conversions
    .filter(c => c.status !== 'pending' && new Date(c.saleDate || c.createdAt || 0).getTime() >= sevenDaysAgo)
    .reduce((acc, c) => acc + (c.commissionAmount || 0), 0);
  const epc7d = clicks7d > 0 ? (commissions7d / clicks7d).toFixed(2) : '0.00';

  // Conversion rate = Approved/Paid sales / total unique clicks (30d window)
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const clicks30d = clicks.filter(c => {
    if (!c.timestamp) return false;
    try { return new Date(c.timestamp as any).getTime() >= thirtyDaysAgo; } catch { return false; }
  }).length;
  const conversions30d = conversions.filter(c => c.status !== 'pending' && new Date(c.saleDate || c.createdAt || 0).getTime() >= thirtyDaysAgo).length;
  const conversionRate30d = clicks30d > 0 ? ((conversions30d / clicks30d) * 100).toFixed(1) : '0.0';

  const currencyFmt = (n: number) => `R${n.toFixed(2)}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => setCopiedLink(true));
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const currentRule = AFFILIATE_TIER_RULES.find(r => r.tier === affiliate.tier) || AFFILIATE_TIER_RULES[0];
  const nextTier = AFFILIATE_TIER_RULES.find(r => (r.minMonthlySales || 0) > 0);
  const sessionVolume = conversions.reduce((acc, c) => acc + (c.subTotal || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1c1a1f] p-4 sm:p-8">
      <motion.div className="max-w-6xl mx-auto space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center font-black text-[#0a0a0a] text-lg">
              {affiliate.code.slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">{affiliate.name}</h1>
              <p className="text-xs text-zinc-500">{affiliate.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest ${tierBadgeColor(affiliate.tier)}`}>{currentRule.label}</span>
            <button
              onClick={() => signOut(auth)}
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <StatCard icon={Eye} label="Clicks" value={totalClicks} color="text-[#d4af37]" />
          <StatCard icon={Check} label="Sales" value={totalConversions} color="text-green-500" />
          <StatCard icon={Coins} label="Total earned" value={currencyFmt(totalEarned)} color="text-[#d4af37]" />
          <StatCard icon={TrendingUp} label="EPC (7d)" value={`R${epc7d}`} color="text-[#0a0a0a]" />
          <StatCard icon={MousePointerClick} label="Conv. rate" value={`${conversionRate30d}%`} color="text-[#d4af37]" />
          <StatCard icon={Check} label="Available to withdraw" value={currencyFmt(availableToWithdraw)} color="text-green-600" />
          <div className="col-span-2 md:col-span-1 bg-white rounded-2xl p-5 shadow-lg flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-1.5">
                <BanknoteIcon className="w-4 h-4 text-green-600" />
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Request payout</p>
              </div>
              <p className="text-3xl font-black text-[#0a0a0a] mt-2">R {availableToWithdraw.toFixed(2)}</p>
              <p className="text-xs text-zinc-400 mt-1">
                {availableToWithdraw < 200
                  ? 'R200 minimum • 30-day holding period applies'
                  : requestedPayoutAmount > 0
                  ? `R ${requestedPayoutAmount.toFixed(2)} processing — awaiting admin approval`
                  : 'Ready to withdraw'}
              </p>
            </div>
            {availableToWithdraw >= 200 && requestedPayoutAmount === 0 && (
              <button
                onClick={async () => {
                  const eligible = conversions
                    .filter(c => c.status === 'pending' && c.id && !reservedPayoutIds.includes(c.id))
                    .map(c => c.id!);
                  try {
                    await addDoc(collection(db, 'affiliate_payouts'), {
                      affiliateId: affiliate.id,
                      affiliateCode: affiliate.code,
                      amount: availableToWithdraw,
                      method: 'EFT',
                      status: 'requested',
                      commissionIds: eligible,
                      requestedAt: new Date().toISOString(),
                    });
                    loadPayouts();
                  } catch (e) { console.error('Payout request failed', e); }
                }}
                className="mt-3 w-full py-2.5 bg-[#0a0a0a] hover:bg-[#d4af37] text-white hover:text-[#0a0a0a] text-xs font-bold rounded-lg transition-colors"
              >
                Request Payout R {availableToWithdraw.toFixed(2)}
              </button>
            )}
          </div>
        </div>

        {/* Link Generator */}
        <div className="bg-white rounded-[2rem] shadow-xl p-6 space-y-4">
          <h2 className="text-lg font-black text-[#0a0a0a]">Your Referral Link</h2>
          <p className="text-xs text-zinc-500">
            Share your URL anywhere — Instagram bio, WhatsApp broadcasts, blog posts.
            Clicks are attributed for <strong className="text-[#0a0a0a]">30 days</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-zinc-100 rounded-xl px-4 py-3.5 flex items-center gap-2">
              <code className="text-sm font-mono font-extrabold text-[#d4af37] break-all">
                https://profusebeauty.co.za/?ref={affiliate.code}
              </code>
              <button
                onClick={() => copyToClipboard(`https://profusebeauty.co.za/?ref=${affiliate.code}`)}
                className="ml-auto p-2 text-zinc-400 hover:text-[#d4af37] bg-white rounded-lg transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={() => window.open(`https://profusebeauty.co.za/?ref=${affiliate.code}`, '_blank')}
              className="px-5 py-3.5 bg-[#0a0a0a] hover:bg-[#d4af37] text-white hover:text-[#0a0a0a] font-bold text-sm rounded-xl flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Test Your Link
            </button>
          </div>
          <div className="text-xs text-zinc-400 bg-amber-50 rounded-xl p-3 border border-amber-100">
            💡 Pro tip: Tell customers to use your code at checkout for an exclusive discount together with your link.
          </div>
        </div>

        {/* Conversions + Payouts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionPanel
            title="Conversion History"
            icon={Calendar}
            items={conversions}
            emptyMessage="No conversions yet. Share your link!"
            renderItem={(c: AffiliateSale) => (
              <>
                <div>
                  <p className="text-sm font-bold text-[#0a0a0a]">R{c.subTotal.toFixed(2)}</p>
                  <p className="text-xs text-zinc-400">{c.customerEmail || 'Guest'}</p>
                </div>
                <span className={`text-xs font-black px-3 py-1 rounded-full ${
                  c.status === 'paid' ? 'bg-green-100 text-green-700' :
                  c.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-zinc-100 text-zinc-500'
                }`}>
                  +R{c.commissionAmount.toFixed(2)}
                </span>
              </>
            )}
          />
          <SectionPanel
            title="Payout History"
            icon={BanknoteIcon}
            items={payouts}
            emptyMessage="First payout unlocks at R200."
            renderItem={(p: AffiliatePayout) => (
              <>
                <div>
                  <p className="text-sm font-bold text-[#0a0a0a]">R{p.amount.toFixed(2)}</p>
                  <p className="text-xs text-zinc-400">{p.method || 'EFT'} • Requested {formatDate(p.requestedAt)}</p>
                </div>
                <span className={`text-xs font-extrabold ${p.status === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>{p.status.toUpperCase()}</span>
              </>
            )}
          />
        </div>

        {/* Tier progress */}
        {nextTier && (
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-widest">Progress to {nextTier.label}</h4>
              </div>
              <span className="text-xs font-mono text-zinc-400">R{sessionVolume.toFixed(0)} this period</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-[#d4af37] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (sessionVolume / nextTier.minMonthlySales!) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              {Math.round((sessionVolume / nextTier.minMonthlySales!) * 100)}% of R{nextTier.minMonthlySales} in monthly referrals needed
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function tierBadgeColor(tier: string) {
  const colors: Record<string, string> = {
    entry: 'bg-zinc-700 text-zinc-200 border border-zinc-600',
    pro: 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50',
    vip: 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/50',
  };
  return colors[tier] || colors.entry;
}

function formatDate(ts: any) {
  if (!ts) return '—';
  if (typeof ts === 'string') return new Date(ts).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' });
  return '—';
}

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  color: string;
  pendingPayout?: number;
  affiliateId?: string;
  onPayoutRequest?: () => void;
}

function StatCard({ icon: Icon, label, value, color, pendingPayout, onPayoutRequest }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg flex flex-col justify-between h-full">
      <div className="flex items-center gap-1.5">
        <Icon className={`w-4 h-4 ${color}`} />
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className={`text-3xl font-black text-[#0a0a0a] mt-2`}>{value}</p>
      {pendingPayout !== undefined && pendingPayout >= 200 && onPayoutRequest && (
        <button
          onClick={onPayoutRequest}
          className="mt-3 w-full py-2 bg-[#0a0a0a] hover:bg-[#d4af37] text-white hover:text-[#0a0a0a] text-xs font-bold rounded-lg transition-colors"
        >
          Request Payout
        </button>
      )}
    </div>
  );
}

interface SectionPanelProps<T> {
  title: string;
  icon: any;
  items: T[];
  emptyMessage: string;
  renderItem: (item: T) => React.ReactNode;
}

function SectionPanel({ title, icon: Icon, items, emptyMessage, renderItem }: SectionPanelProps<any>) {
  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-6 overflow-hidden">
      <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2"><Icon className="w-4 h-4" /> {title}</h3>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {items.length === 0
          ? <p className="text-zinc-400 text-xs text-center py-8">{emptyMessage}</p>
          : items.map((item, i) => (
            <div key={item.id || i} className="flex justify-between items-center p-3 rounded-xl hover:bg-zinc-50 transition-colors">
              {renderItem(item)}
            </div>
          ))
        }
      </div>
    </div>
  );
}
