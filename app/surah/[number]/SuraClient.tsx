"use client";
import { useQuran } from "@/context/QuranContext";
import SettingsPanel from "@/components/quran/SettingsPanel";
import Link from "next/link";
import { useState } from "react";

export default function SurahClient({ surah, surahNumber }: any) {
  const { lang, settings, searchQuery } = useQuran();
  const [showSettings, setShowSettings] = useState(false);

  const filteredAyahs = surah?.ayahs?.filter((ayah: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      ayah.en?.toLowerCase().includes(query) || 
      ayah.bn?.toLowerCase().includes(query) || 
      ayah.numberInSurah?.toString() === searchQuery
    );
  }) || [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white relative">
      
      {/* 🛠 SIDEBAR (Desktop: Fixed, Mobile: Overlay Drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-80 bg-zinc-950 border-r border-zinc-800 p-6 transition-transform duration-300 ease-in-out
        ${showSettings ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:h-screen md:sticky md:top-0
      `}>
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="font-bold text-emerald-500 uppercase tracking-widest text-sm">Settings</h2>
          <button onClick={() => setShowSettings(false)} className="p-2 text-zinc-500 hover:text-white">✕</button>
        </div>
        <SettingsPanel />
      </aside>

      {/* 📱 Mobile Overlay - সাইডবার ওপেন থাকলে ব্যাকগ্রাউন্ড ডার্ক হবে */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* 📖 MAIN CONTENT AREA */}
      <main className="flex-1 relative">
        
        {/* ✅ STICKY HEADER - এটি এখন অবশ্যই উপরে আটকে থাকবে */}
        <div className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800/50 px-4 py-3 md:px-8 md:py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-all group"
            >
              <div className="p-1.5 bg-zinc-900 rounded-full border border-zinc-800 group-hover:border-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Back to Surahs</span>
            </Link>

            <div className="text-right">
              <h2 className="text-emerald-500 text-lg font-arabic leading-none">{surah.name}</h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{surah.englishName}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-12">
          {/* Header */}
          <header className="text-center mb-16 space-y-4">
            <h1 className="text-6xl md:text-7xl font-arabic text-emerald-500">{surah.name}</h1>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{surah.englishName}</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold">
              Surah {surahNumber} • {surah.totalAyahs} Ayahs
            </p>
          </header>

          {/* Ayahs List */}
          <div className="space-y-10 max-w-4xl mx-auto pb-32">
            {filteredAyahs.map((ayah: any) => (
              <div 
                key={ayah.id || ayah.numberInSurah} 
                className="group p-6 md:p-10 bg-zinc-900/20 border border-zinc-800/50 rounded-[2.5rem] hover:bg-zinc-900/40 transition-all duration-300"
              >
                {/* 🔢 AYAH NUMBER - গোল বৃত্তের মাঝে স্পষ্ট নাম্বার */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="flex items-center justify-center min-w-[44px] h-11 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-black border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] font-mono">
                    {ayah.numberInSurah}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
                </div>

                {/* Arabic Text */}
                <p
                  className="text-right leading-[2.5] mb-10"
                  style={{
                    fontFamily: settings.arabicFont,
                    fontSize: `${settings.arabicSize}px`,
                  }}
                >
                  {ayah.text}
                </p>

                {/* Translation Container */}
                <div className="border-l-2 border-emerald-500/20 pl-6 space-y-6">
                  {(lang === "bn" || lang === "both") && ayah.bn && (
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-widest">Bengali</span>
                      <p 
                        className="text-emerald-50/90 leading-relaxed font-medium"
                        style={{ fontSize: `${settings.translationSize}px` }}
                      >
                        {ayah.bn}
                      </p>
                    </div>
                  )}

                  {(lang === "en" || lang === "both") && ayah.en && (
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">English</span>
                      <p 
                        className="text-zinc-400 italic leading-relaxed"
                        style={{ fontSize: `calc(${settings.translationSize}px - 2px)` }}
                      >
                        {ayah.en}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 🔘 MOBILE FLOATING BUTTON - এটি মোবাইলে সেটিংস খুলবে */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 left-6 md:hidden z-40 bg-emerald-500 text-black p-4 rounded-full shadow-lg shadow-emerald-500/30 active:scale-90 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
        </svg>
      </button>
    </div>
  );
}