/** src/lib/seoAudit.ts — content readability + SEO + AEO audit (AiAudit engine)
 * 
 * Vocabulary assumes South African beauty products. Adjust keywords as needed.
 */

export interface AuditIssue {
  severity: 'error' | 'warning' | 'info';
  message: string;
}

export interface AuditResult {
  score: number;        // 0-100  
  issues: AuditIssue[];
  words: number;
  sentences: number;
  paragraphs: number;
  keywordDensity: number; // how often focus keyword appears
  fleschScore: number;  // readability score approximation
  passiveCount: number; // number of passive voice constructions found
}

/** Count syllables in a word using a simple approach */
const countSyllables = (word: string): number => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const match = word.match(/[aeiouy]{1,2}/g);
  return match ? match.length : 1;
};

/** Flesch Reading Ease — higher is easier to read (60-80 is standard) */
export const fleschScore = (text: string): number => {
  const sentences = text.match(/[.!?]+/g)?.length || 1;
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  if (wordCount === 0) return 0;

  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const asl = wordCount / sentences;                   // avg sentence length
  const fow = (totalSyllables / wordCount) * 100;    // avg syllables per word

  return Math.round(206.835 - (1.015 * asl) - (84.6 * fow));
};

/** Passive voice detector — flags weak constructions */
export const detectPassive = (paragraph: string): string[] => {
  const patterns = [
    /\b(?:was|were|be|been|being)\s+\w+ed\b/gi,
    /\b(?:is|are|was|were)\s+being\s+\w+\b/gi,
    /\b(?:has|have|had)\s+been\s+\w+\b/gi,
  ];
  const hits: string[] = [];
  patterns.forEach((pattern) => {
    let m;
    while ((m = pattern.exec(paragraph)) !== null && hits.length < 3) {
      hits.push(m[0]);
    }
  });
  return hits;
};

/** Basic colon-splitting keyword/FAQ extraction for AEO candidate detection */
const extractFAQs = (text: string): { q: string; a: string }[] => {
  const matches: { q: string; a: string }[] = [];
  const qPattern = /(Q[.:]|Question[:|]|FAQ[:|]|FAQs[:|])\s*(.+?)\n\s*(?:A[:.]\s*)?(.+?)(?=\s*\n\s*(?:Q[.:]|Question[:|]|FAQ[:|])|$)/gis;
  let m;
  while ((m = qPattern.exec(text)) !== null && matches.length < 20) {
    matches.push({ q: m[2].trim(), a: m[3].trim() });
  }
  return matches;
};

/** Main audit function — analyzes text for SEO/readability/AEO and returns scores */
export function auditContent(opts: {
  text: string;
  focusKeyword?: string;
  title?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  contentType?: 'product' | 'blog';
}): AuditResult {
  const issues: AuditIssue[] = [];
  const { text, focusKeyword, title, excerpt, metaTitle, metaDescription, contentType } = opts;

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  // 1. Word count thresholds
  if (contentType === 'product' && wordCount < 40) {
    issues.push({ severity: 'error', message: `Product description has ${wordCount} words — aim for at least 60 for SEO.` });
  } else if (contentType === 'blog' && wordCount < 300) {
    issues.push({ severity: 'warning', message: `Blog post is under 300 words (${wordCount}) — thin content can hurt rankings.` });
  }

  // 2. Title checks
  if (title) {
    if (title.length < 30) {
      issues.push({ severity: 'warning', message: 'Title is short (< 30 chars). Expand for better SEO.' });
    } else if (title.length > 65) {
      issues.push({ severity: 'warning', message: 'Title exceeds 65 chars — Google may truncate it.' });
    }
    if (focusKeyword && !title.toLowerCase().includes(focusKeyword.toLowerCase())) {
      issues.push({ severity: 'warning', message: `Focus keyword "${focusKeyword}" not found in title.` });
    }
  }

  // 3. Meta description
  if (metaDescription) {
    if (metaDescription.length < 120) {
      issues.push({ severity: 'warning', message: `Meta description is ${metaDescription.length} chars — target 120-155.` });
    } else if (metaDescription.length > 160) {
      issues.push({ severity: 'error', message: `Meta description exceeds 160 chars — Google will truncate.` });
    }
  }

  // 4. Keyword density
  let keywordCount = 0;
  if (focusKeyword) {
    const regex = new RegExp(`\\b${focusKeyword.toLowerCase()}\\b`, 'gi');
    keywordCount = (text.match(regex) || []).length;
    const density = (keywordCount / wordCount) * 100;
    if (density < 0.5) {
      issues.push({ severity: 'warning', message: `Keyword "${focusKeyword}" density is low (${density.toFixed(1)}%) — target 0.5–2.5%.` });
    } else if (density > 3) {
      issues.push({ severity: 'warning', message: `Keyword "${focusKeyword}" density is high (${density.toFixed(1)}%) — avoid keyword stuffing.` });
    }
  }

  // 5. Flesch readability
  const readability = fleschScore(text);
  if (readability < 30) {
    issues.push({ severity: 'error', message: `Readability score is ${readability} — text is very complex (assume graduate-level language). Rewrite simpler.` });
  } else if (readability < 50) {
    issues.push({ severity: 'warning', message: `Readability score is ${readability} — consider shorter sentences.` });
  }

  // 6. Passive voice detection
  const passiveHits: string[] = [];
  paragraphs.forEach(p => {
    const hits = detectPassive(p);
    if (hits.length > 0) passiveHits.push(...hits);
  });
  if (passiveHits.length > 0) {
    issues.push({ severity: 'info', message: `Passive voice detected: "${passiveHits.slice(0, 2).join('", "')}" — prefer active voice.` });
  }

  // 7. AEO — FAQ extraction
  const faqs = extractFAQs(text);
  if (faqCount('', contentType) === 0 && faqs.length === 0 && contentType === 'product') {
    issues.push({ severity: 'info', message: 'No FAQ sections detected. Consider adding Q&A pairs for AI search.' });
  }

  // 8. Short answer signal
  if (contentType === 'blog' && wordCount < 100 && excerpt && excerpt.length < 40) {
    issues.push({ severity: 'warning', message: 'Excerpt is very short — AI engines favour summaries of 40-60 words.' });
  }

  // Score computation
  let score = 100;
  score -= issues.filter(i => i.severity === 'error').length * 20;
  score -= issues.filter(i => i.severity === 'warning').length * 8;
  score -= issues.filter(i => i.severity === 'info').length * 3;
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    issues,
    words: wordCount,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    keywordDensity: focusKeyword ? (keywordCount / wordCount) * 100 : 0,
    fleschScore: readability,
    passiveCount: passiveHits.length,
  };
}

// helper to detect if text has any FAQ-like Q&A
function faqCount(text: string, _type?: string): number {
  if (!text) return 0;
  const matches = text.match(/Q[.:]|Question[:|]|FAQ[:|]/gi);
  return matches ? matches.length : 0;
}
