'use client'

import { useState } from 'react'

function CopyButton({ getText }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors font-medium shrink-0"
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  )
}

export default function ResultDisplay({ result, onGeneratePdf, loading }) {
  const {
    title,
    bullet_points = [],
    english_explanation,
    hinglish_explanation,
  } = result

  return (
    <div className="space-y-5">
      {/* Video Title */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
          {title || 'Video Summary'}
        </h2>
      </div>

      {/* Key Points */}
      {bullet_points.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-3">
            🔑 Key Points
          </h3>
          <ul className="max-h-64 overflow-y-auto space-y-2 pr-1">
            {bullet_points.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2"
              >
                {point.timestamp && (
                  <span className="shrink-0 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-mono font-medium mt-0.5">
                    {point.timestamp}
                  </span>
                )}
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-200">
                  {point.text}
                </span>
                <CopyButton getText={() => point.text} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* English Explanation */}
      {english_explanation && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
              📝 English Explanation
            </h3>
            <CopyButton getText={() => english_explanation} />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {english_explanation}
          </p>
        </div>
      )}

      {/* Hinglish Explanation */}
      {hinglish_explanation && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
              🗣️ Hinglish Explanation
            </h3>
            <CopyButton getText={() => hinglish_explanation} />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {hinglish_explanation}
          </p>
        </div>
      )}

      {/* Download PDFs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
          📄 Download PDFs
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onGeneratePdf('english')}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
          >
            ⬇️ Download English PDF
          </button>
          <button
            onClick={() => onGeneratePdf('hinglish')}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
          >
            ⬇️ Download Hinglish PDF
          </button>
        </div>
      </div>
    </div>
  )
}
