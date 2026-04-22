'use client'

export default function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3 animate-fade-in transition-colors duration-300">
      <span className="text-red-500 dark:text-red-400 text-lg mt-0.5 shrink-0">⚠️</span>
      <p className="flex-1 text-sm text-red-700 dark:text-red-300 leading-relaxed">
        {message}
      </p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-300 transition-colors shrink-0 text-lg leading-none"
      >
        ✕
      </button>
    </div>
  )
}
