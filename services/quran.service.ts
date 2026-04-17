import { SurahListItem } from "@/types/quran.types";

const BASE_URL = "https://cdn.jsdelivr.net/npm/quran-json@latest/dist";

// ১. সব সূরার লিস্ট আনার ফাংশন
export async function fetchAllSurahs(): Promise<SurahListItem[]> {
  const res = await fetch(`${BASE_URL}/chapters/index.json`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Surahs");
  }

  return res.json();
}

// ২. নির্দিষ্ট সূরার বিস্তারিত (Ar, En, Bn) আনার ফাংশন
export async function fetchSurah(number: number) {
  try {
    // অ্যারাবিক ডাটা ফেচ
    const arabicRes = await fetch(`${BASE_URL}/chapters/${number}.json`);
    
    // ইংরেজি এবং বাংলা অনুবাদ ফেচ (alquran.cloud API থেকে)
    const [enRes, bnRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${number}/en.sahih`),
      fetch(`https://api.alquran.cloud/v1/surah/${number}/bn.bengali`)
    ]);

    if (!arabicRes.ok || !enRes.ok || !bnRes.ok) {
      throw new Error("Data not found from one of the sources");
    }

    const arabic = await arabicRes.json();
    const enJson = await enRes.json();
    const bnJson = await bnRes.json();

    const enAyahs = enJson.data.ayahs;
    const bnAyahs = bnJson.data.ayahs;

    // ডাটা কম্বাইন করা (ম্যাপিং)
    const ayahs = arabic.verses.map((v: any, i: number) => ({
      id: v.id,
      numberInSurah: v.verse_number,
      text: v.text,
      en: enAyahs[i]?.text || "English translation not available",
      bn: bnAyahs[i]?.text || "বাংলা অনুবাদ পাওয়া যায়নি",
    }));

    return {
      name: arabic.name,
      englishName: arabic.transliteration,
      totalAyahs: arabic.total_verses,
      ayahs,
    };
  } catch (error) {
    console.error("Error in fetchSurah:", error);
    throw error;
  }
}