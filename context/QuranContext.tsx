"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const QuranContext = createContext<any>(null);

export function QuranProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState({
    arabicFont: "Amiri",
    arabicSize: 28,
    translationSize: 18,
  });

  // ✅ ডিফল্ট ল্যাঙ্গুয়েজ "en" (English) সেট করা হলো
  const [lang, setLang] = useState("en"); 
  const [searchQuery, setSearchQuery] = useState("");

  // ১. মাউন্ট হওয়ার সময় LocalStorage থেকে ডাটা লোড করা
  useEffect(() => {
    const savedSettings = localStorage.getItem("quranSettings");
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    
    const savedLang = localStorage.getItem("quranLang");
    // যদি আগে থেকে কোনো ভাষা সেভ করা থাকে তবে সেটি নেবে, নাহলে "en" থাকবে
    if (savedLang) setLang(savedLang);
  }, []);

  // ২. সেটিংস বা ভাষা পরিবর্তন হলে তা সেভ করা এবং CSS আপডেট করা
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--arabic-font", settings.arabicFont);
    root.style.setProperty("--arabic-size", `${settings.arabicSize}px`);
    root.style.setProperty("--trans-size", `${settings.translationSize}px`);
    
    localStorage.setItem("quranSettings", JSON.stringify(settings));
    // ✅ ভাষা পরিবর্তন হলে সেটি সেভ করা হচ্ছে
    localStorage.setItem("quranLang", lang); 
  }, [settings, lang]); // lang ডিপেন্ডেন্সি এখানে যোগ করা হয়েছে

  return (
    <QuranContext.Provider value={{ settings, setSettings, lang, setLang, searchQuery, setSearchQuery }}>
      {children}
    </QuranContext.Provider>
  );
}

export const useQuran = () => useContext(QuranContext);