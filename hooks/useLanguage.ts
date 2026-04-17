"use client";
import { useState, useEffect } from "react";

// টাইপ ডিফাইন করা
export type LanguageType = "en" | "bn" | "both";

export function useLanguage() {
  // শুরুতে ডিফল্ট ভ্যালু "both" এবং টাইপ সেট করা
  const [lang, setLang] = useState<LanguageType>("both");

  useEffect(() => {
    const savedLang = localStorage.getItem("quranLang") as LanguageType;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const changeLang = (newLang: LanguageType) => {
    setLang(newLang);
    localStorage.setItem("quranLang", newLang);
  };

  return { lang, setLang: changeLang };
}