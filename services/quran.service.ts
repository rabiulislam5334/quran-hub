// ✅ ১. সব সুরাহ লিস্টের জন্য ফাংশন (এটি HomePage এ লাগবে)
export async function fetchAllSurahs() {
  try {
    const res = await fetch("https://api.alquran.cloud/v1/surah");
    if (!res.ok) throw new Error("Failed to fetch all surahs");

    const json = await res.json();

    return json.data.map((s: any) => ({
      id: s.number,
      name: s.name,
      transliteration: s.englishName,
      translation: s.englishNameTranslation,
      total_verses: s.numberOfAyahs,
    }));
  } catch (error) {
    console.error("FetchAllSurahs Error:", error);
    throw error;
  }
}

// ✅ ২. একক সুরাহ এবং আয়াতের জন্য ফাংশন (এটি SurahDetailPage এ লাগবে)
export async function fetchSurah(number: number) {
  try {
    const ARABIC = "quran-uthmani";
    const ENGLISH = "en.sahih";
    const BENGALI = "bn.bengali";

    const [arRes, enRes, bnRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${number}/${ARABIC}`),
      fetch(`https://api.alquran.cloud/v1/surah/${number}/${ENGLISH}`),
      fetch(`https://api.alquran.cloud/v1/surah/${number}/${BENGALI}`)
    ]);

    if (!arRes.ok || !enRes.ok) throw new Error("Failed to fetch Arabic/English data");

    const arJson = await arRes.json();
    const enJson = await enRes.json();
    
    let bnAyahs: any[] = [];
    if (bnRes.ok) {
      const bnJson = await bnRes.json();
      bnAyahs = bnJson.data.ayahs;
    }

    const arAyahs = arJson.data.ayahs;
    const enAyahs = enJson.data.ayahs;

    const ayahs = arAyahs.map((a: any, i: number) => ({
      id: a.number,
      numberInSurah: a.numberInSurah,
      text: a.text,
      en: enAyahs[i]?.text || "",
      bn: bnAyahs[i]?.text || "",
    }));

    return {
      name: arJson.data.name,
      englishName: arJson.data.englishName,
      totalAyahs: arJson.data.numberOfAyahs,
      ayahs,
    };
  } catch (error) {
    console.error("FetchSurah Error:", error);
    throw error;
  }
}