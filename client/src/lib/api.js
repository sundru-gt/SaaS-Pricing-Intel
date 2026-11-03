import { CATEGORIES, ALL_CATEGORY } from "../data/categories.js";
import { VENDORS } from "../data/vendors.js";

const API_BASE = "/api";

/**
 * Fetch all categories from Express backend
 */
export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return {
      categories: data.categories || CATEGORIES,
      allCategory: data.allCategory || ALL_CATEGORY,
    };
  } catch (err) {
    console.warn("[Client API] Express backend offline; using local data.");
    return { categories: CATEGORIES, allCategory: ALL_CATEGORY };
  }
}

/**
 * Fetch vendors with optional category/subType/search filtering
 */
export async function fetchVendors({ categoryId = "all", subType = "All", q = "" } = {}) {
  try {
    const params = new URLSearchParams();
    if (categoryId && categoryId !== "all") params.set("categoryId", categoryId);
    if (subType && subType !== "All") params.set("subType", subType);
    if (q && q.trim()) params.set("q", q.trim());

    const url = `${API_BASE}/vendors${params.toString() ? `?${params.toString()}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch vendors");
    const data = await res.json();
    return data.vendors || VENDORS;
  } catch (err) {
    console.warn("[Client API] Express backend offline; using local vendors.");
    return VENDORS;
  }
}

/**
 * Submit search query to Express backend
 */
export async function submitSearchApi(query) {
  try {
    const res = await fetch(`${API_BASE}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error("Search API error");
    return await res.json();
  } catch (err) {
    return null;
  }
}

/**
 * Subscribe to Price Watch newsletter via Express backend
 */
export async function subscribeNewsletterApi(email, consent) {
  try {
    const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, consent }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Subscription failed");
    return data;
  } catch (err) {
    // If backend is offline, simulate success locally
    return { success: true, message: "Subscription simulated locally.", persisted: "local" };
  }
}

/**
 * Generate an AI summary via Express /api/ai/summary endpoint
 */
export async function generateSummaryApi({
  query = "",
  categoryName = "Software",
  vendors = [],
  currency = "USD",
  fallbackTemplate = "",
} = {}) {
  try {
    const res = await fetch(`${API_BASE}/ai/summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, categoryName, vendors, currency, fallbackTemplate }),
    });
    if (!res.ok) throw new Error("AI Summary API error");
    const data = await res.json();
    return {
      summary: data.summary || fallbackTemplate,
      source: data.source || "fallback",
    };
  } catch (err) {
    return {
      summary: fallbackTemplate,
      source: "local-fallback",
    };
  }
}

