// ১১৪টি সূরার বাংলা নামের লিস্ট
const surahNamesBN: { [key: number]: string } = {
  1: "আল ফাতিহা", 2: "আল বাকারাহ", 3: "আল ইমরান", 4: "আন নিসা", 5: "আল মায়িদাহ", 6: "আল আনআম", 7: "আল আ'রাফ", 8: "আল আনফাল", 9: "আত তাওবাহ", 10: "ইউনুস",
  11: "হুদ", 12: "ইউসুফ", 13: "আর রা'দ", 14: "ইব্রাহিম", 15: "আল হিজর", 16: "আন নাহল", 17: "বনী ইসরাঈল", 18: "আল কাহফ", 19: "মারইয়াম", 20: "ত্বোয়া-হা",
  21: "আল আম্বিয়া", 22: "আল হাজ্জ", 23: "আল মু'মিনুন", 24: "আন নূর", 25: "আল ফুরকান", 26: "আশ শুয়ারা", 27: "আন নামল", 28: "আল কাসাস", 29: "আল আনকাবুত", 30: "আর রুম",
  31: "লুকমান", 32: "আস সাজদাহ", 33: "আল আহজাব", 34: "সাবা", 35: "ফাতির", 36: "ইয়াসিন", 37: "আস সাফফাত", 38: "সোয়াদ", 39: "আয যুমার", 40: "গাফির",
  41: "ফুসসিলাত", 42: "আশ শূরা", 43: "আয যুখরুফ", 44: "আদ দুখান", 45: "আল জাসিয়াহ", 46: "আল আহকাফ", 47: "মুহাম্মাদ", 48: "আল ফাতহ", 49: "আল হুজুরাত", 50: "ক্বাফ",
  51: "আয যারিয়াত", 52: "আত তূর", 53: "আন নাজম", 54: "আল কামার", 55: "আর রাহমান", 56: "আল ওয়াকিয়াহ", 57: "আল হাদিদ", 58: "আল মুজাদালাহ", 59: "আল হাশর", 60: "আল মুমতাহিনাহ",
  61: "আস সাফ", 62: "আল জুমুআহ", 63: "আল মুনাফিকুন", 64: "আত তাগাবুন", 65: "আত তালাক", 66: "আত তাহরিম", 67: "আল মুলক", 68: "আল কলম", 69: "আল হাক্কাহ", 70: "আল মা'আরিজ",
  71: "নূহ", 72: "আল জিন", 73: "আল মুয্যাম্মিল", 74: "আল মুদ্দাসসির", 75: "আল কিয়ামাহ", 76: "আদ দাহর", 77: "আল মুরসালাত", 78: "আন নাবা", 79: "আন নাযিয়াত", 80: "আবাসা",
  81: "আত তাকউয়ীর", 82: "আল ইনফিতার", 83: "আল মুতাফফিফীন", 84: "আল ইনশিকাক", 85: "আল বুরুজ", 86: "আত তারিক", 87: "আল আ'লা", 88: "আল গাশিয়াহ", 89: "আল ফাজর", 90: "আল বালাদ",
  91: "আশ শামস", 92: "আল লাইল", 93: "আদ দুহা", 94: "আল ইনশিরাহ", 95: "আত তীন", 96: "আল আলাক", 97: "আল কদর", 98: "আল বাইয়্যিনাহ", 99: "আয যিলযাল", 100: "আল আদিয়াত",
  101: "আল কারিয়াহ", 102: "আত তাকাসুর", 103: "আল আসর", 104: "আল হুমাযাহ", 105: "আল ফীল", 106: "কুরাইশ", 107: "আল মাউন", 108: "আল কাউসার", 109: "আল কাফিরুন", 110: "আন নাসর",
  111: "আল লাহাব", 112: "আল ইখলাস", 113: "আল ফালাক", 114: "আন নাস"
};

// ✅ ১. সব সুরাহ লিস্টের জন্য ফাংশন
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
      bnName: surahNamesBN[s.number] || s.englishName, // বাংলা নাম যোগ করা হলো
      total_verses: s.numberOfAyahs,
    }));
  } catch (error) {
    console.error("FetchAllSurahs Error:", error);
    throw error;
  }
}

// ✅ ২. একক সুরাহ এবং আয়াতের জন্য ফাংশন
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
  // যদি index i এ ডাটা না থাকে তবে empty string বা 'Not Available' দিন
  en: enAyahs[i]?.text || "English translation not available",
  bn: bnAyahs[i]?.text || "বাংলা অনুবাদ পাওয়া যায়নি", 
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