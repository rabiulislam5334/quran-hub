"use client";
import { useQuran } from "@/context/QuranContext";
import SettingsPanel from "@/components/quran/SettingsPanel";
import Link from "next/link";

export default function SurahClient({ surah, surahNumber }: any) {
  const { lang, settings, searchQuery } = useQuran();

  
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
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-80 p-6 border-r border-zinc-800 bg-zinc-950 sticky top-0 h-screen overflow-y-auto">
        <SettingsPanel />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        
        {/* ✅ Sticky Header with Back Button */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-800/50 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-all group"
            >
              <span className="p-1.5 bg-zinc-900 rounded-full border border-zinc-800 group-hover:border-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest">Back to Surahs</span>
            </Link>
            <span className="text-emerald-500/50 text-sm font-arabic">{surah.name}</span>
          </div>
        </div>

        <div className="p-6 md:p-12">
          {/* Surah Header */}
          <header className="text-center mb-16 space-y-4">
            <h1 className="text-6xl font-arabic text-emerald-500">{surah.name}</h1>
            <h2 className="text-3xl font-bold">{surah.englishName}</h2>
            <p className="text-zinc-500 text-sm uppercase tracking-widest">
              Surah {surahNumber} • {surah.totalAyahs} Ayahs
            </p>
          </header>

          {/* Ayahs List */}
          <div className="space-y-12 max-w-4xl mx-auto pb-24">
            {filteredAyahs.map((ayah: any) => (
              <div 
                key={ayah.id || ayah.numberInSurah} 
                className="group p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl hover:bg-zinc-900/40 transition-all duration-300"
              >
                {/* 🔢 Ayah Number Badge (এটি আপনার কোডে ছিল না) */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20 font-mono">
                    {ayah.numberInSurah}
                  </span>
                  <div className="h-[1px] flex-1 bg-zinc-800/50"></div>
                </div>

                {/* Arabic Text */}
                <p
                  className="text-right leading-[2.5] mb-8"
                  style={{
                    fontFamily: settings.arabicFont,
                    fontSize: `${settings.arabicSize}px`,
                  }}
                >
                  {ayah.text}
                </p>

                {/* Translation Container */}
                <div className="border-l-2 border-emerald-500/20 pl-6 space-y-6">
                  {/* Bengali */}
                  {(lang === "bn" || lang === "both") && ayah.bn && (
                    <div>
                      <span className="text-[10px] font-bold text-emerald-500/40 uppercase tracking-tighter block mb-1">Bengali</span>
                      <p 
                        className="text-zinc-100 leading-relaxed font-medium"
                        style={{ fontSize: `${settings.translationSize}px` }}
                      >
                        {ayah.bn}
                      </p>
                    </div>
                  )}

                  {/* English */}
                  {(lang === "en" || lang === "both") && ayah.en && (
                    <div>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter block mb-1">English</span>
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

            {/* Empty Search State */}
            {filteredAyahs.length === 0 && (
              <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
                <p className="text-zinc-500 italic">No ayahs found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}