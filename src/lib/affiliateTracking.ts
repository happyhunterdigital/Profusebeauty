// src/lib/affiliateTracking.ts — Referral tracking engine
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { AFFILIATE_ATTRIBUTION_DAYS, AFFILIATE_ATTRIBUTION_KEY } from '../types';
import type { AffiliateClick } from '../types';

export function getAttribution(): { code: string; expires: number } | null {
  try {
    const raw = localStorage.getItem(AFFILIATE_ATTRIBUTION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.expires && Date.now() > data.expires) {
      localStorage.removeItem(AFFILIATE_ATTRIBUTION_KEY);
      return null;
    }
    return data;
  } catch { return null; }
}

export function setAttribution(code: string) {
  const expires = Date.now() + AFFILIATE_ATTRIBUTION_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(AFFILIATE_ATTRIBUTION_KEY, JSON.stringify({ code: code.toUpperCase().trim(), expires }));
}

/** Capture ?ref=TRACK from the URL and redirect to clean path */
export function captureAffiliateRefFromURL(): string | null {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref) {
    setAttribution(ref);
    // Clean the URL immediately (remove ?ref=...)
    params.delete('ref');
    const cleanUrl = window.location.pathname + (params.toString() ? '?' + params : '');
    window.history.replaceState({}, document.title, cleanUrl);
  }
  return ref;
}

/** Log a click to Firestore */
export async function logAffiliateClick(opts: {
  affiliateId: string;
  affiliateCode: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  landingPage?: string;
  productId?: string;
}) {
  try {
    await addDoc(collection(db, 'affiliate_clicks'), {
      ...opts,
      converted: false,
      timestamp: serverTimestamp(),
    } as Partial<AffiliateClick>);
  } catch (e) {
    console.warn('Click logging failed', e);
  }
}

/** Referral code input at checkout — overwrites cookie if user enters one manually */
export function applyAffiliateCode(manualCode: string): string | null {
  const existing = getAttribution();
  if (existing) return existing.code;
  const trimmed = manualCode.trim().toUpperCase();
  if (trimmed.length >= 3) {
    setAttribution(trimmed);
    return trimmed;
  }
  return null;
}

/** Returns the attribution code if valid, or null if expired/missing */
export function getActiveReferralCode(): string | null {
  const data = getAttribution();
  return data?.code || null;
}
