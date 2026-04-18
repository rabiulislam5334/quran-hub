import { Geist, Geist_Mono, Amiri, Lateef, Scheherazade_New } from "next/font/google"; 
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

// Fonts setup (একই থাকবে)
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });
const lateef = Lateef({ subsets: ["arabic"], weight: ["400"], variable: "--font-lateef" });
const scheherazade = Scheherazade_New({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-scheherazade" });


export const metadata = {
  title: "Quran Hub - Read with Ease", 
  description: "Beautiful Quran web app", 
  icons: {
    icon: "/quran-logo.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} ${lateef.variable} ${scheherazade.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}