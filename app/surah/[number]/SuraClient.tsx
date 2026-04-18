"use client";
import { useQuran } from "@/context/QuranContext";
import SettingsPanel from "@/components/quran/SettingsPanel";
import Link from "next/link"; // ব্যাক বাটনের জন্য

export default function SurahClient({ surah, surahNumber }: any) {
  const { lang, settings, searchQuery } = useQuran();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-80 p-6 border-r border-zinc-800 bg-zinc-950 sticky top-0 h-screen overflow-y-auto">
        <SettingsPanel />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* 🔙 Home Page এ ফেরার বাটন */}
        <div className="max-w-4xl mx-auto mb-10">
          <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-all group">
            <span className="p-2 bg-zinc-900 rounded-full border border-zinc-800 group-hover:border-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </span>
            <span className="text-sm font-medium">Back to Surahs</span>
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-arabic text-emerald-500 mb-4">{surah.name}</h1>
          <h2 className="text-3xl font-bold">{surah.englishName}</h2>
        </header>

        {/* Ayahs */}
        <div className="space-y-12 max-w-4xl mx-auto">
          {surah.ayahs.map((ayah: any) => (
            <div key={ayah.id} className="p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl">
              {/* Arabic Text: এখানে settings থেকে সরাসরি সাইজ ও ফন্ট অ্যাপ্লাই করা হয়েছে */}
              <p
                className="text-right leading-[2.5] mb-8"
                style={{
                  fontFamily: settings.arabicFont,
                  fontSize: `${settings.arabicSize}px`,
                }}
              >
                {ayah.text}
              </p>

              {/* Translation */}
              <div className="border-l-2 border-emerald-500/20 pl-6 space-y-4">
                {(lang === "bn" || lang === "both") && (
                  <p style={{ fontSize: `${settings.translationSize}px` }} className="text-zinc-100">
                    {ayah.bn}
                  </p>
                )}
                {(lang === "en" || lang === "both") && (
                  <p style={{ fontSize: `${settings.translationSize - 2}px` }} className="text-zinc-400 italic">
                    {ayah.en}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}