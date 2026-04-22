const HISTORY_KEY = 'videoSummarizerHistory'
const MAX_HISTORY = 5

/**
 * Save a result to localStorage history (newest first, max 5).
 * @param {object} result - The full result including `url` field
 */
export function saveResult(result) {
  try {
    const existing = getHistory()
    const entry = {
      id: Date.now().toString(),
      url: result.url || '',
      title: result.title || result.url || '',
      timestamp: new Date().toISOString(),
      data: result,
    }
    const updated = [entry, ...existing].slice(0, MAX_HISTORY)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch {
    // localStorage unavailable (SSR or private mode)
  }
}

/**
 * Get history from localStorage.
 * @returns {Array}
 */
export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

/**
 * Clear all history from localStorage.
 */
export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch {
    // localStorage unavailable
  }
}
