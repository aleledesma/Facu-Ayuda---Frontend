import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/global/Navbar"
import ReactQueryProvider from "@/components/providers/ReactQueryProvider"
import UserAuthProvider from "@/components/global/UserAuthProvider"
import { Toaster } from "react-hot-toast"
const notoSans = Noto_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Facu Ayuda APP",
  description: "App for stundents of FCYT UADER",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <ReactQueryProvider>
          <UserAuthProvider>
            <Navbar />
            <main>
              <Toaster />
              {children}
            </main>
          </UserAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
