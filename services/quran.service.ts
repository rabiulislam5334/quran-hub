const BASE_URL = "https://cdn.jsdelivr.net/npm/quran-json@latest/dist";

export async function fetchAllSurahs(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/chapters/en.json`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch Surahs");
  return res.json();
}

export async function fetchSurah(number: number) {
  const [arabicRes, translationRes] = await Promise.all([
    fetch(`${BASE_URL}/chapters/${number}.json`),
    fetch(`${BASE_URL}/translations/en.sahih.json`)
  ]);
  
  const arabic = await arabicRes.json();
  const translationData = await translationRes.json();

  const filteredTranslation = translationData.ayahs.filter((a: any) => a.surah === number);
  
  const ayahs = arabic.ayahs.map((a: any, i: number) => ({
    ...a,
    translation: filteredTranslation[i]?.text || ""
  }));

  return { ...arabic, ayahs };
}