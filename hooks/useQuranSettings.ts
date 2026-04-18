"use client";
import { useEffect, useState } from "react";
import { QuranSettings } from "@/types/quran.types";

export function useQuranSettings() {
  const [settings, setSettings] = useState<QuranSettings>({
    arabicFont: "Amiri",
    arabicSize: 28,
    translationSize: 18,
  });

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


  useEffect(() => {
  localStorage.setItem("quranSettings", JSON.stringify(settings));
  
  const root = document.documentElement;

  root.style.setProperty("--arabic-font", settings.arabicFont);
  root.style.setProperty("--arabic-size", `${settings.arabicSize}px`);
  root.style.setProperty("--trans-size", `${settings.translationSize}px`);
}, [settings]);

  return { settings, setSettings };
}