"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const QuranContext = createContext<any>(null);

export function QuranProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState({
    arabicFont: "Amiri",
    arabicSize: 28,
    translationSize: 18,
  });
  const [lang, setLang] = useState("both");
  const [searchQuery, setSearchQuery] = useState("");

  // LocalStorage থেকে সেটিংস লোড করা
  useEffect(() => {
    const savedSettings = localStorage.getItem("quranSettings");
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    
    const savedLang = localStorage.getItem("quranLang");
    if (savedLang) setLang(savedLang);
  }, []);

  // সেটিংস পরিবর্তন হলে CSS Variables আপডেট করা (Appearance এর জন্য এটি জরুরি)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--arabic-font", settings.arabicFont);
    root.style.setProperty("--arabic-size", `${settings.arabicSize}px`);
    root.style.setProperty("--trans-size", `${settings.translationSize}px`);
    localStorage.setItem("quranSettings", JSON.stringify(settings));
  }, [settings]);

  return (
    <QuranContext.Provider value={{ settings, setSettings, lang, setLang, searchQuery, setSearchQuery }}>
      {children}
    </QuranContext.Provider>
  );
}

export const useQuran = () => useContext(QuranContext);