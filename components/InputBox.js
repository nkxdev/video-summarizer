'use client'

import { useState } from 'react'

export default function InputBox({ url, setUrl, onSubmit, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      onSubmit()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        YouTube Video Summarizer
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Enter a YouTube URL to generate notes and PDF summaries
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://www.youtube.com/watch?v=..."
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
        />
        <button
          onClick={onSubmit}
          disabled={loading || !url.trim()}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? 'Processing…' : 'Generate Notes'}
        </button>
      </div>
    </div>
  )
}
