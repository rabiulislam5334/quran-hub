"use client";
import React, { useEffect, useState } from "react";
import { fetchSurah } from "@/services/quran.service";
import { useQuranSettings } from "@/hooks/useQuranSettings";
import SettingsPanel from "@/components/quran/SettingsPanel";

export default function SurahDetailPage({ params }: { params: Promise<{ number: string }> }) {
  const resolvedParams = React.use(params);
  const surahNumber = resolvedParams.number;

  const [surah, setSurah] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { settings } = useQuranSettings();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSurahData() {
      try {
        setLoading(true);
        const data = await fetchSurah(Number(surahNumber));
        setSurah(data);
      } catch (error) {
        console.error("Error loading surah:", error);
      } finally {
        setLoading(false);
      }
    }
    getSurahData();
  }, [surahNumber]);

  if (loading) return <div className="text-center p-20 text-emerald-500 font-bold animate-pulse">Loading Surah Data...</div>;
  if (!surah) return <div className="text-center p-20 text-red-500">Failed to load Surah. Please try again.</div>;

  // ✅ সার্চ লজিক ফিক্স: ইংরেজি এবং বাংলা উভয় ফিল্ডে চেক করবে
  const filteredAyahs = surah.ayahs.filter((ayah: any) =>
    (ayah.en?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (ayah.bn?.includes(searchQuery))
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-zinc-100">
      {/* Sidebar Section */}
      <aside className="w-full md:w-80 p-6 border-b md:border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
        <div className="sticky top-6 space-y-8">
          <SettingsPanel />
          
          <div className="pt-6 border-t border-zinc-800">
            <label className="block text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-widest">
              Search Translation
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search ayah (EN/BN)..."
                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-zinc-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Content Section */}
      <main className="flex-1 p-6 md:p-12 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
        <header className="mb-16 text-center space-y-4">
          <h1 className="text-6xl font-arabic text-emerald-500 drop-shadow-sm">{surah.name}</h1>
          <h2 className="text-3xl font-bold tracking-tight text-white">{surah.englishName}</h2>
          <div className="flex justify-center items-center gap-3 text-zinc-500 text-xs font-medium uppercase tracking-[0.2em]">
            <span>{surah.totalAyahs} Ayahs</span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
            <span>Surah {surahNumber}</span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-12 pb-20">
          {filteredAyahs.map((ayah: any) => (
            <div key={ayah.id} className="group relative space-y-8">
              {/* Ayah Number Header */}
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-zinc-800/50 group-hover:bg-emerald-500/20 transition-colors"></div>
                <span className="text-xs font-mono text-zinc-600 group-hover:text-emerald-500 transition-colors">
                  {surahNumber}:{ayah.numberInSurah}
                </span>
                <div className="h-[1px] flex-1 bg-zinc-800/50 group-hover:bg-emerald-500/20 transition-colors"></div>
              </div>

            {/* Arabic Text */}
<p 
  className="text-right leading-[2.2] text-zinc-100 transition-all duration-150"
  style={{ 
    fontFamily: "var(--arabic-font)", 
    fontSize: "var(--arabic-size)" 
  }}
>
  {ayah.text}
</p>

{/* Combined Translations */}
<div className="space-y-4 border-l-2 border-emerald-500/10 pl-6">
  <p 
    className="text-emerald-50/90 leading-relaxed font-medium transition-all duration-150"
    style={{ fontSize: "var(--trans-size)" }}
  >
    <span className="text-[10px] mr-2 text-emerald-500/50 font-bold uppercase">BN</span>
    {ayah.bn}
  </p>
  <p 
    className="text-zinc-400 leading-relaxed italic transition-all duration-150"
    style={{ fontSize: "calc(var(--trans-size) - 2px)" }} // ইংরেজি একটু ছোট রাখার জন্য
  >
    <span className="text-[10px] mr-2 text-zinc-600 font-bold uppercase">EN</span>
    {ayah.en}
  </p>
</div>
            </div>
          ))}

          {filteredAyahs.length === 0 && (
            <div className="text-center py-24 bg-zinc-900/20 rounded-[2rem] border border-dashed border-zinc-800">
              <p className="text-zinc-500 text-sm italic">No ayahs match your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}