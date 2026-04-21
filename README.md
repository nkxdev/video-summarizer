# Video Summarizer — Frontend

A modern, responsive Next.js web application that converts YouTube videos into summarized notes and downloadable PDF reports.

## Features

- **YouTube URL input** with client-side validation
- **AI-generated summaries** with timestamped bullet points
- **English & Hinglish explanations**
- **PDF downloads** for both languages
- **Copy to clipboard** for bullet points and explanations
- **Dark mode** toggle (preference persisted)
- **History** of last 5 results stored in browser localStorage
- Fully responsive — works on mobile and desktop

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A running instance of the video-summarizer backend

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/nkxdev/video-summarizer.git
cd video-summarizer

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_BASE_URL to your backend URL
```

## Environment Setup

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:5000` | Base URL of the backend API |

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm run start
```

## API Endpoints Expected

The frontend communicates with the following backend endpoints:

### `POST /process-video`

**Request:**
```json
{ "url": "https://www.youtube.com/watch?v=..." }
```

**Response:**
```json
{
  "title": "Video Title",
  "bullet_points": [
    { "timestamp": "0:00", "text": "Introduction to the topic" }
  ],
  "english_explanation": "Full English summary...",
  "hinglish_explanation": "Hinglish summary..."
}
```

### `POST /generate-pdf`

**Request:**
```json
{
  "content": { /* result object from /process-video */ },
  "language": "english"
}
```

**Response:** Binary PDF file (Content-Type: `application/pdf`)

## Project Structure

```
video-summarizer/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Main page component (all state)
│   └── globals.css        # Tailwind + global styles
├── components/
│   ├── InputBox.js        # URL input + Generate button
│   ├── ResultDisplay.js   # Summary results, copy, PDF buttons
│   ├── Loader.js          # Animated loading indicator
│   ├── ErrorMessage.js    # Dismissible error alert
│   └── DarkModeToggle.js  # Light/dark mode switch
├── lib/
│   ├── api.js             # Axios API calls
│   └── localStorage.js    # History persistence helpers
├── .env.local.example     # Environment variable template
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
