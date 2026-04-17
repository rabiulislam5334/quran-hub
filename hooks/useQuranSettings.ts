"use client";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { QuranSettings } from "@/types/quran.types";

export function useQuranSettings() {
  // useState কে নির্দিষ্ট করে দিন যে এটি QuranSettings টাইপ গ্রহণ করবে
  const [settings, setSettings] = useState<QuranSettings>({
    arabicFont: "Amiri",
    arabicSize: 28,
    translationSize: 18,
  });

  useEffect(() => {
    const saved = localStorage.getItem("quranSettings");
    if (saved) {
      try {
        // টাইপ কাস্টিং এর মাধ্যমে setSettings কে আশ্বস্ত করা
        const parsedData = JSON.parse(saved) as QuranSettings;
        setSettings(parsedData); 
      } catch (error) {
        console.error("Settings parse error:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quranSettings", JSON.stringify(settings));
    
    // CSS Variables আপডেট করা যাতে UI তে পরিবর্তন দেখা যায় [cite: 849, 850, 851]
    const root = document.documentElement;
    root.style.setProperty("--arabic-font", settings.arabicFont);
    root.style.setProperty("--arabic-size", `${settings.arabicSize}px`);
    root.style.setProperty("--trans-size", `${settings.translationSize}px`);
  }, [settings]);

  // রিটার্ন টাইপ স্পষ্ট করে দেওয়া
  return { 
    settings, 
    setSettings: setSettings as Dispatch<SetStateAction<QuranSettings>> 
  };
}