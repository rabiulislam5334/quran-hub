import { fetchAllSurahs } from "@/services/quran.service";
import Link from "next/link";

export default async function HomePage() {
  // ডাটা ফেচ করা হচ্ছে
  const surahs = await fetchAllSurahs();

  return (
    <main className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white">Al-Quran Digital</h1>
          <p className="text-zinc-400 mt-2">Read and search the Holy Quran</p>
        </div>
      </div>

      {/* সূরার গ্রিড লিস্ট */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah) => (
          <Link key={surah.id} href={`/surah/${surah.id}`}>
            <div className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer relative overflow-hidden">
              
              {/* সূরার নাম্বার (Background Decor) */}
              <span className="absolute -right-2 -bottom-2 text-6xl font-bold text-white/5 group-hover:text-emerald-500/10 transition-colors">
                {surah.id}
              </span>

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono font-bold border border-emerald-500/20">
                    {surah.id}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {surah.transliteration}
                    </h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">
                      {surah.translation}
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-arabic text-emerald-500">
                  {surah.name}
                </span>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-800/50">
                <span className="text-sm text-zinc-400">
                  {surah.total_verses} Verses
                </span>
                <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">
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