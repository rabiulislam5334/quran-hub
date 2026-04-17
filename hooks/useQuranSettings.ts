"use client";
import { useEffect, useState } from "react";

export function useQuranSettings() {
  const [settings, setSettings] = useState({
    arabicFont: "Amiri",
    arabicSize: 28,
    translationSize: 18,
  });

  useEffect(() => {
    const saved = localStorage.getItem("quranSettings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("quranSettings", JSON.stringify(settings));
    document.documentElement.style.setProperty("--arabic-font", settings.arabicFont);
    document.documentElement.style.setProperty("--arabic-size", `${settings.arabicSize}px`);
    document.documentElement.style.setProperty("--trans-size", `${settings.translationSize}px`);
  }, [settings]);

  return { settings, setSettings };
}