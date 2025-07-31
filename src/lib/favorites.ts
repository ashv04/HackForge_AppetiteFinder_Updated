// src/lib/favorites.ts

import type { Recipe } from "@/components/recipe-grid";

const STORAGE_KEY = "favoriteRecipes";
type Listener = (count: number) => void;
const listeners = new Set<Listener>();

// Load the array of saved recipes from localStorage
export function getFavorites(): Recipe[] {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

// Persist an updated array back to localStorage
export function saveFavorites(favs: Recipe[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

// Check whether a given recipe ID is favorited
export function isFavorite(id: number): boolean {
  return getFavorites().some((r) => r.id === id);
}

// Toggle a recipe in/out of favorites, then notify subscribers
export function toggleFavorite(recipe: Recipe) {
  const favs = getFavorites();
  const exists = favs.find((r) => r.id === recipe.id);
  const updated = exists
    ? favs.filter((r) => r.id !== recipe.id)
    : [...favs, recipe];
  saveFavorites(updated);
  notify(updated.length);
}

// Allow components to subscribe to updates in the favorites count
export function subscribe(cb: Listener): () => void {
  listeners.add(cb);
  cb(getFavorites().length);  // immediately send current count
  return () => {
    listeners.delete(cb);
  };
}

// Notify all subscribers of the new favorites count
function notify(count: number) {
  listeners.forEach((cb) => cb(count));
}
