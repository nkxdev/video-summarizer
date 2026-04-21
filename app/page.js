'use client'

import { useState, useEffect } from 'react'
import InputBox from '../components/InputBox'
import ResultDisplay from '../components/ResultDisplay'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import DarkModeToggle from '../components/DarkModeToggle'
import { processVideo, generatePdf } from '../lib/api'
import { saveResult, getHistory, clearHistory } from '../lib/localStorage'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [activeHistoryItem, setActiveHistoryItem] = useState(null)

  useEffect(() => {
    const savedHistory = getHistory()
    setHistory(savedHistory)
    const savedDark = localStorage.getItem('darkMode')
    if (savedDark === 'true') {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  const handleSubmit = async () => {
    let isYouTube = false
    try {
      const parsed = new URL(url)
      const host = parsed.hostname.replace(/^www\./, '')
      isYouTube = host === 'youtube.com' || host === 'youtu.be'
    } catch {
      // invalid URL format
    }
    if (!isYouTube) {
      setError('Please enter a valid YouTube URL (youtube.com or youtu.be)')
      return
    }
    setError(null)
    setLoading(true)
    setResult(null)
    setActiveHistoryItem(null)
    try {
      const data = await processVideo(url)
      const resultWithUrl = { ...data, url }
      setResult(resultWithUrl)
      saveResult(resultWithUrl)
      setHistory(getHistory())
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'An unexpected error occurred. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleGeneratePdf = async (language) => {
    if (!result) return
    try {
      const blob = await generatePdf(result, language)
      const objectUrl = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = objectUrl
      anchor.download = `summary-${language}.pdf`
      anchor.click()
      URL.revokeObjectURL(objectUrl)
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to generate PDF. Please try again.'
      setError(message)
    }
  }

  const handleHistoryClick = (item, index) => {
    setResult(item.data)
    setUrl(item.url)
    setActiveHistoryItem(index)
    setError(null)
  }

  const handleClearHistory = () => {
    clearHistory()
    setHistory([])
    setActiveHistoryItem(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              Video Summarizer
            </span>
          </div>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <InputBox
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        )}

        {loading && <Loader />}

        {result && !loading && (
          <ResultDisplay
            result={result}
            onGeneratePdf={handleGeneratePdf}
            loading={loading}
          />
        )}

        {/* History section */}
        {history.length > 0 && (
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                🕘 Recent History
              </h2>
              <button
                onClick={handleClearHistory}
                className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-2">
              {history.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleHistoryClick(item, index)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    activeHistoryItem === index
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <p className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                    {item.title || item.url}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
