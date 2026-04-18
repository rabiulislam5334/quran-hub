import type { Metadata } from "next";
import { Geist, Geist_Mono, Amiri, Lateef, Scheherazade_New } from "next/font/google"; 
import "./globals.css";
import { QuranProvider } from "@/context/QuranContext";

// ল্যাটিন ফন্ট
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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

export const metadata: Metadata = {
  title: "Quran Hub-Read and Listen Holy Quran",
  description: "Read and Listen Holy Quran",
  icons: {
    icon: "/quran-logo.png",
    shortcut: "/quran-logo.png",
    apple: "/quran-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} ${lateef.variable} ${scheherazade.variable} antialiased`}>
        <QuranProvider>
          {children}
        </QuranProvider>
      </body>
    </html>
  );
}