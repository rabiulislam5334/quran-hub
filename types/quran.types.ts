export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
}
// ১. সূরার লিস্টের জন্য টাইপ (Home Page এর জন্য)
export interface SurahListItem {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  total_verses: number;
  link: string;
}

// ২. একটি নির্দিষ্ট আয়াতের জন্য টাইপ
export interface Verse {
  id: number;
  verse_number: number;
  text: string;
  translation?: string; // এটি পরে আমরা ম্যাপ করে অ্যাড করি
}

// ৩. সূরার বিস্তারিত তথ্যের জন্য টাইপ (Ayat Page এর জন্য)
export interface SurahDetail {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string; // Meccan or Medinan
  total_verses: number;
  verses: Verse[];
}

// ৪. অ্যাপ সেটিংসের জন্য টাইপ (Settings Panel এর জন্য)
export interface QuranSettings {
  arabicFont: string;
  arabicSize: number;
  translationSize: number;
}
export interface TranslationItem {
  chapter_id: number;
  verse_number: number;
  text: string;
}
