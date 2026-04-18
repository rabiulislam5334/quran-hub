"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllSurahs } from "@/services/quran.service";

export default function HomePage() {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await fetchAllSurahs();
        setSurahs(data);
      } catch (error) {
        console.error("Failed to load surahs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSurahs();
  }, []);

  const filteredSurahs = surahs.filter((surah) =>
    surah.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.id.toString().includes(searchQuery) ||
    surah.bnName.includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
   
    <main className="max-w-[1400px] mx-auto px-4 md:px-10 pb-20 min-h-screen bg-[#0a0a0a] font-sans">
      
      {/* Header & Search Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 pt-16 gap-8">
        <div className="w-full lg:w-auto">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic">
            Quran <span className="text-emerald-500">Hub</span> <span className="text-white">Digital</span>
          </h1>
          <p className="text-zinc-500 mt-4 text-lg font-medium max-w-lg leading-relaxed">
            Read, study and search the Holy Quran with clarity and a modern experience.
          </p>
        </div>

    
        <div className="relative w-full lg:w-[420px] group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Surah (e.g. Fatiha, 1...)"
            className="w-full bg-zinc-900/40 border border-zinc-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSurahs.length > 0 ? (
          filteredSurahs.map((surah) => (
            <Link key={surah.id} href={`/surah/${surah.id}`}>
              <div className="group p-8 bg-zinc-900/20 border border-zinc-800/60 rounded-[2.5rem] hover:border-emerald-500/40 hover:bg-zinc-900/50 transition-all duration-500 relative overflow-hidden h-full backdrop-blur-sm">
                
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 font-mono text-xl font-bold border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 shadow-lg shadow-emerald-500/5">
                      {surah.id}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 tracking-tight">
                        {surah.transliteration}
                      </h3>
                      <p className="text-[15px] text-emerald-500/80 font-bold mt-1">{surah.bnName}</p>
                    </div>
                  </div>
                  <span className="text-4xl text-emerald-500/90 font-arabic leading-none">{surah.name}</span>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-zinc-800/50 relative z-10">
                  <div className="flex items-center gap-2.5 text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      {surah.total_verses} Verses
                    </span>
                  </div>
                  <span className="text-[12px] font-black text-emerald-500 group-hover:translate-x-2 transition-all flex items-center gap-2 uppercase tracking-tighter">
                    Read Surah 
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <p className="text-zinc-600 text-xl font-medium italic">No Surah found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}