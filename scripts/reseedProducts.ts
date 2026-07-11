// scripts/reseedProducts.ts
//
// One-time admin script: wipes the existing "products" collection in Firestore
// and re-seeds it from src/data.ts (the new restructured catalog).
//
// Uses firebase-admin with a service account key, which bypasses the
// firestore.rules restriction that normally blocks product writes from the
// browser (write: if request.auth.token.admin == true).
//
// USAGE (from the repo root, inside your Codespace):
//   1. Download a service account key from:
//      Firebase Console > Project Settings > Service Accounts > Generate new private key
//   2. Save it in the repo root as: serviceAccountKey.json
//      (this file is gitignored — never commit it)
//   3. Run:
//      npm run reseed

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { products } from '../src/data';

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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function reseed() {
  const productsRef = db.collection('products');

  // 1. Wipe the existing catalog. Necessary because many old product IDs
  //    (p1, p2, p3, p4, p10, sale1-10, etc.) no longer exist in the new
  //    restructured catalog and would otherwise linger as "zombie" products.
  const existing = await productsRef.get();
  if (!existing.empty) {
    const deleteBatch = db.batch();
    existing.docs.forEach((doc) => deleteBatch.delete(doc.ref));
    await deleteBatch.commit();
    console.log(`🗑️  Cleared ${existing.size} old product document(s).`);
  }

  // 2. Write the new catalog from src/data.ts (Firestore batches cap at 500 ops).
  const chunkSize = 450;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const writeBatch = db.batch();
    chunk.forEach((product, idx) => {
      const docRef = productsRef.doc(product.id);
      writeBatch.set(docRef, { ...product, sortOrder: i + idx });
    });
    await writeBatch.commit();
  }

  console.log(`✅ Seeded ${products.length} products to Firestore. Live catalog is now up to date.`);
}

reseed().catch((err) => {
  console.error('❌ Reseed failed:', err);
  process.exit(1);
});
