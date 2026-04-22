import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
})

/**
 * Process a YouTube video URL and return summary data.
 * @param {string} url - YouTube video URL
 * @returns {Promise<object>} - { title, bullet_points, english_explanation, hinglish_explanation }
 */
export async function processVideo(url) {
  const response = await api.post('/process-video', { url })
  return response.data
}

/**
 * Generate a PDF for the given content and language.
 * @param {object} content - Summary result object
 * @param {'english'|'hinglish'} language - Language for the PDF
 * @returns {Promise<Blob>} - PDF blob
 */
export async function generatePdf(content, language) {
  const response = await api.post(
    '/generate-pdf',
    { content, language },
    { responseType: 'blob' }
  )
  return response.data
}
