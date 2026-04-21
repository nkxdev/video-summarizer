import './globals.css'

export const metadata = {
  title: 'Video Summarizer',
  description: 'Convert YouTube videos into summarized notes and PDF downloads',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
