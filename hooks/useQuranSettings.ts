"use client";
import { useEffect, useState } from "react";
import { QuranSettings } from "@/types/quran.types";

export function useQuranSettings() {
  const [settings, setSettings] = useState<QuranSettings>({
    arabicFont: "Amiri",
    arabicSize: 28,
    translationSize: 18,
  });

  // মাউন্ট হওয়ার সময় ডাটা লোড
  useEffect(() => {
    const saved = localStorage.getItem("quranSettings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // সেটিংস চেঞ্জ হলে CSS Variable আপডেট
  useEffect(() => {
  localStorage.setItem("quranSettings", JSON.stringify(settings));
  
  const root = document.documentElement;
  // ভ্যালুগুলো পিক্সেল ইউনিটে সেট করা হচ্ছে
  root.style.setProperty("--arabic-font", settings.arabicFont);
  root.style.setProperty("--arabic-size", `${settings.arabicSize}px`);
  root.style.setProperty("--trans-size", `${settings.translationSize}px`);
}, [settings]);

  return { settings, setSettings };
}