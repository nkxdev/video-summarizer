'use client'

export default function Loader() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-4 transition-colors duration-300">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-100 dark:border-blue-900" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-blue-600 animate-spin" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
          Processing your video…
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          This may take a moment
        </p>
      </div>
    </div>
  )
}
