import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, writeBatch } from "firebase/firestore";
import { db } from "../../../firebase";

/**
 * Knowledge Base CRUD service.
 *
 * Firestore structure:
 *   knowledge_base/categories/items/{categoryId}
 *   knowledge_base/entries/items/{entryId}
 */

const CATEGORIES_COLL = "knowledge_base/categories/items";
const ENTRIES_COLL = "knowledge_base/entries/items";

export const DEFAULT_CATEGORIES = [
  { id: "services", title: "Our Services", icon: "🛠️", description: "What we offer — web apps, mobile apps, custom software", order: 1 },
  { id: "pricing", title: "Pricing & Discounts", icon: "💰", description: "Pricing tiers, discounts, payment plans", order: 2 },
  { id: "booking", title: "Call Booking & Process", icon: "📅", description: "How to book a call, discovery process, timelines", order: 3 },
  { id: "quotes", title: "Quotes & Proposals", icon: "📋", description: "How we quote, what's included, revision process", order: 4 },
  { id: "terms", title: "Terms & Conditions", icon: "📜", description: "Legal terms, contracts, deliverables", order: 5 },
  { id: "faq", title: "FAQ", icon: "❓", description: "Frequently asked questions", order: 6 },
  { id: "policies", title: "Policies", icon: "🔒", description: "Privacy, refund, support policies", order: 7 },
];

// --- Categories ---

export async function getCategories() {
  const q = query(collection(db, CATEGORIES_COLL), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createCategory(data) {
  const ref = await addDoc(collection(db, CATEGORIES_COLL), {
    title: data.title || "Untitled Category",
    icon: data.icon || "📁",
    description: data.description || "",
    order: data.order || Date.now(),
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCategory(id, data) {
  const ref = doc(db, CATEGORIES_COLL, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteCategory(id) {
  // Also delete all entries in this category
  const entries = await getEntriesByCategory(id);
  const batch = writeBatch(db);
  entries.forEach((e) => batch.delete(doc(db, ENTRIES_COLL, e.id)));
  batch.delete(doc(db, CATEGORIES_COLL, id));
  await batch.commit();
}

export async function seedDefaultCategories() {
  const existing = await getCategories();
  if (existing.length > 0) return existing;
  const batch = writeBatch(db);
  DEFAULT_CATEGORIES.forEach((cat) => {
    const ref = doc(collection(db, CATEGORIES_COLL));
    batch.set(ref, {
      ...cat,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  await batch.commit();
  return getCategories();
}

// --- Entries ---

export async function getEntries() {
  const q = query(collection(db, ENTRIES_COLL), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getEntriesByCategory(categoryId) {
  const all = await getEntries();
  return all.filter((e) => e.categoryId === categoryId);
}

export async function getEntry(id) {
  const snap = await getDoc(doc(db, ENTRIES_COLL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function createEntry(data) {
  const ref = await addDoc(collection(db, ENTRIES_COLL), {
    categoryId: data.categoryId,
    title: data.title || "Untitled Entry",
    content: data.content || "",
    tags: data.tags || [],
    order: data.order || Date.now(),
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateEntry(id, data) {
  const ref = doc(db, ENTRIES_COLL, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteEntry(id) {
  await deleteDoc(doc(db, ENTRIES_COLL, id));
}
