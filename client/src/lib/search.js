import { CATEGORIES, ALL_CATEGORY } from "../data/categories.js";

/**
 * Escapes regex special characters in a string.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Checks if a target phrase appears as a distinct word/phrase in text,
 * preventing accidental substring matches (e.g., 'hris' will NOT match 'christmas').
 */
export function phraseMatches(text, phrase) {
  if (!text || !phrase) return false;
  const cleanText = text.toLowerCase().trim();
  const cleanPhrase = phrase.toLowerCase().trim();

  if (cleanText === cleanPhrase) return true;

  // Use word boundaries \b. Note that \b works on letters/digits/underscore.
  const escaped = escapeRegex(cleanPhrase);
  const regex = new RegExp(`(^|\\b|\\s)${escaped}(\\b|\\s|$)`, "i");
  return regex.test(cleanText);
}

/**
 * Matches a user query string to one of the 8 subcategories or 'all'.
 * Returns the matching category object.
 */
export function matchCategory(query, vendors = []) {
  if (!query || typeof query !== "string") {
    return ALL_CATEGORY;
  }

  const normalized = query.trim().toLowerCase();

  if (normalized === "" || normalized === "saas" || normalized === "all") {
    return ALL_CATEGORY;
  }

  // 1. Check exact or phrase match on subcategory keywords
  for (const cat of CATEGORIES) {
    for (const kw of cat.keywords) {
      if (phraseMatches(normalized, kw)) {
        return cat;
      }
    }
  }

  // 2. Check vendor names from vendors list or known names
  for (const cat of CATEGORIES) {
    for (const v of vendors.filter((v) => v.categoryId === cat.id)) {
      if (phraseMatches(normalized, v.name) || phraseMatches(normalized, v.id)) {
        return cat;
      }
    }
  }

  // 3. Check if query matches subcategory name or slug
  for (const cat of CATEGORIES) {
    if (phraseMatches(normalized, cat.name) || phraseMatches(normalized, cat.slug)) {
      return cat;
    }
  }

  // 4. Check if query matches any sub-type
  for (const cat of CATEGORIES) {
    for (const sub of cat.subTypes) {
      if (phraseMatches(normalized, sub)) {
        return cat;
      }
    }
  }

  // Unknown keywords fall back to SaaS All view (never an error page)
  return ALL_CATEGORY;
}

/**
 * Filters vendors based on active category, sub-type chip, and search terms.
 */
export function filterVendors(vendors, { categoryId = "all", subType = null, searchQuery = "" } = {}) {
  let list = vendors;

  if (categoryId && categoryId !== "all") {
    list = list.filter((v) => v.categoryId === categoryId);
  }

  if (subType && subType !== "All" && categoryId !== "all") {
    list = list.filter((v) =>
      v.subTypes && v.subTypes.some((s) => s.toLowerCase() === subType.toLowerCase())
    );
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    // Only further filter if user typed something specific
    const filtered = list.filter(
      (v) =>
        phraseMatches(v.name, q) ||
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        (v.features && v.features.some((f) => f.toLowerCase().includes(q)))
    );
    if (filtered.length > 0) {
      list = filtered;
    }
  }

  return list;
}
