import './globals.css'
import { Header, Footer } from '@/components/layouts'
import { HtmlHead } from '@/app/layouts'


export const metadata = {
  title: 'The Original Cajun Seafood',
  description: 'The Original Cajun Seafood',
}

export const dynamicParams = false

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <HtmlHead/>

      <body className="antialiased">
        <Header/>

        <main className="overflow-hidden">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  )
}
