import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ShopOwner } from "../types";

const SHOPS_COLLECTION = "shops";

/**
 * Fetch all shops from Firestore
 */
export async function getShopsFromFirestore(): Promise<ShopOwner[]> {
  try {
    const querySnapshot = await getDocs(collection(db, SHOPS_COLLECTION));
    const shops: ShopOwner[] = [];
    querySnapshot.forEach((doc) => {
      shops.push(doc.data() as ShopOwner);
    });
    return shops;
  } catch (error) {
    console.error("Error fetching shops from Firestore: ", error);
    return [];
  }
}

/**
 * Save or update a shop in Firestore
 */
export async function saveShopToFirestore(shop: ShopOwner): Promise<void> {
  try {
    const shopRef = doc(db, SHOPS_COLLECTION, shop.id);
    await setDoc(shopRef, shop, { merge: true });
    console.log(`Successfully saved shop ${shop.id} to Firestore.`);
  } catch (error) {
    console.error(`Error saving shop ${shop.id} to Firestore: `, error);
  }
}

/**
 * Delete a shop from Firestore
 */
export async function deleteShopFromFirestore(shopId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, SHOPS_COLLECTION, shopId));
    console.log(`Successfully deleted shop ${shopId} from Firestore.`);
  } catch (error) {
    console.error(`Error deleting shop ${shopId} from Firestore: `, error);
  }
}

/**
 * Seed Firestore with initial shops if empty
 */
export async function seedShopsToFirestore(seededShops: ShopOwner[]): Promise<ShopOwner[]> {
  try {
    const existing = await getShopsFromFirestore();
    if (existing.length === 0) {
      console.log("Firestore collection is empty. Seeding with initial shops...");
      for (const shop of seededShops) {
        await saveShopToFirestore(shop);
      }
      return seededShops;
    }
    return existing;
  } catch (error) {
    console.error("Error seeding shops: ", error);
    return seededShops;
  }
}
