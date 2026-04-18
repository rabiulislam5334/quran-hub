"use client"; // usePathname ব্যবহারের জন্য এটি অবশ্যই দিতে হবে

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono, Amiri, Lateef, Scheherazade_New } from "next/font/google"; 
import "./globals.css";
import { QuranProvider } from "@/context/QuranContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Latin Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Arabic Fonts
const amiri = Amiri({ 
  subsets: ["arabic"], 
  weight: ["400", "700"],
  variable: "--font-amiri" 
});

const lateef = Lateef({ 
  subsets: ["arabic"], 
  weight: ["400"],
  variable: "--font-lateef" 
});

const scheherazade = Scheherazade_New({ 
  subsets: ["arabic"], 
  weight: ["400", "700"],
  variable: "--font-scheherazade" 
});
export const metadata = {
  title: "Quran Hub - Read with Ease", 
  description: "Beautiful Quran web app", 
  icons: {
    icon: "/quran-logo.png", 
  },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  const isDetailsPage = pathname.startsWith("/surah/");

  return (
    <html lang="bn" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} ${lateef.variable} ${scheherazade.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <QuranProvider>
          <div className="min-h-screen flex flex-col">
            
            
            {!isDetailsPage && <Navbar />}
            
            <main className="flex-grow">
              {children}
            </main>
            
            
            {!isDetailsPage && <Footer />}

          </div>
        </QuranProvider>
      </body>
    </html>
  );
}