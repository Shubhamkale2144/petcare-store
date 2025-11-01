import './globals.css'

export const metadata = {
  title: 'EpetStore - Your Pet Paradise',
  description: 'Adopt pets, buy pet food, clothes, toys and accessories in Pune',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}