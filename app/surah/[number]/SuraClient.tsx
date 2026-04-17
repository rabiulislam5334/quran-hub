"use client";

import { useState } from "react";
import { useQuranSettings } from "@/hooks/useQuranSettings";
import { useLanguage } from "@/hooks/useLanguage";
import SettingsPanel from "@/components/quran/SettingsPanel";

export default function SurahClient({ surah, surahNumber }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const { settings } = useQuranSettings();
  const { lang } = useLanguage();

  // 🔍 Search filtering logic
  const filteredAyahs = surah?.ayahs?.filter((ayah: any) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const matchesEn = ayah.en?.toLowerCase().includes(query);
    const matchesBn = ayah.bn?.toLowerCase().includes(query);
    const matchesNum = ayah.numberInSurah?.toString() === searchQuery;

    return matchesEn || matchesBn || matchesNum;
  }) || [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      
      {/* Sidebar - Sticky sidebar for settings */}
      <aside className="w-full md:w-80 p-6 border-b md:border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-md h-auto md:h-screen md:sticky md:top-0 overflow-y-auto scrollbar-none">
        <SettingsPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-6xl font-arabic text-emerald-500 drop-shadow-md">
            {surah.name}
          </h1>
          <h2 className="text-3xl font-bold tracking-tight">
            {surah.englishName}
          </h2>
          <p className="text-zinc-500 text-sm uppercase tracking-widest">
            Surah {surahNumber} • {surah.totalAyahs} Ayahs
          </p>
        </header>

        {/* Ayahs List */}
        <div className="space-y-12 max-w-4xl mx-auto pb-24">
          {filteredAyahs.map((ayah: any) => (
            <div 
              key={ayah.id || ayah.numberInSurah} 
              className="group p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl hover:bg-zinc-900/50 transition-all duration-300"
            >
              {/* Ayah Meta */}
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">
                  {ayah.numberInSurah}
                </span>
                <div className="h-[1px] flex-1 bg-zinc-800/50"></div>
              </div>

              {/* Arabic Text */}
              <p
                className="text-right leading-[2.5] mb-8 transition-all"
                style={{
                  fontFamily: "var(--arabic-font)",
                  fontSize: "var(--arabic-size)",
                }}
              >
                {ayah.text}
              </p>

              {/* Translations Container */}
              <div className="space-y-6 border-l-2 border-emerald-500/10 pl-6">
                {/* Bengali */}
                {(lang === "bn" || lang === "both") && ayah.bn && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-tighter">Bengali</span>
                    <p 
                      className="text-emerald-50/90 leading-relaxed font-medium"
                      style={{ fontSize: "var(--trans-size)" }}
                    >
                      {ayah.bn}
                    </p>
                  </div>
                )}

                {/* English */}
                {(lang === "en" || lang === "both") && ayah.en && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">English</span>
                    <p 
                      className="text-zinc-400 italic leading-relaxed"
                      style={{ fontSize: "calc(var(--trans-size) - 2px)" }}
                    >
                      {ayah.en}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Empty Search Result */}
          {filteredAyahs.length === 0 && (
            <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
              <p className="text-zinc-500 italic">No ayahs matched your search "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}