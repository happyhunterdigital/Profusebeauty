import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";
import { products } from "../data";

/**
 * Utility function to seed the initial hardcoded products from data.ts
 * into the Firestore database.
 * 
 * CAUTION: Only run this once to populate your database!
 */
export const seedProductsToFirestore = async () => {
  try {
    console.log("Starting product seeding process...");
    const productsRef = collection(db, "products");
    
    // We use a batch write for efficiency (max 500 ops per batch)
    const batch = writeBatch(db);
    
    products.forEach((product, index) => {
      // Use the existing product ID to keep references consistent
      const docRef = doc(productsRef, product.id);
      
      // Add a sortOrder field based on current array index for drag-and-drop
      batch.set(docRef, {
        ...product,
        sortOrder: index
      });
    });

    await batch.commit();
    console.log(`Successfully seeded ${products.length} products to Firestore!`);
    return { success: true, count: products.length };
  } catch (error) {
    console.error("Error seeding products:", error);
    return { success: false, error };
  }
};
