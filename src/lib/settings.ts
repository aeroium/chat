import { browser } from "$app/environment";

export const defaultSettings = {
  general: {
    showCompactMessages: false,
    showRawDefault: false,
  },
};

export function loadSettings() {
  if (!browser) throw new Error("not running in browser");

  return JSON.parse(localStorage.settings ?? JSON.stringify(defaultSettings));
}
