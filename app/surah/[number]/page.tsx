import { fetchSurah } from "@/services/quran.service";
import SurahClient from "./SuraClient";


// Next.js 15 এ params একটি Promise
export default async function Page({ params }: { params: Promise<{ number: string }> }) {
  const resolvedParams = await params;
  const surahNumber = resolvedParams.number;
  
  const surah = await fetchSurah(Number(surahNumber));

  if (!surah) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p className="text-red-500 font-bold">Surah not found!</p>
      </div>
    );
  }

  return <SurahClient surah={surah} surahNumber={surahNumber} />;
}