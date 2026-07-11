// scripts/reseedBlog.ts
//
// One-time admin script: seeds/updates the "blog_posts" collection in Firestore
// from src/blogData.ts (The Beauty Journal content).
//
// Uses firebase-admin with a service account key — same setup as reseedProducts.ts.
//
// USAGE (from the repo root, inside your Codespace):
//   1. Make sure serviceAccountKey.json exists in the repo root (see reseedProducts.ts
//      for how to download one from Firebase Console if you don't already have it).
//   2. Run:
//      npm run reseed:blog

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { blogPosts } from '../src/blogData';

const __dirname = dirname(fileURLToPath(import.meta.url));
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  : resolve(__dirname, '../serviceAccountKey.json');

let serviceAccount: any;
try {
  serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'));
} catch (err) {
  console.error(`\n❌ Could not read service account key at: ${keyPath}`);
  console.error('   Download one from Firebase Console > Project Settings > Service Accounts,');
  console.error('   save it as "serviceAccountKey.json" in the repo root, and try again.\n');
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function reseedBlog() {
  const blogRef = db.collection('blog_posts');
  const batch = db.batch();

  blogPosts.forEach((post) => {
    const docRef = blogRef.doc(post.id);
    batch.set(docRef, post);
  });

  await batch.commit();
  console.log(`✅ Seeded ${blogPosts.length} Journal posts to Firestore.`);
}

reseedBlog().catch((err) => {
  console.error('❌ Blog reseed failed:', err);
  process.exit(1);
});
