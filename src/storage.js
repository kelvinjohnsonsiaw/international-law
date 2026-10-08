// Saves progress in the browser. Wrapped in try/catch in case storage is blocked.
const KEY = "ilaw";
export const loadProgress = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
};
export const saveProgress = (v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
};
