"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QuranProvider } from "@/context/QuranContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDetailsPage = pathname.startsWith("/surah/");

  return (
    <QuranProvider>
      <div className="min-h-screen flex flex-col">
        {!isDetailsPage && <Navbar />}
        <main className="flex-grow">
          {children}
        </main>
        {!isDetailsPage && <Footer />}
      </div>
    </QuranProvider>
  );
}