import { SurahDetail, SurahListItem, TranslationItem, Verse } from "@/types/quran.types";




const BASE_URL = "https://cdn.jsdelivr.net/npm/quran-json@latest/dist";

// ১. সব সূরার লিস্ট আনার জন্য ফাংশন
export async function fetchAllSurahs(): Promise<SurahListItem[]> {
  const res = await fetch(`${BASE_URL}/chapters/index.json`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Surahs");
  }

  return res.json();
}

// ২. নির্দিষ্ট একটি সূরার বিস্তারিত (আয়াতসহ) আনার জন্য ফাংশন
export async function fetchSurah(number: number) {
  try {
    const [arabicRes, translationRes] = await Promise.all([
      fetch(`${BASE_URL}/chapters/${number}.json`),
      fetch(`${BASE_URL}/translations/en.sahih.json`),
    ]);

    if (!arabicRes.ok || !translationRes.ok) throw new Error("Data not found");

    const arabic: SurahDetail = await arabicRes.json();
   const translationData: TranslationItem[] = await translationRes.json();
    
    const filteredTranslation = translationData.filter(
      (item: { chapter_id: number; text: string }) => item.chapter_id === number
    );

    const ayahs = arabic.verses.map((v: Verse, i: number) => ({
      number: v.id,
      numberInSurah: v.verse_number,
      text: v.text,
      translation: filteredTranslation[i]?.text || "Translation not available",
    }));

    return {
      name: arabic.name,
      englishName: arabic.transliteration,
      totalAyahs: arabic.total_verses,
      ayahs: ayahs,
    };
  } catch (error) {
    console.error("Error fetching surah details:", error);
    return null;
  }
}