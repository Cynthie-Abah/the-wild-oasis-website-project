import Header from "@/app/_components/Header"
import "@/app/_styles/globals.css"

import { Josefin_Sans } from "next/font/google"
import ReservationProvider from "./account/reservations/ReservationContext"
import { SessionProvider } from "next-auth/react"

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: "swap",
})


 export const metadata = {
  title: {
    template: "%s The Wild Oasis",
    default: "Welcome / The Wild Oasis",
    description: "Luxurious cabin hotel located in the heart of italian dolomites, surrounded by beautiful mountainsand dark forests"
  }
 }


const RootLayout = ({children}) => {
  return (
    <SessionProvider>
    <html lang='en'>
        <body className={`${josefin.className} antialiased bg-primary-950 text-gray-500 min-h-screen flex flex-col relative`}>
        {/* <Image 
    src={bg} 
    fill 
    className="object-cover object-top " 
    placeholder="blur" 
    quality={80} 
    alt="Mountains and forests with two cabins" 
    /> */}
          <Header />
        
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
            {children}
          </ReservationProvider>
          </main>
        </div>

        </body>
    </html>
    </SessionProvider>
  )
}

export default RootLayout