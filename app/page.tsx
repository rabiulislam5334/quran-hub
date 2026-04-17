import { fetchAllSurahs } from "@/services/quran.service";
import Link from "next/link";

export default async function HomePage() {
  let surahs = [];

  try {
    surahs = await fetchAllSurahs();
  } catch (error) {
    console.error("Failed to load surahs:", error);
  }

  // যদি ডাটা না থাকে, তবে একটি লিঙ্ক দিন রিফ্রেশ করার জন্য অথবা সিম্পল মেসেজ
  if (!surahs || surahs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p className="text-red-400 mb-4">Failed to load Surah list.</p>
        <Link href="/" className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6 min-h-screen bg-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 pt-10">
        <div>
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Al-Quran <span className="text-emerald-500">Digital</span>
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">
            Read, study and search the Holy Quran with clarity
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah: any) => (
          <Link key={surah.id} href={`/surah/${surah.id}`}>
            <div className="group p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl hover:border-emerald-500/40 hover:bg-zinc-800/40 transition-all duration-300 cursor-pointer relative overflow-hidden">
              
              {/* Background Number */}
              <span className="absolute -right-4 -bottom-4 text-8xl font-black text-white/[0.03] group-hover:text-emerald-500/[0.05] transition-colors pointer-events-none font-mono">
                {surah.id}
              </span>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 font-mono font-bold border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    {surah.id}
                  </span>

                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {surah.transliteration}
                    </h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
                      {surah.translation}
                    </p>
                  </div>
                </div>

                <span className="text-3xl text-emerald-500 font-arabic">
                  {surah.name}
                </span>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-zinc-800/50 relative z-10">
                <span className="text-xs font-medium text-zinc-500">
                  {surah.total_verses} Verses
                </span>
                <span className="text-[10px] px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 font-bold uppercase tracking-wider transition-all">
                  Read Surah →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}